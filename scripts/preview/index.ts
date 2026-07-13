import chalk from 'chalk'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import * as ui from '../host/ui'
import { readWidgetRegistry } from '../host/registry'
import type { WidgetDefinition } from '../host/types'
import * as tunnel from './tunnel'
import * as ngrok from './ngrok'
import * as git from './git'
import * as processes from './processes'
import type { NgrokTunnels } from './ngrok'
import type { DevProcess } from './processes'

const REPO_ROOT = process.cwd()
const DEFAULT_PORT = 5173

interface WidgetSession {
  widget: WidgetDefinition
  port: number
  tunnelUrl: string | null
  devProcess: DevProcess | null
}

interface SessionState {
  registrySnapshot: string
  ngrokTunnels: NgrokTunnels | null
  sessions: WidgetSession[]
  committed: boolean
}

const findPreviewableWidgets = (): WidgetDefinition[] =>
  readWidgetRegistry().widgets.filter(w => {
    const pkgPath = path.join(REPO_ROOT, 'widgets', w.type, 'package.json')
    if (!existsSync(pkgPath)) return false
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      return typeof pkg?.scripts?.dev === 'string'
    } catch {
      return false
    }
  })

const getWidgetPort = (widgetType: string): number => {
  const pkgPath = path.join(REPO_ROOT, 'widgets', widgetType, 'package.json')
  if (!existsSync(pkgPath)) return DEFAULT_PORT
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    return typeof pkg?.port === 'number' ? pkg.port : DEFAULT_PORT
  } catch {
    return DEFAULT_PORT
  }
}

const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '')

const showSessionStatus = (sessions: WidgetSession[]): void => {
  const W = 68
  const b = chalk.bold.cyan
  const row = (text = '') => {
    const pad = ' '.repeat(Math.max(0, W - 2 - stripAnsi(text).length))
    console.log(`  ${b('│')}  ${text}${pad}${b('│')}`)
  }
  console.log()
  console.log(`  ${b('╭' + '─'.repeat(W) + '╮')}`)
  row()
  row(chalk.bold('Preview Session'))
  row()
  for (const s of sessions) row(`${s.widget.type.padEnd(16)}  ${chalk.cyan(s.tunnelUrl ?? '')}`)
  row()
  row('Open CC and refresh. Dev server logs below.')
  row('Press Ctrl+C to end session and restore registry.')
  row()
  console.log(`  ${b('╰' + '─'.repeat(W) + '╯')}`)
  console.log()
}

let isCleaningUp = false

const cleanup = (state: SessionState): void => {
  if (isCleaningUp) return
  isCleaningUp = true

  console.log()
  ui.info(chalk.yellow('Shutting down...'))

  for (const s of state.sessions) {
    if (s.devProcess) processes.stopDevServer(s.devProcess)
  }
  if (state.ngrokTunnels) ngrok.stopNgrok(state.ngrokTunnels)

  tunnel.writeRegistry(state.registrySnapshot)
  ui.info('Registry restored.')

  if (state.committed) {
    const types = state.sessions.map(s => s.widget.type).join(', ')
    try {
      git.commitAndPush(`chore: restore registry after preview session for ${types}`)
      ui.info('Registry restore committed and pushed.')
    } catch (e: unknown) {
      ui.warn(`Failed to push restore commit: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  console.log()
  console.log(chalk.bold.cyan('  Goodbye!'))
  console.log()
}

const main = async (): Promise<void> => {
  console.log()
  console.log(chalk.bold.cyan('  ╭──────────────────────────────────────────╮'))
  console.log(chalk.bold.cyan('  │') + chalk.bold('  Widget Dev Preview                      ') + chalk.bold.cyan('│'))
  console.log(chalk.bold.cyan('  │') + chalk.dim('  Local preview on CC                     ') + chalk.bold.cyan('│'))
  console.log(chalk.bold.cyan('  ╰──────────────────────────────────────────╯'))
  console.log()

  let widgets: WidgetDefinition[]
  try {
    widgets = findPreviewableWidgets()
  } catch (e: unknown) {
    ui.error(e instanceof Error ? e.message : String(e))
    process.exit(1)
  }

  if (widgets.length === 0) {
    ui.error('No previewable widgets found (need a "dev" script in package.json)')
    process.exit(1)
  }

  let selected: WidgetDefinition[]
  if (widgets.length === 1) {
    selected = widgets
    ui.info(`Auto-selected widget: ${chalk.bold(widgets[0].type)}`)
  } else {
    const { chosen } = await inquirer.prompt<{ chosen: WidgetDefinition[] }>([
      {
        type: 'checkbox',
        name: 'chosen',
        message: chalk.bold('Which widgets do you want to preview?'),
        choices: widgets.map(w => ({
          name: `${chalk.bold(w.title ?? w.type)}  ${chalk.dim(w.type)}`,
          value: w,
          checked: true,
        })),
        validate: (v: WidgetDefinition[]) => v.length > 0 || 'Select at least one widget',
      },
    ])
    selected = chosen
  }

  if (git.checkDirtyState()) {
    ui.warn('Uncommitted changes in other files detected. Proceeding anyway.')
  }

  const sessions: WidgetSession[] = selected.map(widget => ({
    widget,
    port: getWidgetPort(widget.type),
    tunnelUrl: null,
    devProcess: null,
  }))

  const state: SessionState = {
    registrySnapshot: tunnel.readRegistryRaw(),
    ngrokTunnels: null,
    sessions,
    committed: false,
  }

  process.on('SIGINT', () => { cleanup(state); process.exit(0) })
  process.on('SIGTERM', () => { cleanup(state); process.exit(0) })
  process.on('uncaughtException', (err) => { ui.error(err.message); cleanup(state); process.exit(1) })

  const ngrokSpinner = ui.spinner('Starting ngrok tunnels...')
  try {
    const ports = sessions.map(s => s.port)
    state.ngrokTunnels = await ngrok.startNgrok(ports)
    for (const s of sessions) {
      s.tunnelUrl = state.ngrokTunnels.urls.get(s.port) ?? null
    }
    ngrokSpinner.succeed('Tunnels ready')
    for (const s of sessions) {
      ui.info(`${chalk.bold(s.widget.type.padEnd(16))}  ${chalk.cyan(s.tunnelUrl ?? '')}`)
    }
  } catch (e: unknown) {
    ngrokSpinner.fail(`Failed to start ngrok: ${e instanceof Error ? e.message : String(e)}`)
    process.exit(1)
  }

  let patched = state.registrySnapshot
  for (const s of sessions) {
    patched = tunnel.patchRegistry(patched, s.widget.type, s.tunnelUrl!)
  }
  tunnel.writeRegistry(patched)

  const types = sessions.map(s => s.widget.type).join(', ')
  const commitSpinner = ui.spinner('Committing and pushing registry...')
  try {
    git.commitAndPush(`chore: start preview session for ${types}`)
    state.committed = true
    commitSpinner.succeed('Registry committed and pushed.')
  } catch (e: unknown) {
    commitSpinner.fail(`git push failed: ${e instanceof Error ? e.message : String(e)}`)
    cleanup(state)
    process.exit(1)
  }

  for (const s of sessions) {
    const widgetDir = path.join(REPO_ROOT, 'widgets', s.widget.type)
    s.devProcess = processes.startDevServer(
      widgetDir,
      s.port,
      line => ui.widgetLog(s.widget.type, line)
    )
    s.devProcess.process.on('exit', (code) => {
      const isSignalExit = code === 130 || code === 2
      if (code !== 0 && code !== null && !isSignalExit) {
        if (process.stdin.isTTY) process.stdin.setRawMode(false)
        cleanup(state)
        process.exit(1)
      }
    })
  }

  showSessionStatus(sessions)

  process.stdin.resume()
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
    process.stdin.on('data', (key: Buffer) => {
      if (key[0] === 0x03) {
        process.stdin.setRawMode(false)
        cleanup(state)
        process.exit(0)
      }
    })
  }
}

main().catch((e: unknown) => {
  ui.error(e instanceof Error ? e.message : String(e))
  process.exit(1)
})

import { spawn } from 'child_process'
import type { ChildProcess } from 'child_process'

export interface DevProcess {
  process: ChildProcess
}

export const startDevServer = (
  widgetDir: string,
  port: number,
  onLog: (line: string) => void
): DevProcess => {
  const proc = spawn('yarn', ['dev', '--port', String(port)], {
    cwd: widgetDir,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  })
  const handleData = (data: Buffer) =>
    data.toString().split('\n').filter(l => l.trim()).forEach(onLog)
  proc.stdout?.on('data', handleData)
  proc.stderr?.on('data', handleData)
  return { process: proc }
}

export const stopDevServer = (dev: DevProcess): void => {
  if (!dev.process.killed) dev.process.kill('SIGTERM')
}

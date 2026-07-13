import { spawnSync } from 'child_process'

const run = (args: string[]): string => {
  const result = spawnSync('git', args, { encoding: 'utf-8' })
  if (result.status !== 0) {
    throw new Error(`git ${args[0]} failed: ${result.stderr?.trim() ?? ''}`)
  }
  return result.stdout?.trim() ?? ''
}

export const checkDirtyState = (): boolean => {
  const result = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf-8' })
  return (result.stdout ?? '')
    .split('\n')
    .filter(l => l.trim())
    .some(l => !l.endsWith('widget_registry.json'))
}

export const commitAndPush = (message: string): void => {
  run(['add', 'widget_registry.json'])
  run(['commit', '-m', message])
  run(['push'])
}

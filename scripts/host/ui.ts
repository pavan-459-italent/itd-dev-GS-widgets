import chalk from 'chalk';

const COLORS = [chalk.cyan, chalk.green, chalk.yellow, chalk.magenta, chalk.blue, chalk.white];

export const getColor = (index: number) => COLORS[index % COLORS.length];

export const printHeader = () => {
  console.log(chalk.dim('╭──────────────────────────────────────╮'));
  console.log(chalk.dim('│') + '   ' + chalk.bold('Widget Preview Server') + '                 ' + chalk.dim('│'));
  console.log(chalk.dim('│') + '   ' + chalk.dim('Expose local widgets to CC') + '            ' + chalk.dim('│'));
  console.log(chalk.dim('╰──────────────────────────────────────╯'));
  console.log();
};

export const logWidget = (type: string, colorIndex: number, message: string) => {
  const label = getColor(colorIndex)(`[${type}]`);
  console.log(`${label} ${message}`);
};

export const printDivider = () => console.log(chalk.dim('━'.repeat(42)));

export const printLiveStatus = (
  widgets: Array<{ type: string; endpoint: string; colorIndex: number }>,
) => {
  printDivider();
  console.log('  ' + chalk.bold.green('LIVE PREVIEW ACTIVE'));
  for (const w of widgets) {
    console.log(`  ${getColor(w.colorIndex)(w.type.padEnd(14))} ${chalk.dim(w.endpoint)}`);
  }
  printDivider();
  console.log(
    '  Controls: ' + chalk.bold('[t]') + ' toggle widget   ' + chalk.bold('[q]') + ' quit & cleanup',
  );
  printDivider();
  console.log();
};

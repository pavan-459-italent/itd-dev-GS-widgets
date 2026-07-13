import chalk from 'chalk';

const API_BASE = 'https://mock.widget-service.local/api/v1/preview';

export const postRegistry = async (payload: object): Promise<void> => {
  console.log(chalk.dim(`[api] POST ${API_BASE}`));
  console.log(chalk.dim(JSON.stringify(payload, null, 2)));
};

export const deleteRegistry = async (): Promise<void> => {
  console.log(chalk.dim(`[api] DELETE ${API_BASE}`));
};

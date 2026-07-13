import ngrok from '@ngrok/ngrok';

const listeners: Awaited<ReturnType<typeof ngrok.connect>>[] = [];

export const createTunnel = async (port: number, authtoken: string): Promise<string> => {
  const listener = await ngrok.connect({ addr: port, authtoken });
  listeners.push(listener);
  return listener.url() ?? '';
};

export const closeTunnels = async (): Promise<void> => {
  await Promise.all(listeners.map((l) => l.close()));
  listeners.length = 0;
};

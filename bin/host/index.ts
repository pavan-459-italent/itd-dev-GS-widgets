import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import { startTunnel } from "./tunnel.js";
import { startReactWidgetDev } from "./dev-servers.js";
import { VITE_PORT } from "./constants.js";

const VITE_READY_DELAY_MS = 4000;

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function killPort(port: number): Promise<void> {
  const { stdout } = await execa("lsof", ["-t", `-i:${port}`], { reject: false });
  const pids = stdout?.trim().split(/\s+/).filter(Boolean) ?? [];
  for (const pid of pids) {
    await execa("kill", ["-9", pid], { reject: false });
  }
  if (pids.length > 0) {
    await sleep(500);
  }
}

async function main() {
  await killPort(VITE_PORT);

  const devSpinner = ora("Starting react_widget dev server...").start();
  const viteProcess = startReactWidgetDev();
  await sleep(VITE_READY_DELAY_MS);
  devSpinner.succeed("Dev server running");

  const tunnelSpinner = ora("Starting tunnel...").start();
  let tunnelUrl: string;
  let tunnelProcess: Awaited<ReturnType<typeof startTunnel>>["process"];

  try {
    const tunnel = await startTunnel();
    tunnelUrl = tunnel.url;
    tunnelProcess = tunnel.process;
    tunnelSpinner.succeed(`Tunnel ready: ${chalk.cyan(tunnelUrl)}`);
  } catch (err) {
    tunnelSpinner.fail("Tunnel failed");
    viteProcess.kill();
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  console.log(chalk.green("\nWidget: ") + chalk.cyan(tunnelUrl) + "\n");

  const cleanup = () => {
    tunnelProcess.kill();
    viteProcess.kill();
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  viteProcess.catch(() => {});
  tunnelProcess.catch(() => {});
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

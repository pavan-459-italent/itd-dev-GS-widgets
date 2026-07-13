import { execa, type ExecaChildProcess } from "execa";
import stripAnsi from "strip-ansi";
import { TUNNEL_URL_REGEX, VITE_PORT } from "./constants.js";

export async function startTunnel(): Promise<{
  url: string;
  process: ExecaChildProcess;
}> {
  const subprocess = execa("cloudflared", [
    "tunnel",
    "--url",
    `http://localhost:${VITE_PORT}`,
  ], {
    reject: false,
    all: true,
  });

  const REGISTERED_REGEX = /Registered tunnel connection/;

  const url = await new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => {
      subprocess.kill();
      reject(new Error("Timeout waiting for tunnel to connect"));
    }, 30000);

    let foundUrl: string | null = null;

    subprocess.all?.on("data", (chunk: Buffer | string) => {
      const text = stripAnsi(
        typeof chunk === "string" ? chunk : chunk.toString()
      );
      if (!foundUrl) {
        const match = text.match(TUNNEL_URL_REGEX);
        if (match) foundUrl = match[0];
      }
      if (foundUrl && REGISTERED_REGEX.test(text)) {
        clearTimeout(timeout);
        resolve(foundUrl);
      }
    });

    subprocess.catch((err) => {
      clearTimeout(timeout);
      if (err.message?.includes("ENOENT") || err.code === "ENOENT") {
        reject(
          new Error(
            "cloudflared not found. Install with: brew install cloudflared"
          )
        );
      } else {
        reject(err);
      }
    });
  });

  return { url, process: subprocess };
}

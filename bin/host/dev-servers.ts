import { execa, type ExecaChildProcess } from "execa";
import { REACT_WIDGET_CWD, VITE_PORT } from "./constants.js";

export function startReactWidgetDev(): ExecaChildProcess {
  return execa("yarn", ["dev"], {
    cwd: REACT_WIDGET_CWD,
    stdio: ["ignore", "inherit", "inherit"],
    env: { ...process.env, PORT: String(VITE_PORT) },
  });
}

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: { file: "dist/widget.js", format: "es" },
  external: ["lit", "lit/decorators.js"],
  plugins: [resolve(), typescript()],
};

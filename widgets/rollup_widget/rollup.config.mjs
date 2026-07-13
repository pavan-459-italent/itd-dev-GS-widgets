import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";

const watching = !!process.env.ROLLUP_WATCH;

export default {
  input: "src/main.ts",
  output: {
    file: "dist/widget.js",
    format: "es",
  },
  plugins: [
    copy({
      targets: [
        { src: "public/index.html", dest: "dist" },
        { src: "public/widget.css", dest: "dist" },
      ],
      hook: "buildStart",
    }),
    typescript(),
    watching && serve({ contentBase: "dist", port: 5500 }),
    watching && livereload("dist"),
  ].filter(Boolean),
};

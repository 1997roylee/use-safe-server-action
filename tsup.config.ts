import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  dts: true,
  outDir: "dist",
  clean: true,
  format: ["cjs", "esm"],
  treeshake: true,
  splitting: false,
});

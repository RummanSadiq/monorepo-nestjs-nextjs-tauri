import { tauriConfig, tseslint } from "@repo/eslint-config/tauri";

export default tseslint.config(
  ...tauriConfig,
  {
    files: ["src/**/*.ts"],
  },
  {
    ignores: ["dist/", "node_modules/"],
  },
);

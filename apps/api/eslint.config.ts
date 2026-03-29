import { nestConfig, tseslint } from "@repo/eslint-config/nest";

export default tseslint.config(
  ...nestConfig,
  {
    files: ["src/**/*.ts"],
  },
  {
    ignores: ["dist/", "node_modules/"],
  },
);

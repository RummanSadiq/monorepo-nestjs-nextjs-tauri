import { baseConfig, tseslint } from "@repo/eslint-config";

export default tseslint.config(
  ...baseConfig,
  {
    files: ["src/**/*.ts"],
  },
  {
    ignores: ["dist/", "node_modules/"],
  },
);

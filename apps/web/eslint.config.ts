import { baseConfig, tseslint } from "@repo/eslint-config";

export default tseslint.config(
  ...baseConfig,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
  },
  {
    ignores: [".next/", "node_modules/"],
  },
);

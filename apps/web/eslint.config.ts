import { nextConfig, tseslint } from "@repo/eslint-config/next";

export default tseslint.config(
  ...nextConfig,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
  },
  {
    ignores: [".next/", "node_modules/"],
  },
);

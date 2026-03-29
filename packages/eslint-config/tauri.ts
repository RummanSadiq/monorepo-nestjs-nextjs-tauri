import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export const tauriConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);

export { tseslint };

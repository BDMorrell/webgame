import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  }
}
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { ...languageOptions, globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions, plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
]);

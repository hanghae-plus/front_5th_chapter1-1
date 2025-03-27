import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    languageOptions: { 
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 2022  // Node.js 17 이상에서 structuredClone 지원
      }
    } 
  },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier,
];

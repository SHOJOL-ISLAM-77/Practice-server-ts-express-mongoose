import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').FlatConfig[]} */
export default [
  // TypeScript configuration
  {
    files: ["**/*.ts,"], // Apply only to TypeScript files
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
      },
      globals: globals.browser, // Browser-specific globals
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Use recommended TypeScript rules
    },
  },
];

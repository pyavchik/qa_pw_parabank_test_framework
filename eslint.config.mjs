import globals from 'globals';
import pluginJs from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/*',
      'playwright.config.js',
      'playwright.config.ts',
      '**/playwright-report/**',
    ],
  },
  { languageOptions: { globals: globals.node } },
  eslintConfigPrettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: { '@typescript-eslint': tseslint },
  },
  {
    ...pluginJs.configs.recommended,
    ...playwright.configs['flat/recommended'],
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'max-len': [
        'error',
        {
          code: 80,
          comments: 80,
          ignorePattern: 'import *',
        },
      ],
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
    },
    files: ['**/*.spec.js', '**/*.spec.ts'],
  },
];

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import i18nJson from 'eslint-plugin-i18n-json';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import * as jsonParser from 'jsonc-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    'node_modules/*',
    '.next/*',
    '.out/*',
    '!**/.prettierrc',
    '**/package.json',
    '**/package-lock.json',
    '**/tsconfig.json',
    'public/assets/images/*',
    '**/.eslintrc.json',
  ]),
  ...nextCoreWebVitals,
  ...compat.extends('plugin:prettier/recommended'),
  ...compat.extends('plugin:tailwindcss/recommended'),
  // ...compat.extends("plugin:jsx-a11y/recommended"), // Included in nextCoreWebVitals
  // ...compat.extends('plugin:i18n-json/recommended'),
  // ...compat.extends("plugin:@typescript-eslint/recommended"), // Included in nextCoreWebVitals
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      prettier,
      tailwindcss,
    },

    settings: {
      tailwindcss: {
        callees: ['cn'],
      },
    },

    rules: {
      'react/jsx-key': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'prettier/prettier': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-head-element': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-title-in-document-head': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/iframe-has-title': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
    },
  },
  {
    files: ['src/locale/messages/**/*.json'],
    languageOptions: {
      parser: jsonParser,
    },
    plugins: {
      'i18n-json': i18nJson,
    },
    rules: {
      'i18n-json/valid-message-syntax': [
        2,
        {
          syntax: 'icu',
        },
      ],

      'i18n-json/valid-json': 2,

      'i18n-json/sorted-keys': [
        2,
        {
          order: 'asc',
          indentSpaces: 2,
        },
      ],

      'i18n-json/identical-keys': 0,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]);

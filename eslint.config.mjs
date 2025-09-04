/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...compat.extends('plugin:import/typescript'),
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: legacyPlugin('eslint-plugin-import', 'import')
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaFeatures: {
          tsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-use-before-define': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      '@typescript-eslint/no-unsafe-argument': 'error',
      'react/prop-types': 'off',
      'import/order': [
        1,
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            {
              pattern: '@chakra-ui/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@codgital/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/features/**',
              group: 'internal'
            },
            {
              pattern: '@/shared/**',
              group: 'internal'
            },
            {
              pattern: 'assets/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  },
  {
    ignores: ['.next/*', '.history/*', 'public/firebase-messaging-sw.js', 'metro.config.js']
  }
];

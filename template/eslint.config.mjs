import { FlatCompat } from '@eslint/eslintrc';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const reactNativeConfig = require('@ltatarev/eslint-config-react-native');

export default [
  {
    ignores: [
      'node_modules/',
      '**/node_modules/',
      '.pnp.cjs',
      '.pnp.loader.mjs',
      '.yarn/',
      'android/build/',
      'android/app/build/',
      'build/',
      '**/build/',
      'coverage/',
      'dist/',
      '**/dist/',
      'ios/Pods/',
      '*.log',
      'vendor/',
    ],
  },
  ...compat.config(reactNativeConfig),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        __DEV__: 'readonly',
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          paths: ['src'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      react: {
        version: '18.1.0',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'global-require': 'off',
      'no-console': ['warn', { allow: ['warn'] }],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state', 'draft'],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['modules/*/*', 'modules/*/*/**'],
              message: 'Import from modules/<name> only (module public surface).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/modules/redux/store.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      'jest.config.{js,mjs,cjs}',
      'jest.unit.config.{js,mjs,cjs}',
    ],
    languageOptions: {
      globals: {
        afterEach: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        jest: 'readonly',
      },
    },
  },
];

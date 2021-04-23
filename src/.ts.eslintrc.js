// eslint-disable-next-line import/no-extraneous-dependencies
const eslintBase = require('@dwp/eslint-config-base');

module.exports = {
  ...eslintBase,

  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],

  rules: {
    ...eslintBase.rules,

    'brace-style': 'off',
    indent: 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    semi: 'off',

    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/semi': ['error', 'always', { omitLastInOneLineBlock: false }],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  reportUnusedDisableDirectives: true,
  plugins: ['@typescript-eslint'],
  extends: ['plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        arrowParens: 'avoid',
      },
      {
        usePrettierrc: false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier',
      ],
    },
  ],
}

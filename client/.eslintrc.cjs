module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'always'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/consistent-type-imports': 'off'
  }
};

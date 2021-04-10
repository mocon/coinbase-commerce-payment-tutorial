module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'ban-ts-comment': false,
    semi: ['error', 'never'],
  },
}

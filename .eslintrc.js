module.exports = {
  root: true,
  env: {
      node: true,
  },
  extends: [
      'plugin:vue/essential',
      '@vue/airbnb',
      '@vue/typescript/recommended',
      'plugin:prettier/recommended',
  ],
  parserOptions: {
      ecmaVersion: 2020,
  },
  plugins: ['prettier'],
  rules: {
      'no-alert': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      'no-async-promise-executor': 'off',
      'import/no-unresolved': 'off',
      'comma-dangle': ['error', 'only-multiline'],
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'spaced-comment': [
          'error',
          'always',
          {
              markers: ['/'],
          },
      ],
      'no-lonely-if': 'off',
      'lines-between-class-members': 'off',
      'no-useless-escape': 'off',
      'prefer-destructuring': 'off',
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
  },
};

// Exports
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  overrides: [
    // Test env
    {
      files: ['*/test/**', '**/*.test.*', '**/__tests__/**'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
    // Dev deps
    {
      files: ['*/test/**', '**/*.test.*', '**/__tests__/**', '*/types/**'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // Make rules stricter
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-shadow': 'error',

    // Replaced by typescript equivalent above
    'no-useless-constructor': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',

    // Disabled as named exports are preferred
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
        json: 'never',
      },
    ],

    // Preferences
    'lines-between-class-members': 'off',
    'no-dupe-class-members': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
};

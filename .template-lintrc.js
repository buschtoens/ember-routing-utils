'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  rules: {},
  overrides: [
    {
      files: ['tests/**/*-test.{js,ts}'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};

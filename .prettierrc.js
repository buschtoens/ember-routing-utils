'use strict';

module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',

  overrides: [
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
  ],
};

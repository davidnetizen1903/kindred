module.exports = {
  printWidth: 80,
  arrowParens: 'always',
  endOfLine: 'auto',
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  overrides: [
    {
      files: ['*.html', '*.json', '*.code-snippets'],
      options: {
        tabWidth: 4,
      },
    },
  ],
};

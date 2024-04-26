module.exports = {
  printWidth: 80,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@mantine/(.*)$',
    '^@components/(.*)$',
    '^@utils/(.*)$',
    '^@Interface/(.*)$',
    '^@style/(.*)$',
    '^[./]',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};

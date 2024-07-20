module.exports = {
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    tabWidth: 4,
    printWidth: 140,
    plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
    importOrder: [
        '^react(.*)',
        '^next(.*)',
        '<THIRD_PARTY_MODULES>',
        '^@(.*)',
        '^(configs|types|enums|consts|hooks|context|components|modules|errors|services|utils|store|redux)/(.*)$',
        '^[./]'
    ],
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: false
}

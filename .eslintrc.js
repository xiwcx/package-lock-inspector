module.exports = {
    extends: [
        "airbnb",
        "airbnb/hooks",
    ],
    globals: {
        document: true,
        localStorage: true,
        window: true,
    },
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }]
    }
}

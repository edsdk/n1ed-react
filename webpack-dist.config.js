const {resolve} = require('path');

module.exports = {
    mode: "production",

    resolve: {
        modules: [
            "./src",
            "node_modules"
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    entry: {
        'index': './src/index.tsx',
    },

    output: {
        path: resolve(__dirname, './dist'),
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
};
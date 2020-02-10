const {resolve} = require('path');

module.exports = {
    mode: "development",
    devtool: "sourcemap",

    resolve: {
        modules: [
            "./src",
            "node_modules"
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    entry: {
        'index': './src/index-debug.tsx',
    },

    output: {
        path: resolve(__dirname, './debug'),
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
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
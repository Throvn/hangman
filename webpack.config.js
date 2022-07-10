const path = require('path')

module.exports = {
    entry: ['./src/main.ts'],
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test : /\.ts$/,
            exclude: /node_modules/,
            use: [{ loader: 'ts-loader' }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map'
}
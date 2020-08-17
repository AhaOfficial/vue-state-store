const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './dist/default.js',
    output: {
        path: path.resolve(__dirname, 'export'),
        filename: 'vue-state-store.js',
        publicPath: './dist',
        library: 'VueStateStore',
        libraryTarget: 'this',
        libraryExport: 'default'
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },

    externals: {
        "@vue/composition-api": "VueCompositionAPI",
    },
}

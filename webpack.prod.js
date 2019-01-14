const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = require(path.join(__dirname, 'webpack.config.js'));

const uglyPlugin = require('uglifyjs-webpack-plugin');
const webpackDef = new webpack.DefinePlugin({
    'process.env.NODE_ENV' : JSON.stringify('production')
});

const uglyPlug = new uglyPlugin();

module.exports = merge(config, {
    mode: 'production',
    plugins: [
        webpackDef,
        uglyPlug
    ]
});
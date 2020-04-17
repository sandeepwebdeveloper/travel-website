const path = require('path')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: './apps/scripts/app.js',
    output:{
        filename:'bundled.js',
        path:path.resolve(__dirname,'apps')
    },
    devServer: {
        before: function(app, server) {
            server._watch('./apps/**/*.html')
        },
        contentBase: path.join(__dirname,'apps'),
        hot: true,
        port: 3030,
        host: '0.0.0.0'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test:/\.css$/i,
                use: ['style-loader','css-loader', {loader:'postcss-loader',options:{plugins: postCSSPlugins}}]
            }
        ]
    }
}
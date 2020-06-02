const currentTast = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-hexrgba')
]
class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy Images', function() {
            fse.copySync('./apps/assets/images', './docs/assets/images')
        })
    }
}
let cssConfig = {
    test:/\.css$/i,
    use: ['css-loader', {loader:'postcss-loader',options:{plugins: postCSSPlugins}}]
}

let pages = fse.readdirSync('./apps').filter(function(file) {
    return file.endsWith('.html')
}).map(function(page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./apps/${page}`
    })
})

let config = {
    entry: './apps/scripts/app.js',
    plugins: pages, 
    module: {
        rules: [
           cssConfig
        ]
    }
} 
//[new HtmlWebpackPlugin({filename: 'index.html', template: './apps/index.html'})],
if(currentTast == 'dev') {
    cssConfig.use.unshift('style-loader')
    config.output = {
        filename:'bundled.js',
        path:path.resolve(__dirname,'apps')
    }
    config.devServer = {
        before: function(app, server) {
            server._watch('./apps/**/*.html')
        },
        contentBase: path.join(__dirname,'apps'),
        hot: true,
        port: 3030,
        host: '0.0.0.0'
    }
    config.mode = 'development'
}

if(currentTast == 'build') {

    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postCSSPlugins.push(require('cssnano'))
    config.output = {
        filename:'[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path:path.resolve(__dirname,'docs')
    }
    config.mode = 'production'
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }
    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()    
    )
}

module.exports = config
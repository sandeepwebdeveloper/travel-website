const path = require('path')

const postCSSPlugins = [
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
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test:/\.css$/i,
                use: ['style-loader','css-loader', {loader:'postcss-loader',options:{plugins: postCSSPlugins}}]
            }
        ]
    }
}
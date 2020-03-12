const path = require('path')
module.exports = {
    entry: './apps/scripts/app.js',
    output:{
        filename:'bundled.js',
        path:path.resolve(__dirname,'apps')
    },
    mode: 'development'
}
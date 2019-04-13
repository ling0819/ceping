const path = require('path');

module.exports = {
    mode: 'development',  // 模式有两种 production development
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js',   // 打包后的文件名
        path: path.resolve(__dirname, '../public') // 必须是一个绝对路径
    },
    devServer: { // 开发服务配置
        port: 3000,
        progress: true,
        contentBase: './public',  //服务器指定运行的目录
        compress: true
    }

}
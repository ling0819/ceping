const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');         //html模板插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 抽离css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");        // js资源处理
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  // css压缩


module.exports = {
    mode: 'development',  // 模式有两种 production development  开发环境不会走优化项
    optimization: {      // 优化项 webpack4提供
        minimizer: [
            new UglifyJsPlugin({    //压缩js资源
                cache: true,//启动缓存
                parallel: true,//启动并行压缩
                //如果为true的话，可以获得sourcemap
                sourceMap: true // set to true if you want JS source maps
            }),
            //压缩css资源的
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.[hash:8].js',   // 打包后的文件名  显示8位hash
        path: path.resolve(__dirname, './public') // 必须是一个绝对路径
    },
    devServer: { // 开发服务配置
        port: 3000,
        progress: true,
        contentBase: './public',  //服务器指定运行的目录
        compress: true
    },
    plugins: [  //放置webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',  // 输出文件名
            minify: {
                removeAttributeQuotes: true,  //删除双引号
                collapseWhitespace: true,   // 折叠空行
            },
            hash: true   //为js添加hash
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: { // 模块  loader特点职责单一 可以组合使用  默认从右向左执行 loader还可以写成对象方式 从下到上执行
        rules: [
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint'
            //     }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {   //用babel-loader把es6转为es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {"legacy": true}],  // 解析class
                            ['@babel/plugin-proposal-class-properties', {"loose": true}], //解析装饰器
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,    //通过link标签插入，而不是直接写入
                    'css-loader',                   // 解析@import
                    'postcss-loader'                // 自动加浏览器前缀
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    }

}
// vue.config.js
const webpack = require('webpack')
var path = require('path')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,

    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,

    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
    configureWebpack: {
        entry:'./src/main.js', // 入口
        optimization: {
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial" // 只打包初始时依赖的第三方
                    },
                    elementUI: {
                        name: "chunk-elementUI", // 单独将 elementUI 拆包
                        priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/
                    },
                    jquery: {
                        name: "chunk-jquery", // 单独将 jquery 拆包
                        priority: 25, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                        test: /[\\/]node_modules[\\/]jquery[\\/]/
                    },
                    default:false,
                    commons: {
                        name: "chunk-commons",
                        chunks: "initial",
                        minChunks: 2, // 最小共用次数
                        minSize: 0,
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk:{
                name:'runtime'
            },
        },
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })

        ]
    },

    // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
    chainWebpack: config =>{
    },

    // 所有 webpack-dev-server 的选项都支持
    devServer: {},

    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require('os').cpus().length > 1,

    // 向 PWA 插件传递选项
    pwa: {},

    // 可以用来传递任何第三方插件选项
    pluginOptions: {}
}

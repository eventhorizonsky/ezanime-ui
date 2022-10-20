const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
    devServer:{
              // 项目运行时候的端口号
        host: "127.0.0.1",
        port: 8070,
  proxy: {
    '/omofun': {
        target: 'https://omofun.tv/',//后台接口
        ws: false, //如果要代理websockets
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        changeOrigin: true, //将选项changeOrigin设置true为基于名称的虚拟托管站点。
        pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/omofun': ''
        }
    }
}
},
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
     
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
  transpileDependencies: [
    'vuetify'
  ]
})

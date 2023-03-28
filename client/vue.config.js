const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   port: 8090, // 端口
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000/api',
  //       changeOrigin: true, //支持跨域
  //       pathRewrite: {
  //         // 路径重写
  //         '/api': '' // 用'/api'代替target里面的地址
  //       }
  //     }
  //   }
  // }

  // devServer:{
  //   proxy:{
  //       '/sougou':{
  //         // 跨域的服务器地址
  //           target: 'https://pic.sogou.com/napi/pc/searchList',
  //           // 是否允许跨域
  //           changeOrigin: true,
  //           // 替换掉请求路径的/sougou为“”
  //           pathRewrite:{'^/sougou': ""}
  //       },
  //       }
  //   }

  devServer:{
    proxy:{
        // port: 8080,
        // proxyTimeout: 300000,
        '/api':{
          // 跨域的服务器地址
            target: 'http://localhost:5000/api',
            // 是否允许跨域
            changeOrigin: true,
            // 替换掉请求路径的/sougou为“”
            pathRewrite:{'^/api': ""}
        },
        }
    }
  
})

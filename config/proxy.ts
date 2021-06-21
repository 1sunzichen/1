/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/filetest':{
      target: 'https://file-test.danyisong.com',
      changeOrigin: true,
      pathRewrite: { '^/filetest': '' },
    },
    '/ystest':{
      target: 'http://192.168.20.76:9003',
      changeOrigin: true,
      pathRewrite: { '^/ystest': '' },
    },
    '/ystest3':{
      target: 'http://172.29.5.135:9003',
      changeOrigin: true,
      pathRewrite: { '^/ystest3': '' },
    },
    //配置代理
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/github':{
      target: 'https://proapi.azurewebsites.net/github',
      changeOrigin: true,
      pathRewrite: { '^/github': '' },
    }
  },
  test: {
    '/filetest':{
      target: 'https://file-test.danyisong.com',
      changeOrigin: true,
      pathRewrite: { '^/filetest': '' },
    },
    '/ystest':{
      target: 'http://192.168.20.76:9003',
      changeOrigin: true,
      pathRewrite: { '^/ystest': '' },
    },
    '/ystest3':{
      target: 'http://172.29.5.135:9003',
      changeOrigin: true,
      pathRewrite: { '^/ystest3': '' },
    },
    //配置代理
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/github':{
      target: 'https://proapi.azurewebsites.net/github',
      changeOrigin: true,
      pathRewrite: { '^/github': '' },
    }
  },
  pre: {
    '/filetest':{
      target: 'https://file-test.danyisong.com',
      changeOrigin: true,
      pathRewrite: { '^/filetest': '' },
    },
    '/ystest':{
      target: 'http://192.168.20.76:9003',
      changeOrigin: true,
      pathRewrite: { '^/ystest': '' },
    },
    '/ystest3':{
      target: 'http://172.29.5.135:9003',
      changeOrigin: true,
      pathRewrite: { '^/ystest3': '' },
    },
    //配置代理
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/github':{
      target: 'https://proapi.azurewebsites.net/github',
      changeOrigin: true,
      pathRewrite: { '^/github': '' },
    }
  },
};

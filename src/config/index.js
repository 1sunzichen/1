export const API_CONFIG = {
    development: {
        fileapi: "/filetest",
        api: "/ystest",
      
    },
    test: {
        fileapi: "/filetest",
        api: "/ystest",
    },
    production: {
        fileapi: "/filetest",
        api: "/ystest",
    }
  }[process.env.REACT_APP_HOST_ENV || "development"];
  
  export const FILE_API = API_CONFIG.fileapi;
  export const API = API_CONFIG.api;

  //用户中心服务接口
  export const COMMON_API_URL = API_CONFIG.mapi;
  // cookie domain
  export const cookieDomain = {
    development: null,
    test: "babytree-test.com",
    production: "babytree.com"
  }[process.env.REACT_APP_HOST_ENV || "development"];
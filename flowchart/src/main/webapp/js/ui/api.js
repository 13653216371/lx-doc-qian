const http = axios.create({
  timeout: 10000,
  withCredentials: true,
  baseURL: '/api/'
})

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  function (response) {
    const { code, message } = response.data
    if (code === 401) {
      // 登录过期，跳转到登录页
      if (/^\/login/.test(location.pathname)) {
        return Promise.reject(response)
      } else {
        location.href = '/login'
      }
    } else if (code !== 0) {
      ElementPlus.ElMessage.error(message || '系统错误')
      return Promise.reject(response)
    }
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

const useMock = false

window.api = {
  // 上传文件
  uploadFiles(data) {
    if (useMock) {
      return window.getMockData('uploadFiles', data)
    }
    return http.post('/uploadFiles', data)
  },

  // 上传图片
  uploadImg(data) {
    if (useMock) {
      return window.getMockData('uploadImg', data)
    }
    return http.post('/uploadImg', data)
  },

  // 获取用户信息
  getUserInfo() {
    if (useMock) {
      return window.getMockData('getUserInfo')
    }
    return http.get('/getUserInfo')
  },

  // 获取用户配置
  getUserConfig(params) {
    if (useMock) {
      return window.getMockData('getUserConfig', params)
    }
    return http.get('/getUserConfig', {
      params
    })
  },

  // 更新用户配置
  updateUserConfig(data) {
    if (useMock) {
      return window.getMockData('updateUserConfig', data)
    }
    return http.post('/updateUserConfig', data)
  },

  // 更新文件
  updateFile(data) {
    if (useMock) {
      return window.getMockData('updateFile', data)
    }
    return http.post('/updateFile', data)
  },

  // 获取文件内容
  getFileContent(params) {
    if (useMock) {
      return window.getMockData('getFileContent', {
        params
      })
    }
    return http.get('/getFileContent', {
      params
    })
  }
}

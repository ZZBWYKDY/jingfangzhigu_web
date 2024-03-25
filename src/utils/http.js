import axios from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus';
// 引入配置文件
// import baseConfig from '@/config/config.base';
const isDev = process.env.NODE_ENV === 'development';
function getRequestUrl(url) {
  if (isDev) {
    return 'http://59.110.149.33:8001/api' + url;
  }
  return url;
}
// 创建一个请求对象
let axiosX = axios.create({
  baseURL: '',
  timeout: 1000 * 60 * 30, // 请求超时时间60毫秒
});

// request 拦截
axiosX.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    // 防抖处理
    const tokenKey = `${config.method}-${config.url}`;
    const cancel = debounceTokenCancel.get(tokenKey);
    if (cancel) {
      cancel();
    }
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve(config);
      }, 800);
      debounceTokenCancel.set(tokenKey, () => {
        clearTimeout(timer);
        resolve(new Error('取消请求'));
      });
    });
  },
  (err) => {
    return Promise.reject(err);
  }
);



// response 拦截
axiosX.interceptors.response.use(
  (response) => {
    console.log('response', response);
    const code = response.data.code;
    // 成功则直接返回数据

    if (response.data && response.data.code == 'SUCCESS') {
    } else {
      ElMessage.error(response.data.message);
    }
    return response;
  },
  (error) => {
    console.log('error', error);
    // 如果401 token过期
    if (error.response && error.response.status === 400) {
      ElMessage.error('请求出错!');
    }
    if (error.response && error.response.status === 401) {
      ElMessage.error('登录失效!');
    }
    if (error.response && error.response.status === 403) {
      ElMessage.error('拒绝访问!');
    }
    if (error.response && error.response.status === 404) {
      ElMessage.error('请求错误,未找到该资源!');
    }
    // 如果服务器返回500错误
    if (error.response && error.response.status === 500) {
      ElMessage.error('服务端错误!');
    }
    return Promise.reject(error);
  }
);

// 节流处理
let lastTime = new Date().getTime();
axiosX.interceptors.request.use(config => {
  const nowTime = new Date().getTime();
  if (nowTime - lastTime < 5000) {
    return Promise.reject(new Error('节流处理中，稍后再试'));
  }
  lastTime = nowTime;
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

/**
 * @param {string}  method   请求方法
 * @param {string}  url      请求地址
 * @param {Object}  params    请求参数
 * @param {Boolean} stringify 是否格式化参数
 */
function XHR(
  url,
  { method = 'get', params = {}, stringify = true, options = {} }
) {
  url = getRequestUrl(url);
  // 格式化参数
  let fromData = method === 'get' ? { params, ...options } : params;
  // 如果开启格式参数，且请求为 post
  if (['post', 'delete'].includes(method) && stringify) {
    fromData = qs.stringify(fromData);
  }
  if (['delete'].includes(method)) {
    fromData = { data: fromData };
  }
  // 返回结果
  return new Promise((resolve, reject) => {
    axiosX[method](url, fromData, options)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * GET 请求
 * @param {String} url 地址
 * @param {Object} params 参数
 * @param {Object} options 请求头设置
 */
export function axiosGet(url, params, options) {
  return XHR(url, { method: 'get', params, options });
}

/**
 * POST 请求
 * @param {String} url 地址
 * @param {Object} params 参数
 * @param {Boolean} stringify 是否格式化参数, formdata表单形式
 * @param {Object} options 请求头设置
 */
export function axiosPost(url, params, stringify = false, options) {
  return XHR(url, { method: 'post', params, options, stringify });
}
/**
 * DELETE 请求
 * @param {String} url 地址
 * @param {Object} params 参数
 * @param {Boolean} stringify 是否格式化参数, formdata表单形式
 * @param {Object} options 请求头设置
 */
export function axiosDelete(url, params, stringify = false, options) {
  return XHR(url, { method: 'delete', params, options, stringify });
}
export default function (Vue) {
  // 注入未封装的原始请求
  Vue.prototype.$axios = axiosX;
  // 注入封装好的请求
  Vue.prototype.$http = {
    get: axiosGet,
    post: axiosPost,
    delete: axiosDelete,
  };
}

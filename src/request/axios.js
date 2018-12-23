/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import store from '../store/index';

// 创建axios实例
const instance = axios.create({
  // baseURL: 'http://www.webq.top/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'Range' },
  withCredentials: true,
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use((config) => {
  // 登录流程控制中，根据本地是否存在token判断用户的登录情况
  // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
  // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
  // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
  const token = store.state.token;
  const cf = config;
  if (token) {
    cf.headers.Authorization = token;
  }
  return cf;
}, error => Promise.error(error));

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    }
    return Promise.reject(res);
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    store.commit('changeNetwork', false);
    return Promise.reject();
  },
);

// const APIHOST = process.env.API_HOST;

/**
 *
 * @param {*} data
 */
const fetch = (data) => {
  const config = {
    method: 'get',
    ...data,
  };
  return new Promise((resovle, reject) => {
    instance.request(config)
      .then((res) => {
        if (res.data) {
          resovle(res.data);
        } else {
          reject('fetch__err');
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {
  fetch,
};

export default instance;

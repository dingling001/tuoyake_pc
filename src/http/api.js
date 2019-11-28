import axios from 'axios'; // 注意先安装哦
import qs from 'qs'; // 序列化请求数据，视服务端的要求
import config from './config.js'; // 导入入默认配置
import store from '.././store.js';
import $com from '../bin/common'
let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
//配置全局取消数组
window.__axiosPromiseArr = [];

const instance = axios.create(config);

instance.interceptors.request.use(
  function (config) {
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消');
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }

    return config;
  },
  function (error) {
    return Promise.resolve(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    // console.log(response);
    // 判断是不是登录失效，是的话则触发登录窗口
    if (response.data.code == 401) {
      localStorage.removeItem('user_tpc');
      localStorage.url = window.location.href;
      window.location.href = window.location.origin + "/login";
    }
    return response.data;
  },
  function (error) {
    console.log(error)
    console.log(error.response.status)
    if (error == 'timeout of 10000ms exceeded'){
      console.log('网络超时了')
    }
      switch (error.response.status) {
        case 400:
          console.log('请求错误');
          break;
        case 401:
          console.log('未授权，请登录');
          break;
        case 408:
          store.commit('reFresh');
          break;
        //请求接口过载的提示
        case 503:
          store.commit('setHotState');
          break;
        case 500:
          store.commit('reFresh');
          break;
        case 501:
          store.commit('reFresh');
          break;
        case 502:
          store.commit('reFresh');
          break;
        default:
      }
    error.status = error.response.status;
    return Promise.reject(error);
  }
);

export default (url = '', data = {}, type = 'GET', isRepeat = false) => {
  let options = {
    url,
    cancelToken: new CancelToken((c) => {
      if (!isRepeat) {
        cancel = c;
        window.__axiosPromiseArr.push({cancel}); //放入一个全局数组，以便之后在router中统一取消
      }
    }),
  };
  type = type.toUpperCase();
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      options = Object.assign(options, {
        method: 'get',
        params: data,
      });
    } else if (type === 'POST') {
      options = Object.assign(options, {
        method: 'post',
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
      });
    } else if (type === 'FORMDATA') {
      const formData = new FormData();

      Object.entries(data).forEach((item) => {
        formData.append(item[0], item[1]);
      });

      options = Object.assign(options, {
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data', Accept: 'application/json'},
      });
    }
    instance(options)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log(error)
        if (error.status === 401) {
          localStorage.removeItem("user_tpc");
          $com.removeCookie('user_tpc')
          // 暂时缓存地址，授权成功后回跳这个地址
          localStorage.url = window.location.href;
          // window.location.href = window.location.origin + "/login";
        }
      });
  });
};

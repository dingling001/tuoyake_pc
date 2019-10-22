/**
 * 默认配置
 */
export default {
  // 基础url前缀
  baseURL: "",
  // 请求头信息
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "application/json"
  },
  // 设置超时时间
  timeout: 10000,
  // 返回数据类型
  responseType: "json",
  // withCredentials: true,
//   validateStatus:true,
//   validateStatus: function (status) {
//     return status!='200'; // default
// },
};

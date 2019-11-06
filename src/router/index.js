import Vue from "vue";
import Router from "vue-router";
import RouterCommon from "./common"; // 引入通用模块
import RouterModule from "./modules"; // 引入业务逻辑模块

Vue.use(Router);
var routes = [...RouterCommon, ...RouterModule];
const router = new Router({
  mode: "history",
  routes: routes
});

const cancelLastReq = next => {
  let axiosPromiseArr = window.__axiosPromiseArr || [];
  if (!!axiosPromiseArr && axiosPromiseArr.length) {
    let len = axiosPromiseArr.length;
    while (len--) {
      axiosPromiseArr[len].cancel("cancel");
      axiosPromiseArr.splice(len, 1);
    }
  }
  next();
};
router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  if (to.meta.building) {
    next('/wen');
    return false;
  }
  if (to.meta.needLogin) {
    // 哪些需要验证
    if (!localStorage.getItem("user_tpc")) {
      // token存在条件
      next({
        path: "/login", // 验证失败要跳转的页面
        query: {
          redirect: to.fullPath // 要传的参数(当前页面地址)
        }
      });

    } else {
      // console.log(global.location.pathname)
      // if (to.path !== global.location.pathname) {
      //     location.assign(to.fullPath)
      //     this.$router.push(to.fullPath)
      // }
      next();
    }
  } else {
    // if (u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger' || u.match(/WebP/i) == "webp") {
    //     next();
    //     return;
    // }
    // if (to.path !== global.location.pathname) {
    //   location.assign(to.fullPath)
    // }
    next();
  }
  cancelLastReq(next);
});

export default router;

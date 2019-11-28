import Vue from "vue";
import Router from "vue-router";
import RouterCommon from "./common"; // 引入通用模块
import RouterModule from "./modules"; // 引入业务逻辑模块
import $com from '../bin/common'
Vue.use(Router);

var routes = [...RouterCommon, ...RouterModule];
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.

  if(to.hash){
    console.log(to.hash)
    return {
      selector:to.hash
    }
  }
}
const router = new Router({
  mode: "history",
  routes: routes,
  scrollBehavior
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
    if (!$com.getCookies("user_tpc")) {
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

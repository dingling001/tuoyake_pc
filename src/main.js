import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import Element from "element-ui";

import "@/style/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import api from "./http";
import store from "./store";
import 'swiper/dist/css/swiper.min.css'
import VueQrcode from "@xkeshi/vue-qrcode";
import '@/style/animate.css';
import Common from "./bin/common";
Vue.prototype.$com = Common;

Vue.component(VueQrcode.name, VueQrcode);
Vue.use(api);
Vue.use(Element);

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  }
});

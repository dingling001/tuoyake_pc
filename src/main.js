import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import Element from "element-ui";
import NoData from '@/components/NoData'
import "@/style/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import VideoPlayer from 'vue-video-player'
import api from "./http";
// import 'swiper/dist/css/swiper.min.css'
import VueQrcode from "@xkeshi/vue-qrcode";
import '@/style/animate.css';
import Common from "./bin/common";
Vue.prototype.$com = Common;
Vue.component('NoData',NoData)
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(api);
Vue.use(Element);
Vue.use(VideoPlayer)
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "58297e29dad84904a8d81fb669877e6dab803e60a80492b8f16c5e257328843b"
fundebugVue(fundebug, Vue);
new Vue({
  el: "#app",
  router,
  components: {
    App
  }
});

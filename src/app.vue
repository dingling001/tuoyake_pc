<template>
  <div v-cloak class="app">
    <div id="map"></div>
    <vHeader ref="nav" v-if="nav"></vHeader>
    <div class="contains">
      <router-view></router-view>
    </div>
    <vFooter v-if="footer"></vFooter>
    <el-tooltip placement="top" content="返回顶部">
      <!-- 组件使用 -->
      <BackToTop
        transitionName="fade"
        :customStyle="myBackToTopStyle"
        :visibilityHeight="300"
        :backPosition="0">
      </BackToTop>
    </el-tooltip>
  </div>
</template>
<script>
  import vHeader from "./components/vheader.vue";
  import vFooter from "./components/vfooter.vue";

  import BackToTop from './components/backTop'

  export default {
    name: "App",
    data() {
      return {
        nav: true,
        footer: true,
        myBackToTopStyle: {
          'right': '100px',
          'bottom': '150px',
          'width': '40px',
          'height': '40px',
          'border-radius': '20px',
          'line-height': '40px',
          'background-color': '#fff'
        }
      };
    },
    provide() {
      return {
        app: this
      };
    },
    components: {
      vHeader,
      vFooter,
      BackToTop
    },
    created() {
      var _ = this;
    },

    methods: {
      // 初始化地图
    }
  };
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .app {
    height: 100%;
  }

  .contains {
    min-height: 63.5vh;
    width: 1200px;
    margin: 0 auto;
  }


</style>

<template>
  <div v-cloak class="app">
    <div id="map"></div>
    <vHeader ref="nav" v-if="showH" :shownav="shownav"></vHeader>
    <div :class="['contains', shownav?'':'shownav']">
      <router-view></router-view>
    </div>
    <vFooter v-if="showF"></vFooter>
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
        showH: true,
        showF: true,
        shownav:true,
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
    watch: {
      '$route': {
        handler(val) {
          // console.log(val)
          // this.showH = val.meta.showH;
          // this.showF = val.meta.showF;
        },
        immediate: true
      },
      'shownav':{
        handler(val) {
          // this.showH = val.meta.showH;
          // this.showF = val.meta.showF;
          this.shownav = val;
        },
        immediate: true
      }
    },
    created() {
      var _ = this;
      _.$router.afterEach((to, from) => {
        _.showH = to.meta.showH;
        _.showF = to.meta.showF;
        _.shownav = to.meta.shownav;
      });
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
    min-height: 66.4vh;
    min-width: 1200px;
    margin: 0 auto;
  }
  .shownav{
    min-height: 71vh;
  }


</style>

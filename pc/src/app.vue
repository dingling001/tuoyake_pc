<template>
  <div v-cloak class="app">
    <div id="map"></div>
    <vHeader ref="nav" v-if="nav"></vHeader>
    <div class="contains">
      <router-view></router-view>
    </div>
    <vFooter v-if="footer"></vFooter>
  </div>
</template>
<script>
  import vHeader from "./components/vheader.vue";
  import vFooter from "./components/vfooter.vue";

  export default {
    name: "App",
    data() {
      return {
        nav: true,
        footer: true,
      };
    },
    provide() {
      return {
        app: this
      };
    },
    components: {
      vHeader,
      vFooter
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

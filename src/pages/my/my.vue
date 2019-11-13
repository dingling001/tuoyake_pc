<template>
  <div class="mbox">
    <div class="my_left">
      <div class="my_head">
        <div class="my_img"><img src="" alt=""></div>
        <div class="my_nickname"></div>
        <div class="my_score"></div>
      </div>
    </div>
    <div class="my_right"></div>
  </div>
</template>

<script>
  export default {
    name: "my",
    data() {
      return {
        adinfo: {},
        user_tpc: '',
        user_info: {},
      }
    },
    created() {
      this._GetAdv();
      if (localStorage.user_tpc) {
        this.user_tpc = localStorage.user_tpc;
        this._GetUserInfo()
      }
    },
    methods: {
      // 去设置页面
      goset() {
        this.$router.push({path: '/myset'})
      },
      // 获取个人信息
      _GetUserInfo() {
        this.$api.GetUserInfo().then(res => {
          // console.log(res)
          if (res.code == 1) {
            this.user_info = res.data;
          }
        })
      },
      // 获取广告位
      _GetAdv() {
        this.$api.GetAdv(1).then(res => {
          // console.log(res)
          this.adinfo = res.data;
        })
      },
      // 登录
      gologin() {
        this.$router.push({path: '/login'})
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .mbox {
    .my_left {
      float: left;
      width: 228px;

      .my_head {
        height: 230px;

        .my_img {
          width: 80px;
          height: 80px;
          img{
            width: 100%;
          }
        }

      }
    }
  }

</style>

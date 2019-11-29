<template>
  <!--    <div class="plogo"><img :src="platinfo.logo" alt=""></div>-->
  <el-card class="pbox">
    <!--      <div slot="header" class="clearfix">-->
    <!--        <span>关于平台</span>-->
    <!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    <!--      </div>-->
    <div class="logobox"><img :src="platinfo.logo" alt=""></div>
    <div class="pitem">
      加盟热线：{{platinfo.join_hotline}}
    </div>
    <div class="pitem">
      平台客服：{{platinfo.customer_service}}
    </div>
    <div class="pitem">
      <a
        :href="'mqqwpa://im/chat?chat_type=wpa&uin='+platinfo.qq_number +'&version=1&src_type=web&web_src=oicqzone.com'"
        target="_blank">
        平台QQ：{{platinfo.qq_number}}
      </a>
    </div>
    <div class="pitem">
      <a :href="platinfo.website" target="_blank">
        平台网址：{{platinfo.website}}
      </a>
    </div>
    <div class="setbox">
      <div class="codebox">
        <div class="citem">
          <img :src="platinfo.weibo_qrcode" alt="">
          <div>平台公众号</div>
        </div>
        <div class="citem">
          <img :src="platinfo.weibo_qrcode" alt="">
          <div>平台微博</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        platinfo: {}
      }
    },
    created() {
      this._Platform()
    },
    methods: {
      _Platform() {
        this.$api.Platform().then(res => {
          console.log(res)
          if (res.code == 1) {
            this.platinfo = res.data;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .pbox {
    background-color: #fff;
    margin: 20px auto;
    width: 1200px;
    padding: 30px 100px;

    .logobox {
      width: 114px;
      margin: 20px auto;

      img {
        width: 100%;
      }
    }

    .plogo {
      padding: 40px 0;
      text-align: center;
      width: 83px;
      margin: 0 auto;

      img {
        width: 100%;
      }
    }

    .pitem {
      font-size: 16px;
      line-height: 54px;
    }

    .setbox {
      /deep/ .van-cell {
        padding: 20px 20px 19px 23px;
        font-size: 16px;
        /*px*/
        .van-cell__title {
          color: #333;
          font-size: 16px;
          /*px*/
        }

        &:not(:last-child):after {
          left: 20px;
        }

      }

      &:after {
        border: 0;
      }
    }

    .codebox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 39px 55px;

      .citem {
        width: 96px;
        color: #666;
        text-align: center;
        font-size: 13px;
        /*px*/
        img {
          width: 100%;
          margin-bottom: 10px;
        }

      }
    }
  }
</style>

<template>
  <div class="cup_d" v-if="Object.keys(cup_info)">
    <div class="title"> {{cup_info.name}}<div class="status">{{cup_info.status_text}}</div>
    </div>
    <div class="date">
      <div><span class="iconfont icontime-circle"></span> 有效期</div>
      <div class="day">{{cup_info.expire_time}}</div>
    </div>
    <div class="intro">
      <div><span class="iconfont iconjianjie"></span> 简介</div>
      <div class="introcontent">
        {{cup_info.remark}}
      </div>
    </div>
    <div class="codebox">
      <qrcode :value="cup_info.share_url" :options="{ size: 162 }"></qrcode>

    </div>
    <router-link tag="div" to="/download" class="sharebtn">扫码下载App</router-link>
    <div class="tips">注：优惠券需分享激活</div>
  </div>
</template>

<script>
  export default {
    name: "myCoupondetail",
    data() {
      return {
        id: '',
        cup_info: {}
      }
    },
    created() {
      this.id = this.$route.query.id;
      this._GetCouponInfo()
    },
    methods: {
      _GetCouponInfo() {
        this.$api.GetCouponInfo(this.id).then(res => {
          console.log(res)
          if (res.code == 1) {
            this.cup_info = res.data;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  /*background: linear-gradient(90deg, rgba(252, 208, 116, 1), rgba(255, 85, 73, 1));*/

  .cup_d {
    background-color: #fff;
    width: 800px;
    margin: 0 auto;
    /*margin: 20px 16px;*/
    .title {
      padding: 25px 0;
      margin: 0 23px;
      text-align: center;
      position: relative;
      border-bottom: 1px dashed #d8d8d8;
      font-size: 16px;
      font-weight: bold;
      /*px*/
      color: #333333;

      .leftcricle {
        position: absolute;
        background-color: rgba(252, 208, 116, 1);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        left: -33px;
        bottom: -10px;
      }

      .rightcricle {
        position: absolute;
        background-color: rgba(255, 85, 73, 1);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        right: -33px;
        bottom: -10px;
      }

      .status {
        position: absolute;
        top: 27px;
        right: 0;
        color: #999999;
        font-size: 13px;
        /*px*/
      }
    }

    .date {
      padding: 22px 26px 0;
      color: #333;
      font-size: 15px;
      font-weight: bold;
      /*px*/
      .day {
        color: #999999;
        font-size: 13px;
        /*px*/
        padding: 10px 30px;
      }
    }

    .iconfont {
      background-image: -webkit-linear-gradient(right, rgba(252, 208, 116, 1), rgba(255, 85, 73, 1));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #ccc;
      font-weight: bold;
      font-size: 20px;
    }

    .intro {
      color: #333;
      padding: 0 26px;
      font-size: 15px;
      font-weight: bold;
      /*px*/
      .introcontent {
        color: #999999;
        font-size: 13px;
        /*px*/
        line-height: 25px;
        padding: 10px 30px;

      }
    }

    .codebox {
      width: 162px;
      height: 162px;
      background-color: #f5f5f5;
      margin: 20px auto;
    }

    .sharebtn {
      width: 226px;
      text-align: center;
      background: linear-gradient(90deg, rgba(252, 208, 116, 1), rgba(255, 85, 73, 1));
      line-height: 40px;
      color: #fff;
      font-size: 17px;
      /*px*/
      border-radius: 20px;
      margin: 0 auto;
      cursor: pointer;
    }

    .tips {
      padding: 15px 0;
      text-align: center;
      color: #999999;
      font-size: 12px;
      /*px*/
    }
  }
</style>

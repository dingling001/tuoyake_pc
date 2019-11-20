<template>
  <div class="score_box">
    <div class="score_top">
      <div class="iconbox" @click="myAddress()">
        <div class="name">我的积分</div>
        <div class="achieve_right">我的地址<span class="iconfont iconjiantou"></span></div>
      </div>
      <div class="score_item">
        <div class="item">
          <span class="mys"><img src="../../img/index/zs.png" alt=""><span>当前积分</span></span>
          <span class="scroe">{{score}}</span>
          分
        </div>
      </div>
      <router-link class="score_label" to="/my/myRules" tag="div">
        注：取消/退款消费金额不计入积分池
        <span>规则说明></span>
      </router-link>
    </div>
    <div class="hr"></div>
    <div class="mlink">
      <div class="mitem">
        <div class="title">累计有效积分<span>100</span>分可领取以下商品</div>

      </div>
      <!--      <van-cell is-link :border='false' to="myReward">-->
      <!--        &lt;!&ndash; 使用 title 插槽来自定义标题 &ndash;&gt;-->
      <!--        <template slot="title">-->
      <!--          <span class="iconfont iconmedal-fill"></span>-->
      <!--          <span class="custom-title">奖励领取</span>-->
      <!--        </template>-->
      <!--      </van-cell>-->
      <!--      <van-cell is-link :border='false' to="myAddress">-->
      <!--        &lt;!&ndash; 使用 title 插槽来自定义标题 &ndash;&gt;-->
      <!--        <template slot="title">-->
      <!--          <span class="iconfont icondizhiguanli"></span>-->
      <!--          <span class="custom-title">地址设置</span>-->
      <!--        </template>-->
      <!--      </van-cell>-->
      <!--      <van-cell is-link :border='false' to="myRules">-->
      <!--        &lt;!&ndash; 使用 title 插槽来自定义标题 &ndash;&gt;-->
      <!--        <template slot="title">-->
      <!--          <span class="iconfont icondictionary-fill"></span>-->
      <!--          <span class="custom-title">规则说明</span>-->
      <!--        </template>-->
      <!--      </van-cell>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "myPoints",
    data() {
      return {
        score: 0
      }
    },
    created() {
      this._ScoreIndex()
    },
    methods: {
      // 获取我的积分
      _ScoreIndex() {
        this.$api.ScoreIndex().then(res => {
          if (res.code == 1) {
            this.score = res.data.score;
          }
        })
      },
      myAddress() {
        this.$router.push({path: '/my/myAddress'})
      },
      // 返回上一页
      backmy() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .score_box {
    .score_top {
      /*background-image: url("../../assets/img/wdbm.png");*/
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      padding: 0 0 50px 0;

      .iconbox {
        line-height: 44px;
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        border-bottom: 1px solid #EEEEEE;

        .name {
          font-size: 18px;
          color: #333;
          float: left;
        }

        .iconfanhui {
          font-weight: bold;
        }

        .achieve_right {
          float: right;
          cursor: pointer;

          &:hover {
            color: $baseRed;
          }
        }

        .iconcaret-right {
          font-size: 12px;
          /*px*/
        }
      }


      .score_item {
        /*display: flex;*/
        padding: 40px 0 25px 0;
        color: #333;
        text-align: center;

        .item {
          margin-right: 40px;
          display: inline-block;
          font-size: 14px;
          color: #A4A5B8;

          .scroe {
            font-size: 30px;
            font-weight: bold;
            color: #333;
          }

          .mys {
            font-size: 16px;
            color: #333;
            display: inline-flex;
            align-items: center;
            margin-right: 10px;

            span {
              line-height: 24px;
              display: inline-block;
            }

            img {
              width: 24px;
              margin-right: 10px;
            }
          }
        }
      }

      .score_label {
        text-align: center;
        color: #A4A5B8;
        font-size: 12px;
        cursor: pointer;

        span {
          color: #66687D;

          &:hover {
            color: $baseRed;
          }
        }
      }
    }

    .hr {
      height: 15px;
      background-color: #f8f8f8;
    }

    .mlink {
      position: relative;
      z-index: 2;
      overflow: hidden;
      background-color: #fff;
      padding: 0 34px;

      .mitem {
        .title {
          padding: 42px 0 30px 0;
          color: #999999;
          font-size: 14px;

          span {
            color: #333;
          }
        }
      }
    }
  }
</style>

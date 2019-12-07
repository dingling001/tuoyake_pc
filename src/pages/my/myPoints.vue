<template>
  <div class="score_box">
    <div class="score_top">
      <div class="iconbox" @click="myAddress()">
        <div class="name">我的积分</div>
        <div class="achieve_right"><span>我的地址</span><span class="iconfont iconjiantou"></span></div>
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
      <div class="mitem" v-for="item in sglist" :key="item.id">
        <div class="listimg"><img :src="item.image" alt=""></div>
        <div class="title">累计有效积分<span>{{item.score}}</span>分可领取</div>
        <div class="listitem">{{item.goods_name}}</div>
        <div :class="['btn',item.status!=1?'disabled':''] ">
          <span v-if="item.status==0">未达成</span>
          <span v-else-if="item.status ==1">立即领取</span>
          <span v-else-if="item.status==2">已领取</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myPoints",
    data() {
      return {
        score: 0,
        sglist: []
      }
    },
    created() {
      this._ScoreIndex();
      this._ScoreGoods();
      this._ScoreGoods();
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
      _ScoreGoods() {
        this.$api.ScoreGoods().then(res => {
          if (res.code == 1) {
            this.sglist = res.data;
          }
        })
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
          line-height: 47px;

          &:hover {
            color: $baseRed;
          }
          span{
            line-height: 47px;
            display: inline-block;
            &.iconfont{
              font-size: 15px;
            }
          }
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
      padding: 34px;

      .mitem {
        width: 180px;
        float: left;
        text-align: center;
        margin: 0 40px 40px 0;
        cursor: pointer;

        &:nth-child(4n) {
          margin: 0 0 40px 0;
        }

        .listimg {
          width: 180px;
          height: 180px;
          text-align: center;

          img {
            width: 100%;
          }
        }

        .listitem {
          font-size: 18px;
          color: #333;
          line-height: 42px;
        }

        .title {
          color: #999999;
          line-height: 30px;
          font-size: 14px;

          span {
            color: #333;
          }
        }

        .btn {
          width: 110px;
          background-color: $baseBlue;
          color: #fff;
          line-height: 30px;
          margin: 0 auto;

          &.disabled {
            background-color: #ccc;
          }
        }
      }
    }
  }
</style>

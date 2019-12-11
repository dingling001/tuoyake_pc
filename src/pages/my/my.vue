<template>
  <div class="mbox">
    <div class="my_left">
      <div class="my_head">
        <div class="my_img">
          <el-avatar shape="circle" :size="80" fit="cover" :class="{noimg:user_info.avatar}" :key="user_info.avatar"
                     :src="user_info.avatar"></el-avatar>
        </div>
        <div class="my_nickname">{{user_info.nickname}}</div>
        <div class="my_score">当前积分 : <span>{{user_info.score}}</span></div>
      </div>
      <div class="my_nav">
        <div :class="['nav_item', cur==0?'active_item':'']" @click="gonav('myCollect',0)"><span
          class="iconfont iconheart-fill"></span>我的收藏
        </div>
        <div :class="['nav_item', cur==1?'active_item':'']" @click="gonav('myOrder',1)"><span
          class="iconfont iconicon"></span><span><el-badge :value="onum" :max="999" v-if="onum>0">我的订单</el-badge><span
          v-else>我的订单</span>
        </span>
        </div>
        <div :class="['nav_item', cur==2?'active_item':'']" @click="gonav('myApplication',2)"><span
          class="iconfont icontianxie"></span>我的报名
        </div>
        <div :class="['nav_item', cur==3?'active_item':'']" @click="gonav('myPoints',3)"><span
          class="iconfont iconjifen"></span>我的积分
        </div>
        <div :class="['nav_item', cur==4?'active_item':'']" @click="gonav('myCoupon',4)"><span
          class="iconfont iconyouhuiquan"></span><el-badge :value="cnum" :max="99" v-if="cnum>0">我的优惠券</el-badge><span v-else>我的优惠券</span>
        </div>
        <div :class="['nav_item', cur==5?'active_item':'']" @click="gonav('myFeedback',5)"><span
          class="iconfont iconfeedback-center"></span>意见反馈
        </div>
        <div :class="['nav_item', cur==6?'active_item':'']" @click="gonav('myset',6)"><span
          class="iconfont iconshezhi2"></span>账号设置
        </div>
      </div>
    </div>
    <div class="my_right">
      <router-view></router-view>
    </div>
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
        cur: 0,
        onum: 0,
        cnum: 0,
      }
    },
    provide() {
      return {
        app: this
      };
    },
    watch: {
      $route: {
        handler(val) {
          // console.log(val)
          this.cur = val.meta.cur;
        },
        immediate: true
      }
    },
    beforeRouteEnter(to, form, next) {
      // console.log(to)
      if (to.meta.cur) {
        next.cur = to.cur;
      }
      next()
    },
    created() {
      this._GetAdv();
      if (this.$com.getCookies('user_tpc')) {
        this.user_tpc = this.$com.getCookies('user_tpc');
        this._GetUserInfo();
        this._OrderGetOrderNum();
        this._GetCouponList();
      }
    },
    methods: {
      // 去设置页面
      gonav(path, index) {
        this.cur = index;
        this.$router.push({path: `/my/${path}`})
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
      },
      _OrderGetOrderNum() {
        this.$api.OrderGetOrderNum().then(res => {
          // console.log(res)
          if (res.code == 1) {
            this.onum = res.data;

          }
        })
      },
      _GetCouponList() {
        this.$api.GetCouponList(1, 0).then(res => {
          if (res.code == 1) {
            this.cnum = res.data.total
          }
        })
      },
    }

  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .mbox {
    width: 1200px;
    margin: 20px auto;
    overflow: hidden;

    .my_left {
      float: left;
      width: 228px;

      .my_head {
        height: 230px;
        background-color: #fff;
        overflow: hidden;
        text-align: center;
        margin-bottom: 16px;

        .my_img {
          width: 80px;
          height: 80px;
          margin: 20px auto;

          img {
            width: 100%;
          }

          /deep/ .el-avatar {
            &.noimg {
              background: none;
            }
          }
        }

        .my_nickname {
          color: #333;
          font-size: 18px;
          padding: 23px 0 15px;
        }

        .my_score {
          color: #999999;
          font-size: 14px;

          span {
            color: $baseRed;
          }
        }
      }

      .my_nav {
        width: 228px;
        min-height: 458px;
        background-color: #fff;

        .nav_item {
          color: #666666;
          font-size: 16px;
          padding: 0 0 0 52px;
          line-height: 65px;
          cursor: pointer;
          /*height: 65px;*/

          .iconfont {
            width: 25px;
            font-size: 20px;
            color: #BBBCCB;
            display: inline-block;
            background-image: -webkit-linear-gradient(right, #BBBCCB, #EAEAEA);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 5px;
            &.iconyouhuiquan{
              font-size: 18px;
            }
          }

          &.active_item {
            color: #000;

            .iconfont {
              background-image: -webkit-linear-gradient(136deg, $baseBlue, $baseRed);
            }
          }

          &:hover {
            color: #000;
          }

          &:hover .iconfont {
            background-image: -webkit-linear-gradient(136deg, $baseBlue, $baseRed);
          }

          /deep/ .el-badge {
            display: inline-block;
            line-height: 30px;
          }
        }
      }
    }

    .my_right {
      float: right;
      width: 956px;
      background-color: #fff;
      min-height: 713px;
    }
  }
</style>

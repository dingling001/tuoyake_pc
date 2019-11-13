<template>
  <el-tabs v-model="active" @tab-click="changetype" class="coupbox">
    <el-tab-pane v-for="(item,index) in navs" :key="index" :name="JSON.stringify(index)" :label="item" class="tab">
    </el-tab-pane>
    <div v-show="active==0">
      <div class="couponlist">
        <div :class="['coupitem',item.status==3||item.status==4?'used':'']" v-for="(item,index) in couplist"
             @click="godetail(item.id)">
          <span class="leftcricle"></span>
          <span class="rightcricle"></span>
          <div class="cl">
            <div>{{item.name}}</div>
            <div class="date">{{item.expire_time}}</div>
          </div>
          <div class="cr">{{item.status_text}} <span v-if="item.status==1||item.status==2"
                                                     class="iconfont iconcaret-right"></span></div>
        </div>
      </div>
    </div>
    <div v-show="active==1">
      <div class="couponlist" v-if="couplist.length">
        <div :class="['coupitem',item.status==3||item.status==4?'used':'']" v-for="(item,index) in couplist">
          <span class="leftcricle"></span>
          <span class="rightcricle"></span>
          <div class="cl">
            <div>{{item.name}}</div>
            <div class="date">{{item.expire_time}}</div>
          </div>
          <div class="cr">{{item.status_text}} <span v-if="item.status==1||item.status==2"
                                                     class="iconfont iconcaret-right"></span></div>
        </div>
      </div>
      <div class="nodata" v-else>暂无数据</div>
    </div>
  </el-tabs>
</template>

<script>
  export default {
    name: "myCoupon",
    data() {
      return {
        active: 0,
        page: 0,
        navs: ['未使用', '已使用'],
        couplist: [],
        type: 1
      }
    },
    created() {
      this._GetCouponList()
    },
    methods: {
      // 获取列表
      _GetCouponList() {
        this.$api.GetCouponList(this.type, this.page).then(res => {
          this.couplist = res.data.data;
        })
      },
      // 切换
      changetype() {
        this.type = this.active + 1;
        this.page = 0;
        this._GetCouponList()
      },
      // 去详情
      godetail(id) {
        this.$router.push({path: 'myCoupondetail', query: {id: id}})
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .coupbox {
    background-color: #ffff;

    /deep/ .van-hairline--top-bottom, .van-hairline-unset--top-bottom {
      &:after {
        border: 0;
        border-bottom: 1px solid #ebedf0;
      }
    }

    .couponlist {
      padding: 44px 55px;
      overflow: hidden;

      .coupitem {
        /*background: linear-gradient(90deg, rgba(252, 208, 116, 1), rgba(255, 85, 73, 1));*/
        background: linear-gradient(90deg, rgba(227, 234, 247, 1), rgba(223, 223, 244, 1));
        /*height: 94px;*/
        position: relative;
        display: flex;
        align-items: center;
        padding: 28px 26px 28px 37px;
        justify-content: space-between;
        float: left;
        width: 387px;
        margin: 0 70px 40px 0;
        cursor: pointer;

        &:nth-child(2n) {
          margin: 0 0 40px 0;
        }

        .leftcricle {
          position: absolute;
          background-color: #fff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          left: -10px;
          top: 0;
          bottom: 0;
          margin: auto 0;
        }

        .rightcricle {
          position: absolute;
          background-color: #fff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          right: -10px;
          top: 0;
          bottom: 0;
          margin: auto 0;
        }

        .cl {
          color: $baseBlue;
          font-size: 16px;
          /*px*/
          line-height: 20px;

          .date {
            font-size: 12px;
          }
        }

        .cr {
          width: 70px;
          /*height: 25px;*/
          border: 1px solid $baseBlue;
          border-radius: 13px;
          flex-shrink: 0;
          text-align: center;
          line-height: 25px;
          color: $baseBlue;
          font-size: 12px;
          /*px*/
          .iconcaret-right {
            font-size: 12px;
            /*px*/
          }

        }

        &.used {
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));

          .cr {
            border: 0;
          }
        }
      }
    }

  }

</style>

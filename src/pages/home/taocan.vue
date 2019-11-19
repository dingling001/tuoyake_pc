<template>
  <div class="tcbox">
    <div class="swiperbox">
      <div class="swiperimg"><img :src="goodinfo.image" alt="">
      </div>
      <div class="taocaninfo">
        <div class="comnanme">{{goodinfo.name}}</div>
        <!--<div class="taocannum">-->
        <div class="taocandes">{{goodinfo.content}}</div>
        <!--</div>-->
        <div class="btnbox">
          <div class="price">套餐价<span><span>¥ </span>{{goodinfo.price}}</span></div>
          <div class="numbox">
            <span :class="['iconfont iconminus-circle' ,num<=0? 'disicon':'']" @click="nminus"></span>
            <input type="number" v-model="num" placeholder="">
            <span class="iconfont iconplus-circle" @click="plus"></span>
          </div>
          <div class="taocan_btn" @click="goapp">￥{{goodinfo.price*num}} 立即抢购</div>
        </div>
        <div class="nright" @click="clllection">
          <div :class="['iconfont iconheart-fill', goodinfo.is_collection==0? '':'iconactive']"></div>
          <div>{{goodinfo.is_collection==0?'收藏':'已收藏'}}</div>
        </div>
      </div>
    </div>
    <!--<div class="comaddress">-->
    <!--<div class="adressitem">-->
    <!--<div class="address">{{goodinfo.bar_name}}</div>-->
    <!--<div class="starbox">-->
    <!--<div class="iconfont iconstar-fill star" v-for="item in Number(goodinfo.star)"></div>-->
    <!--<div class="iconfont iconstar-fill" v-if="Number(goodinfo.star)<5"-->
    <!--v-for="item in 5-Number(goodinfo.star)"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="rulesbox" v-if="goodinfo.rules.length">
      <div class="tancantitle">购买须知</div>
      <ul class="rules">
        <li v-for="(item,index) in goodinfo.rules" :key="index">
          <span class="ruletitle">{{item.name}}</span><span>{{item.value}}</span>
        </li>
      </ul>
    </div>
    <div class="rulesbox" v-if="goodinfo.rules.length">
      <div class="tancantitle">套餐详情</div>
      <div class="content" v-html="goodinfo.content"></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "taocan",
    data() {
      return {
        goodinfo: {
          star: 0,
          rules: [],
          is_collection: 0
        },
        cid: '',
        goods_id: '',
        num: 0,
        is_share: 0
      }
    },
    created() {
      if (this.$route.params.goods_id) {
        this.cid = this.$route.params.cid;
        this.goods_id = this.$route.params.goods_id;
        this._GetGoodsInfo()
      } else {
        this.$router.replace('/')
      }
    },
    methods: {
      // 获取套餐详情
      _GetGoodsInfo() {
        this.$api.GetGoodsInfo(this.goods_id).then(res => {
          if (res.code == 1) {
            this.goodinfo = res.data
          }
        })
      },
      // 返回列表
      backlist() {
        if (this.is_share == 1) {
          this.$router.push({path: '/competitiondetail', query: {id: this.cid}})
        } else {
          this.$router.go(-1);
        }
      },
      // 收藏
      clllection() {
        this.$api.SetCollection(4, this.goods_id).then(res => {
          if (res.code == 1) {
            if (res.data.is_collection == 1) {
              this.$com.showToast('收藏成功', 'success')
              this.goodinfo.is_collection = 1;
            } else {
              this.$com.showToast('取消收藏')
              this.goodinfo.is_collection = 0;
            }
          }
          // this._GetBarInfo()
        })

      },
      // 加法
      plus() {
        this.num += 1;
      },
      // 减法
      nminus() {
        if (this.num > 0) {
          this.num -= 1;
        }
      },
      goapp() {
        // this.$router.push('/download')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .tcbox {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 100px;

    .swiperbox {
      overflow: hidden;
      background-color: #fff;
      margin: 20px 0;
      padding: 18px;

      .swiperimg {
        height: 256px;
        width: 256px;
        /*border-radius: 16px;*/
        position: relative;
        overflow: hidden;
        float: left;

        img {
          width: 100%;
        }
      }

      .taocaninfo {
        float: left;
        padding: 0 0 0 30px;
        width: calc(100% - 256px);
        position: relative;

        .comnanme {
          font-size: 24px;
          /*px*/
          color: #333;
          font-weight: bold;
          padding: 13px 0 20px;
        }

        .tancantitle {
          font-size: 13px;
          /*px*/
          color: #999999;
        }

        .taocandes {
          padding: 0 0 40px 0;
          color: #666666;
          font-size: 14px;
          border-bottom: 1px solid #eee;
          /*px*/
        }

        .btnbox {
          height: 40px;
          margin: 49px 0 0 0;
          overflow: hidden;

          .price {
            color: #666666;
            font-size: 14px;
            line-height: 40px;
            display: inline-block;
            float: left;

            span {
              padding-left: 13px;
              font-size: 30px;
              /*px*/
              color: $baseRed;
              font-weight: bold;

              span {
                font-size: 18px;
              }
            }
          }

          .numbox {
            float: left;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            margin-left: 20px;

            .iconfont {
              font-size: 30px;
              /*px*/
              color: #666666;

              &.disicon {
                color: #CCCCCC;
              }
            }

            input {
              width: 30px;
              text-align: center;
              font-size: 18px;
              outline: none;
              border: none;
              line-height: 40px;

            }
          }


          .taocan_btn {
            float: left;
            margin-left: 33px;
            width: 180px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            background-color: $baseRed;
            font-size: 18px;
            display: inline-block;
            cursor: pointer;
          }

        }

        .nright {
          position: absolute;
          right: 0;
          top: 50px;
          color: #666666;
          font-size: 12px;
          width: 100px;
          text-align: center;

          .iconfont {
            font-size: 25px;
            margin-bottom: 9px;
            color: #EEEEEE;

            &.iconactive {
              color: $baseRed;
            }
          }
        }

      }

    }

    .comaddress {
      padding: 10px 18px;
      display: flex;
      align-items: center;
      margin: 20px 0 0 0;
      background-color: #fff;

      .adressitem {
        display: flex;
        font-size: 14px;
        /*px*/
        flex: 1;
        color: #333;
        justify-content: space-between;
        align-items: center;


        .address {
          line-height: 20px;
          font-size: 13px;
          /*px*/
          color: #666666;
        }

        .starbox {
          display: flex;
          align-items: center;
          padding: 0 0 0 18px;

          .iconstar-fill {
            color: #E4E4E4;
            font-size: 13px;
            /*px*/
            &.star {
              color: $baseRed;
            }
          }
        }
      }
    }

    .rulesbox {
      padding: 30px;
      background-color: #fff;
      margin: 20px 0 0 0;

      ul.rules {
        padding: 10px 0;

        li {
          color: #333;
          line-height: 20px;
          font-size: 13px;
          /*px*/
          .ruletitle {
            min-width: 50px;
            max-width: 100px;
            /*width: 50px;*/
            text-align: justify;
            margin-right: 25px;
            font-weight: bold;
            display: inline-block;
          }
        }
      }

      .content {
        padding: 10px 0;
      }
    }
  }
</style>

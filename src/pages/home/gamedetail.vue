<template>
  <div class="gdbox">
    <!--<div class="swiperbox">-->
    <!--<img :src="matchinfo.image" alt="">-->
    <!--&lt;!&ndash;            <swiper :options="swiperOption" ref="mySwiper" v-if="matchinfo.album_images.length">&ndash;&gt;-->
    <!--&lt;!&ndash;                <swiper-slide v-for="(item,index) in matchinfo.album_images" :key="index"><img :src="item" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;                </swiper-slide>&ndash;&gt;-->
    <!--&lt;!&ndash;                <div class="swiper-pagination" slot="pagination"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;            </swiper>&ndash;&gt;-->

    <!--</div>-->
    <div class="swiperbox">
      <div class="swiperimg"><img :src="matchinfo.image" alt=""><span v-if="matchinfo.recommend==1" class="rec_type">精选</span>
      </div>
      <div class="taocaninfo">
        <div class="comnanme">{{matchinfo.name}}</div>
        <!--<div class="taocannum">-->
        <div class="taocandes" v-html="matchinfo.content"></div>
        <!--</div>-->
        <div class="btnbox">
          <!--<div class="price">套餐价<span><span>¥ </span>{{matchinfo.price}}</span></div>-->
          <!--<div class="numbox">-->
          <!--<span :class="['iconfont iconminus-circle' ,num<=0? 'disicon':'']" @click="nminus"></span>-->
          <!--<input type="number" v-model="num" placeholder="">-->
          <!--<span class="iconfont iconplus-circle" @click="plus"></span>-->
          <!--</div>-->
          <!--<div class="taocan_btn" @click="goapp" v-if="matchinfo.is_sign==0">立即报名</div>-->
          <!--<div class="taocan_btn" @click="gomy" v-else>我的报名</div>-->
        </div>
        <div class="nright" @click="clllection" title="收藏我吧">
          <div :class="['iconfont iconheart-fill', matchinfo.is_collection==1? 'iconactive':'']"></div>
          <div>{{matchinfo.is_collection==0?'收藏':'已收藏'}}</div>
        </div>
      </div>
    </div>
    <div class="comlist" v-if="matchinfo.video.length">
      <div class="taocan">
        <div class="spanbox">赛事视频</div>
        <span class="all_video" @click="allvideo">全部视频 <span class="iconfont iconjiantou"></span> </span>
      </div>
      <div class="slist">
        <div class="sitem " v-for="(item,index) in matchinfo.video" :key="item.id"
             @click="govdetail(item.id)">
          <div class="simg"><img :src="item.poster" alt="">
            <span class="view_num"><span class="iconfont iconbofang1"></span>{{s_to_hs(item.duration)}}</span>
          </div>
          <div class="sright">
            <div class="sname van-ellipsis">{{item.name}}</div>
            <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
            <!--</div>-->
            <!--<div class="stime ">{{item.create_time}}</div>-->
            <!--<div class="sbtn">立即报名</div>-->
            <div class="synopsis">{{item.synopsis}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "gamedetail",
    data() {
      return {
        matchinfo: {
          video: []
        },
        match_id: '',
        is_share: 0
      }
    },
    created() {
      if (this.$route.query.match_id) {
        this.cid = this.$route.query.cid;
        this.match_id = this.$route.query.match_id;
        this._GetMatchInfo()
      } else {
        this.$router.replace('/')
      }
      this.is_share = this.$route.query.is_share;
    },
    methods: {
      // 获取套餐详情
      _GetMatchInfo() {
        this.$api.GetMatchInfo(this.match_id).then(res => {
          if (res.code == 1) {
            this.matchinfo = res.data;
          } else {
            this.$com.showToast(res.msg)
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
      },
      // 收藏
      clllection() {
        this.$api.SetCollection(2, this.match_id).then(res => {
          if (res.code == 1) {
            if (res.data.is_collection == 1) {
              this.$com.showToast('收藏成功', 'success')
              this.matchinfo.is_collection = 1;
            } else {
              this.$com.showToast('取消收藏', 'error')
              this.matchinfo.is_collection = 0;
            }
          } else {
            this.$com.showToast(res.msg, 'error')
          }
          // this._GetBarInfo()
        })
      },
      backlist() {
        if (this.is_share == 1) {
          this.$router.push({path: '/competitiondetail', query: {id: this.cid}})
        } else {
          this.$router.go(-1);
        }
      },
      // 视频详情
      govdetail(id) {
        this.$router.push({path: '/videodetail', query: {video_id: id}})
      },
      // 全部视频
      allvideo() {
        this.$router.push({path: '/videolist', query: {match_id: this.match_id}})
      },
      // 去报名
      goapp() {
        this.$router.push({path: '/apoint/' + this.match_id})
      },
      // 我的报名
      gomy() {
        this.$router.push({path: '/my/myApplication'})
      },
      /**
       * 将秒转换为 分:秒
       * s int 秒数
       */
      s_to_hs(s) {
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var h;
        h = Math.floor(s / 60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        s = s % 60;
        //将变量转换为字符串
        h += '';
        s += '';
        //如果只有一位数，前面增加一个0
        h = (h.length == 1) ? '0' + h : h;
        s = (s.length == 1) ? '0' + s : s;
        return h + ':' + s;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .gdbox {
    width: 1200px;
    margin: 0 auto;

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
        .rec_type {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 12px;
          width: 60px;
          line-height: 25px;
          text-align: center;
          color: #fff;
          border-radius: 5px 0 0 0;
          background: linear-gradient(90deg, #ec8215, #f0a532);
        }
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
          width: 800px;
          line-height: 20px;
        }

        .btnbox {
          height: 40px;
          margin: 49px 0 0 0;
          overflow: hidden;
          width: 800px;

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
            /*float: left;*/
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
            /*float: left;*/
            /*margin-left: 33px;*/
            margin: 0 auto;
            width: 180px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            background-color: $baseBlue;
            font-size: 18px;
            /*display: inline-block;*/
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
          cursor: pointer;

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

    .comlist {
      margin: 20px 0;
      background-color: #fff;

      .taocan {
        padding: 20px 30px;
        border-bottom: 1px solid #eee;
        overflow: hidden;

        .spanbox {
          float: left;
          font-weight: bold;
          font-size: 18px;
          color: #333;
        }

        .all_video {
          float: right;
          font-size: 14px;
          color: #666;
          cursor: pointer;

          &:hover {
            color: $baseRed;
            font-weight: bold;
          }
        }
      }

      .jlist {
        overflow: hidden;

        .jitem {
          width: 50%;
          float: left;
          padding: 30px 0 0 30px;
          overflow: hidden;
          margin: 0 0 40px 0;
          cursor: pointer;

          &:hover .jright .jname {
            color: $baseBlue;
          }

          .jimg {
            width: 100px;
            height: 100px;
            float: left;
            /*display: flex;*/
            /*align-items: center;*/
            /*justify-content: center;*/
            /*border: 1px solid #eee;*/
            /*no*/
            margin-right: 17px;
            overflow: hidden;

            img {
              width: 100%;
            }
          }

          .jright {
            /*flex: 1;*/
            /*display: flex;*/
            /*flex-direction: column;*/
            /*justify-content: space-between;*/
            float: left;
            width: calc(100% - 120px);

            .jname {
              font-size: 16px;
              font-weight: bold;
              color: #333333;
              padding: 20px 0 28px;
            }

            .jinfo {
              font-size: 12px;
              /*px*/
              color: #666666;

              .name {
                margin-right: 10px;
              }
            }

            .jaddress {
              color: #666666;
              font-size: 12px;
              /*px*/
              max-width: 192px;

              .icontime-circle {
                font-size: 12px;
                /*px*/
                color: #666666;
              }
            }

            .price {
              color: $baseRed;
              font-weight: bold;
              font-size: 18px;
              /*px*/
            }

            .synopsis {
              max-width: 200px;
              font-size: 12px;
              /*px*/
              color: #666666;
            }
          }

          .jbtn {
            width: 50px;
            background: linear-gradient(0deg, rgba(255, 135, 126, 1), rgba(242, 49, 59, 1));
            border-radius: 16px;
            position: absolute;
            right: 16px;
            bottom: 36px;
            line-height: 32px;
            text-align: center;
            color: #F8F8F8;
            font-size: 13px;
            /*px*/
            &.s_jbtn {
              background: $baseBlue;
            }
          }
        }
      }

      .slist {
        padding: 30px 30px 0 30px;
        overflow: hidden;

        .sitem {
          /*float: left;*/
          /*width: 240px;*/
          margin: 0 30px 35px 0;
          cursor: pointer;
          overflow: hidden;

          &:hover .sright .sname {
            color: $baseBlue;
          }

          .simg {
            width: 240px;
            height: 135px;
            overflow: hidden;
            /*margin-bottom: 20px;*/
            float: left;
            margin: 0 30px 0 0;
            position: relative;
            background-color: #f5f5f5;


            .view_num {
              position: absolute;
              right: 10px;
              bottom: 10px;
              background-color: rgba(0, 0, 0, .6);
              color: #fff;
              font-size: 12px;
              border-radius: 10px;
              padding: 5px 15px;

              .iconbofang1 {
                margin-right: 5px;
                font-size: 12px;

              }
            }

            img {
              width: 100%;
              margin: 0 auto;
              display: block;
            }
          }

          .sright {
            float: left;

            .sname {
              font-size: 16px;
              color: #333333;
            }

            .stime {
              font-size: 14px;
              color: #666;
              padding: 13px 0 18px 0;
            }

            .synopsis {
              font-size: 14px;
              color: #666;

            }
          }
        }
      }

    }

    .game_btn {
      width: 340px;
      margin: 30px auto;
      text-align: center;
      color: #fff;
      line-height: 44px;
      background: rgba(44, 107, 234, 1);
      border-radius: 22px;
      font-size: 17px;
      /*px*/
    }
  }
</style>

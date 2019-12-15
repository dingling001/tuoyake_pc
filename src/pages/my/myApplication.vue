<template>
  <div class="score_box">
    <div class="score_top">
      <div class="iconbox" @click="gomychieve">
        <div class="name">我的报名</div>
        <div class="achieve_right">获奖成就 <span class="iconfont iconjiantou"></span></div>
      </div>
      <div class="score_item">
        <div class="item">
          <span class="mys">报名次数</span>
          <span class="scroe"> {{total}}</span> 次
        </div>
        <div class="item">
          <span class="mys">获奖次数</span>
          <span class="scroe"> {{win}}</span> 次
        </div>
      </div>
      <div class="score_label" :title="'已获奖'+win+'次'">
        <div class="label_process">
          <div class="label" :style="{width: pro_width}"></div>
          <div class="timesbox">
            <div class="timeitem1">
              <span></span>
              <div>1次</div>
            </div>
            <div class="timeitem" v-for="(item,index) in  tags">
              <img :src="item.status?item.icon1:item.icon" alt="" class="animated zoomIn">
              <div>{{item.item}}次</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mlink">
      <el-tabs v-model="nav_active" @tab-click="changgeNav">
        <el-tab-pane label="进行中的赛事"></el-tab-pane>
        <el-tab-pane label="获奖赛事"></el-tab-pane>
        <el-tab-pane label="已结束的赛事"></el-tab-pane>
        <div class="comlist" v-if="sing&&singList.length">
          <div class="jitem van-row--flex" v-for="(item,index) in singList" :key="item.id"
               @click="gossdetail(item.match_id)">
            <div class="jimg"><img :src="item.image" alt="">
              <!--<span v-if="item.recommend==1">精选</span>-->
            </div>
            <div class="jright">
              <div class="jname van-ellipsis">{{item.league_name}}</div>
              <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
              <!--</div>-->
              <div class="jaddress van-ellipsis">赛事时间：{{item.start_time}} ~ {{item.end_time}}</div>
              <div class="bar_name">所属网吧：{{item.bar_name}}</div>
              <div class="synopsis moreline">赛事简介：{{item.remark}}</div>
            </div>
          </div>
        </div>
        <div class="nodata" v-if="sing&&singList.length==0">
          <NoData :text="'暂无相关赛事'"></NoData>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myApplication",
    data() {
      return {
        total: 0,
        win: 0,

        page: 0,
        status: 1,
        singList: [],
        nav_active: 0,
        sing: false,
        pro_width: 0,
        tags: [
          {
            item: 5,
            icon: require('../../img/my/icon2.png'),
            icon1: require('../../img/my/icon1.png'),
            status: false
          },
          {
            item: 15,
            icon: require('../../img/my/icon2.png'),
            icon1: require('../../img/my/icon1.png'),
            status: false
          },
          {
            item: 20,
            icon: require('../../img/my/icon2.png'),
            icon1: require('../../img/my/icon1.png'),
            status: false
          }, {
            item: 25,
            icon: require('../../img/my/icon2.png'),
            icon1: require('../../img/my/icon1.png'),
            status: false
          }, {
            item: 30,
            icon: require('../../img/my/icon2.png'),
            icon1: require('../../img/my/icon1.png'),
            status: false
          },
        ]
      }
    },
    created() {
      this._SignIndex();
      this._GetSignList()
    },
    methods: {
      // 获取我获奖次数
      _SignIndex() {
        this.$api.SignIndex().then(res => {
          if (res.code == 1) {
            this.total = res.data.total;
            this.win = parseInt(res.data.win, 10);
            for (var i in this.tags) {
              if (this.win >= parseInt(this.tags[i].item)) {
                this.tags[i].status = true;
              }
            }
            this.pro_width = this.win >= 30 ? '100%' : (this.win / 30) * 100 + '%'
          }
        })
      },
      changgeNav() {
        this.status = parseInt(this.nav_active) + 1;
        this.page = 0;
        this.sing = false;
        this.singList = [];
        this._GetSignList()
      },

      // 返回上一页
      backmy() {
        this.$router.go(-1)
      },
      gomychieve() {
        this.$router.push('/my/myAchieve')
      },
      // 获取报名列表
      _GetSignList() {
        let pageNumber = this.page + 1;
        this.$api.GetSignList(pageNumber, this.status).then(res => {
          this.sing = true;
          if (res.code == 1) {//请求成功
            this.singList = res.data.data
          }
        })
      },
      // 去赛事详情
      gossdetail(id) {
        this.$router.push({path: '/gamedetail', query: {match_id: id}})
      },
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
        padding: 40px 0;
        color: #333;
        text-align: center;

        .item {
          margin-right: 40px;
          display: inline-block;
          font-size: 14px;
          color: #A4A5B8;

          .scroe {
            font-size: 30px;
            /*px*/
            padding-bottom: 15px;
            font-weight: bold;
            color: #333;
            transition: ease-in-out .3s;
          }

          .mys {
            font-size: 16px;
            color: #333;
          }
        }
      }

      .score_label {
        width: 800px;
        margin: 0 auto 40px auto;
        height: 90px;
        background-size: cover;
        background-image: url("../../img/my/bg.png");
        background-repeat: no-repeat;
        /*background: linear-gradient(82deg, rgba(242, 104, 78, 1), rgba(238, 51, 63, 1));*/
        position: relative;

        .label_process {
          position: absolute;
          width: 676px;
          left: 0;
          right: 0;
          margin: 0 auto;
          top: 35px;
          height: 14px;
          background: rgba(194, 23, 23, 1);
          box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
          border-radius: 7px;
          z-index: 1;
          transition: ease-in-out .3s;

          .label {

            height: 14px;
            position: absolute;
            left: 0;
            width: 0;
            border-radius: 7px;
            z-index: 1;
            transition: ease-in-out 2s;
            background-size: cover;
            background-image: url("../../img/my/jindu.png");
            background-repeat: no-repeat;
          }

          .timesbox {
            position: absolute;
            left: 0;
            width: 100%;
            top: -10px;
            z-index: 10;

            .timeitem {
              float: left;
              width: 20%;
              text-align: right;
              color: #fff;
              font-size: 12px;

              img {
                width: 27px;
                height: 28px;
                margin-bottom: 3px;
              }
            }

            .timeitem1 {
              position: absolute;
              left: 0;
              color: #fff;
              font-size: 12px;

              span {
                display: inline-block;
                width: 27px;
                height: 28px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }
    }

    .mlink {
      position: relative;
      z-index: 2;
      overflow: hidden;
      background-color: #fff;

      /deep/ .el-tabs {
        .el-tab-panes {
          margin: 30px 0;
        }

        .el-tabs__nav {
          border-radius: 5px;
          margin: 0 auto;
          float: none;
          width: 500px;

          .el-tabs__item {
            font-size: 16px;
            color: #999;

            &.is-active {
              color: $baseBlue;
            }
          }
        }
      }

      .comlist {
        padding: 20px 0;

        .taocan {
          padding: 15px 18px;
          font-weight: bold;
          font-size: 16px;
          /*px*/
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .spanbox {
            display: flex;
            align-items: center;
          }

          .span {
            display: inline-block;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            background-color: $baseRed;
            color: #fff;
            font-size: 12px;
            /*px*/
            margin-right: 5px;
          }

          .all {
            font-size: 13px;
            /*px*/
            color: #999;

            .iconfont {
              color: #CCCCCC;
              font-size: 12px;
              /* px*/
            }
          }
        }

        .jitem {
          margin: 0 17px 17px 17px;
          /*display: flex;*/
          padding: 0 0 15px 0;
          border-bottom: 1px solid #eee;
          /*no*/
          position: relative;
          overflow: hidden;
          cursor: pointer;

          .jimg {
            width: 240px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            /*border: 1px solid #eee;*/
            /*no*/
            margin-right: 17px;
            flex-shrink: 0;
            overflow: hidden;
            position: relative;
            float: left;

            img {
              width: 100%;
            }

          }

          .jright {
            flex: 1;
            /*display: flex;*/
            /*flex-direction: column;*/
            /*justify-content: space-between;*/
            float: left;
            height: 150px;
            width: calc(100% - 300px);

            &:hover .jname {
              color: $baseBlue;
            }

            .jname {
              font-size: 18px;
              /* px */
              font-weight: bold;
              color: #333;
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
              color: #333;
              font-size: 14px;
              padding: 10px 0;
              /*px*/

              .icontime-circle {
                font-size: 12px;
                /*px*/
                color: #333;
              }
            }

            .bar_name {
              font-size: 13px;
              color: #333;
            }

            .price {
              color: $baseRed;
              font-weight: bold;
              font-size: 15px;
              /*px*/
            }

            .synopsis {
              font-size: 13px;
              padding-top: 10px;
              color: #333;
              line-height: 20px;
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

      .nodata {
        color: #eee;
        text-align: center;
        font-size: 14px;
        padding: 50px 0;
        min-height: 300px;
        position: relative;
      }
    }
  }
</style>

<template>
  <div class="mlink">
    <el-tabs v-model="nav_active" @tab-click="changgeNav">
      <el-tab-pane label="推荐赛事"></el-tab-pane>
      <el-tab-pane label="正在进行"></el-tab-pane>
      <el-tab-pane label="过往赛事"></el-tab-pane>
      <div class="comlist" v-if="sing&&singList.length">
        <div class="jitem van-row--flex" v-for="(item,index) in singList" :key="item.id"
             @click="gossdetail(item.id)">
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
</template>

<script>
  export default {
    name: "gameindex",
    data() {
      return {
        page: 0,
        status: 1,
        nav_active: 0,
        singList: [],
        sing: false,
        bar_id: ''
      }
    },
    created() {
      this.bar_id = this.$route.query.bar_id;
      this._GetMatchList();
    },
    methods: {
      changgeNav() {
        this.status = parseInt(this.nav_active) + 1;
        this.page = 0;
        this.sing = false;
        this.singList = [];
        this._GetMatchList()
      },
      // 获取报名列表
      _GetMatchList() {
        this.$api.GetMatchList(this.bar_id, this.status).then(res => {
          this.sing = true;
          if (res.code == 1) {//请求成功
            this.singList = res.data.data
          }
        })
      },
      gossdetail(id) {
        this.$router.push({path: '/gamedetail', query: {match_id: id, cid: this.id}})
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .mlink {
    position: relative;
    z-index: 2;
    overflow: hidden;
    background-color: #fff;
    width: 1200px;
    margin: 20px auto;
    min-height: 500px;

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
</style>

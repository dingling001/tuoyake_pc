<template>
  <div class="score_box">
    <div class="score_top">
      <div class="iconbox">
        <div class="name">我的报名</div>
        <!--<div class="achieve_right">获奖成就 <span class="iconfont iconjiantou"></span></div>-->
      </div>
      <div class="score_item">
        <!--<div class="item">-->
        <!---->
        <!--</div>-->
        <!--<div class="item">-->
        <!--<span class="mys">获奖次数</span>-->
        <!--<span class="scroe"> {{win}}</span> 次-->
        <!--</div>-->
        <span class="mys">当前累计获奖次数</span>
        <span class="scroe"> {{user_times}}</span> 次
      </div>
      <div class="score_label" :title="'已获奖'+user_times+'次'">
        <div class="label_process">
          <div class="label" :style="{width: pro_width}"></div>
          <div class="timesbox">
            <div class="timeitem1">
              <span></span>
              <div>1次</div>
            </div>
            <div class="timeitem" v-for="(item,index) in  tags">
              <img :src="item.status?item.icon1:item.icon" alt="" class="animated zoomIn delay-1s">
              <div>{{item.item}}次</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="mlink">
      <div class="mitem" v-for="(item,index) in sglist" :key="item.id" >
        <div class="listimg"><img :src="item.image" alt=""></div>
        <div class="title">累计获奖<span>{{item.times}}</span>次可领取</div>
        <div class="listitem">{{item.goods_name}}</div>
        <div :class="['btn',item.status!=1?'disabled':''] ">
          <span v-if="item.status==0">未达成</span>
          <span v-else-if="item.status ==1" @click="gogift(item)">立即领取</span>
          <span v-else-if="item.status==2">已领取</span>
        </div>
      </div>
    </div>
    <el-dialog title="领取奖品" :visible.sync="dialogTableVisible" center>
      <div class="title"><span>地址信息</span><span :class="['line' ,addresslist.length?'addressline':'' ]"></span>
        <span class="add" v-if="addresslist.length" @click="openaddress"><span>+</span> 添加地址</span>
      </div>
      <el-table
        ref="singleTable"
        :data="addresslist"
        height="300"
        v-if="addresslist.length"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          fixed
          property="name"
          label="姓名"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          property="address"
          label="地址"
          tooltip-effect="dark"
        >
        </el-table-column>
        <el-table-column
          property="mobile"
          label="联系方式"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="bianji(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="addbox" v-if="addresslist.length==0">
        <span class="add" @click="openaddress"><span>+</span> 添加地址</span>
      </div>
      <div class="title"><span>奖品信息</span><span class="line"></span></div>
      <div class="giftbox" v-if="Object.keys(ginfo).length">
        <div class="gimg"><img :src="ginfo.image" alt=""></div>
        <div class="info">
          <div class="name">{{ginfo.goods_name}}</div>
          <!--<div class="num">X {{goods_name.num}}</div>-->
          <div class="num">X 1</div>
        </div>
      </div>
      <div class="title"><span>领取说明</span><span class="line"></span></div>
      <div class="content" v-html="winning_receive_explain"></div>
      <el-button type="primary" class="btn" v-if="ginfo.status==1" @click="gogetgift">立即领取</el-button>
    </el-dialog>
    <Taddress :show.sync="dialogFormVisible" @add="add"></Taddress>
  </div>
</template>

<script>
  import Taddress from '../../components/Taddress'

  export default {
    name: "myAchieve",
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
        ],
        sglist: [],
        user_times: 0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        addresslist: [],
        currentRow: null,
        ginfo: {},
        winning_receive_explain: '',
        addshow: false,
      }
    },
    components: {
      Taddress
    },
    created() {
      this._SignAchievement();
      this._SignIndex();
      this._SignGoods();
      this._getConfig();
      this._AddressIndex();
    },
    methods: {
      // 添加成功
      add(val) {
        this._AddressIndex();
      },
      // 打开地址编辑
      openaddress() {
        // this.dialogTableVisible = false;
        this.dialogFormVisible = true;
      },
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
      _SignGoods() {
        this.$api.SignGoods().then(res => {
          console.log(res)
          if (res.code == 1) {
            this.sglist = res.data;
          }
        })
      },
      _SignAchievement() {
        this.$api.SignAchievement().then(res => {
          console.log(res)
          this.user_times = res.data.user_times;
        })
      },
      gogift(item) {
        this.dialogTableVisible = true;
        this.ginfo = item;
      },
      _getConfig() {
        this.$api.getConfig().then(res => {
          if (res.code == 1) {
            this.winning_receive_explain = res.data.winning_receive_explain;
          }
        })
      },
      _AddressIndex() {
        this.$api.AddressIndex().then(res => {
          console.log(res)
          if (res.code == 1) {
            this.addresslist = res.data;
          }
        })
      },
      // 返回上一页
      backmy() {
        this.$router.go(-1)
      },
      handleCurrentChange(val) {
        console.log(val)
        this.currentRow = val;
      },
      // 立即领取
      gogetgift() {

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
            background-size: cover;
            background-image: url("../../img/my/jindu.png");
            background-repeat: no-repeat;
            height: 14px;
            position: absolute;
            left: 0;
            width: 0;
            border-radius: 7px;
            z-index: 1;
            transition: ease-in-out 2s;
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

    /deep/ .el-dialog {
      width: 870px;

      .title {
        color: #999999;
        font-size: 14px;
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          float: left;

          &.line {
            width: 675px;

            height: 1px;
            border-top: 1px dashed #eee;
            margin: 0 17px;

            &.addressline {
              width: 630px;
            }
          }

          &.add {
            color: $baseBlue;
            cursor: pointer;

            span {
              width: 15px;
              height: 15px;
              display: inline-block;
              color: #fff;
              border-radius: 50%;
              text-align: center;
              line-height: 13px;
              margin-right: 10px;
              background: linear-gradient(0deg, rgba(44, 107, 234, 1), rgba(64, 158, 255, 1));
            }
          }
        }
      }

      .addbox {
        height: 250px;
        text-align: center;
        padding: 100px 0 0 0;

        .add {
          color: $baseBlue;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            width: 25px;
            height: 25px;
            display: inline-block;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            margin-right: 10px;
            font-size: 24px;
            background: linear-gradient(0deg, rgba(44, 107, 234, 1), rgba(64, 158, 255, 1));
          }
        }
      }

      /deep/ .el-table {
        margin: 25px 0;
        cursor: pointer;

        .el-button {
          color: $baseRed;
        }

        .el-table__body tr.current-row > td {
          background: rgba(242, 49, 59, .08);

          &:first-child {
            border: 2px solid $baseBlue;
            background-color: #fff;

            &::after {
              content: '';
              position: absolute;
              display: block;
              width: 16px;
              height: 13px;
              bottom: 0;
              right: 0;
              color: #fff;
              font-size: 8px;
              background-color: #d27966;
              z-index: 20;
              background: url('../../img/my/selected.png') center center / 100% 100% no-repeat;
            }
          }
        }
      }

      .giftbox {
        overflow: hidden;
        padding: 30px 0;

        .gimg {
          width: 96px;
          height: 96px;
          float: left;
          margin-right: 25px;

          img {
            width: 100%;
          }
        }

        .info {
          float: left;
          font-size: 16px;
          color: #333;

          .name {
            line-height: 50px;
          }
        }
      }

      .content {
        white-space: pre-wrap;
        padding: 35px 0;
        color: #333;
        font-size: 16px;
      }

      .btn {
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>

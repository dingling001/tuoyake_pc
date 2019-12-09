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
        style="width: 100%"
        fixed
      >
        <el-table-column
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
    <Taddress :show.sync="dialogFormVisible" @add="add" :id="aid"></Taddress>
  </div>
</template>

<script>
  import Taddress from '@/components/Taddress'

  export default {
    name: "myPoints",
    data() {
      return {
        score: 0,
        sglist: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        addresslist: [],
        currentRow: null,
        ginfo: {},
        winning_receive_explain: '',
        addshow: false,
        aid: null
      }
    },
    components: {
      Taddress
    },
    created() {
      this._ScoreIndex();
      this._ScoreGoods();
      this._ScoreGoods();
      this._getConfig();
      this._AddressIndex();
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
      gogift(item) {
        this.dialogTableVisible = true;
        this.ginfo = item;
        this.setCurrent();

      },
      // 获取配置
      _getConfig() {
        this.$api.getConfig().then(res => {
          if (res.code == 1) {
            this.winning_receive_explain = res.data.winning_receive_explain;
          }
        })
      },
      // 获取地址
      _AddressIndex() {
        this.$api.AddressIndex().then(res => {
          console.log(res)
          if (res.code == 1) {
            this.addresslist = res.data;
          }
        })
      },
      // 默认选中默认地址
      setCurrent() {
        this.$nextTick(() => {
          if (this.addresslist.length > 0 && this.dialogTableVisible) {
            for (var i in this.addresslist) {
              if (this.addresslist[i].is_default == 1) {
                this.$refs.singleTable.setCurrentRow(this.addresslist[i]);
              }
            }
          }
        })
      },
      // 单选
      handleCurrentChange(val) {
        // console.log(val)
        this.currentRow = val;
      },
      // 立即领取
      gogetgift() {
        this.$api.ScoreReceived(this.ginfo.id, this.currentRow.id).then(res => {
          this.dialogTableVisible = false;
          if (res.code == 1) {
            this.$com.showToast('领取成功，等待工作人员处理...', 'success');
            this._ScoreGoods();
            this._ScoreIndex();
          } else {
            this.$com.showToast(res.msg)
          }
        })
      },
      // 添加成功
      add(val) {
        this._AddressIndex();
      },
      // 添加地址编辑
      openaddress() {
        // this.dialogTableVisible = false;
        this.dialogFormVisible = true;
        this.aid = null;
      },
      // 编辑地址
      bianji(id) {
        this.dialogFormVisible = true;
        this.aid = id;
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

          span {
            line-height: 47px;
            display: inline-block;

            &.iconfont {
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

<template>
  <div class="colbox">
    <el-tabs v-model="active" @tab-click="changetype">
      <el-tab-pane label="全部" name="1">
        <div class="recommentlist" v-if="list.length&&active==1">
          <div class="recmmentitem" v-for="(item ,index) in list" :key="item.id">
            <div class="rec_img"><img :src="item.image" alt=""></div>
            <div class="rec_name">{{item.name}}</div>
            <div class="rec_type">
              <div class="starbox">
                <span class="iconfont iconstar-fill iconactive" v-for="i in parseInt(item.star)"></span>
              </div>
              <div class="typebox">
                <span v-for="c in item.label_ids">{{c}}</span>
              </div>
            </div>
            <div class="rec_address single-line-text">{{item.address}}</div>
          </div>
        </div>
        <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
                  :scrollTo="680" v-if="totalPages>per_page"></pcpaging>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="2">
        <div v-if="list.length" class="comlist">
          <div class="jitem " v-for="(item,index) in list" :key="item.id"
               @click="gossdetail(item.id)">
            <div class="jimg">
              <img :src="item.image" alt="">
              <!--<video :src="item.file" preload="auto" controls></video>-->
              <!--<span>12:30</span>-->
            </div>
            <div class="jright">
              <div class="jname van-ellipsis">{{item.name}}</div>
              <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
              <!--</div>-->
              <div class="jaddress van-ellipsis"><span>赛事时间：</span>{{item.start_time}} <b>~</b> {{item.end_time}}</div>
              <div class="synopsis van-ellipsis">{{item.synopsis}}</div>
              <el-button type="primary" size="small">立即报名</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待使用" name="3">
        <div v-if="list.length" class="vlist">
          <div class="videoitem" v-for="(item,index) in list" :key="item.id"
               @click="govdetail(item.id)">
            <div class="vimg">
              <img :src="item.poster" alt="">
              <span class="view_num"><span class="iconfont iconbofang1"></span>{{s_to_hs(item.duration)}}</span>
            </div>
            <div class="vright">
              <div class="vname van-ellipsis">{{item.name}}</div>
              <div class="vtime"><span class="iconfont icontime-circle"></span><span>{{item.create_time}}</span></div>
              <div class="vsynopsis">{{item.synopsis}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="4">
        <div v-if="list.length" class="comlist">
          <div class="jitem van-row--flex" v-for="(item,index) in list" :key="item.id"
               @click="gotaocandetail(item.id)">
            <div class="jimg"><img :src="item.image" alt=""></div>
            <div class="jright">
              <div class="jname van-ellipsis">{{item.name}}</div>
              <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
              <!--</div>-->
              <div class="jaddress van-ellipsis">{{item.content}}</div>
              <div class="price">￥{{item.price}}</div>
              <div class="jbtn">立即抢购</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import pcpaging from '../../components/pcpaging'

  export default {
    name: "myOrder",
    data() {
      return {
        type: 1,
        active: '1',
        list: [],
        page: 0,
        per_page: 12,
        totalPages: 0,
      }
    },
    components: {
      pcpaging,
    },
    created() {
      this._CollectionIndex();
    },
    methods: {
      // 获取列表
      _CollectionIndex() {
        this.$api.CollectionIndex(
          this.type,
          this.page,
          this.lat,
          this.lng,
          this.per_page
        ).then(res => {
          if (res.code == 1) {//请求成功
            console.log(res)
            this.list = res.data.data;
            this.totalPages = res.data.total;
          }
          // console.log(this.list)
        })
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._CollectionIndex();
      },
      getPresentPage1(val) {
        this.page1 = val;

        this._CollectionIndex();
      },
      getPresentPage2(val) {
        this.page2 = val;
        this._CollectionIndex();
      },
      // 改变类型
      changetype(val, event) {
        this.page = 0;
        this.type = parseInt(val.index) + 1;
        this.list = [];
        this._CollectionIndex()
      },
      // 去网吧详情
      godetail(id) {
        this.$router.push({path: '/competitiondetail', query: {id: id}})
      },
      // 去赛事详情
      gossdetail(id) {
        this.$router.push({path: '/gamedetail', query: {match_id: id}})
      },
      // 视频详情
      govdetail(id) {
        this.$router.push({path: '/videodetail', query: {video_id: id}})
      },
      // 去套餐详情
      gotaocandetail(id) {
        this.$router.push({path: '/taocan', query: {goods_id: id, cid: this.id}})
      },
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

  .colbox {
    /deep/ .el-tabs {
      .el-tabs__header {
        .el-tabs__nav-wrap {
          .el-tabs__item {
            /*width: 90px;*/
            padding: 0 32px;
            color: #666666;
            font-size: 16px;
            height: 60px;
            line-height: 60px;

            &.is-active {
              color: #333;
              font-weight: bold;
            }

          }

          &:after {
            height: 1px;
            background-color: #EEEEEE;
          }
        }

      }
    }

    .pcpaging {
      width: 100%;
    }

    .recommentlist {
      overflow: hidden;
      padding: 40px 48px 0 48px;

      .recmmentitem {
        float: left;
        width: 240px;
        margin-bottom: 50px;
        margin-right: 48px;
        /*padding: 0 48px 50px 0;*/
        cursor: pointer;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &:hover .rec_name {
          color: $baseBlue;
          font-weight: bold;
        }

        &:hover {
          /*background-color: #F8F8F8;*/
        }

        .rec_img {
          width: 240px;
          height: 240px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .rec_name {
          padding: 18px 0;
          font-size: 16px;
          color: #333333;
        }

        .rec_type {
          overflow: hidden;

          .starbox {
            float: left;
            width: 60px;
            margin-right: 28px;

            .iconfont {
              color: #c3c3c3;
              margin-left: -2px;
              /*margin-right: 5px;*/
            }

            .iconactive {
              color: $baseRed;
            }
          }

          .typebox {
            float: left;

            span {
              background-color: #FEEAEB;
              color: #E03A43;
              padding: 2px 5px;
              /*width: 56px;*/
              text-align: center;
              border-radius: 10px;
              display: inline-block;
              font-size: 13px;
              margin-right: 5px;
            }
          }

        }

        .rec_address {
          color: #999999;
          font-size: 12px;
          padding-top: 18px;
        }
      }
    }

    .comlist {
      padding: 23px 0;

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
          height: 135px;
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
            height: 100%;
          }

          span {
            position: absolute;
            right: 0;
            bottom: 0;
            border-radius: 3px;
            background-color: rgba(0, 0, 0, .7);
            color: #fff;
            font-size: 9px;
            /*px*/
            text-align: center;
            line-height: 16px;
            padding: 1px 3px;
          }
        }

        .jright {
          flex: 1;
          /*display: flex;*/
          /*flex-direction: column;*/
          /*justify-content: space-between;*/
          position: relative;
          float: left;
          height: 135px;

          &:hover .jname {
            font-weight: bold;
            color: $baseBlue;
          }

          .jname {
            font-size: 18px;
            /* px */
            font-weight: bold;
            color: #333;
            padding-bottom: 20px;
          }

          .jinfo {
            font-size: 14px;
            /*px*/
            color: #666666;
          }

          .jaddress {
            color: #666666;
            font-size: 12px;
            /*px*/
            padding-bottom: 10px;
          }

          .price {
            color: $baseRed;
            font-weight: bold;
            font-size: 15px;
            /*px*/
          }

          .synopsis {
            max-width: 622px;

            font-size: 12px;
            /*px*/
            color: #666666;
          }

          /deep/ .el-button {
            width: 100px;
            background-color: $baseBlue;
            margin-top: 20px;
          }

          .jbtn {
            width: 100px;
            background: linear-gradient(0deg, rgba(255, 135, 126, 1), rgba(242, 49, 59, 1));
            border-radius: 5px;
            position: absolute;
            left: 16px;
            bottom: 0;
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
    }

    .vlist {
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: space-between;*/
      /*flex-wrap: wrap;*/
      padding: 10px 17px;

      .videoitem {
        /*width: 162px;*/
        margin-bottom: 22px;
        overflow: hidden;
        cursor: pointer;

        .vimg {
          width: 240px;
          height: 135px;
          display: flex;
          align-content: center;
          justify-content: center;
          overflow: hidden;
          background-color: #000;
          float: left;
          margin-right: 17px;
          position: relative;

          .view_num {
            position: absolute;
            right: 0;
            bottom: 10px;
            background-color: rgba(0, 0, 0, 1);
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            padding: 5px 20px;

            .iconbofang1 {
              margin-right: 5px;
              font-size: 12px;

            }
          }

          img {
            width: 100%;
          }
        }

        .vright {
          float: left;

          &:hover .vname {
            color: $baseBlue;
          }

          .vname {
            font-size: 16px;
            /*px*/
            color: #333;
            padding: 17px 0;
            font-weight: bold;
          }

          .vtime {
            font-size: 14px;
            /*px*/
            color: #666666;
            padding-bottom: 20px;

            .iconfont {
              color: #AAAAAA;
              font-size: 14px;
              /*px*/
              margin-right: 5px;
            }
          }

          .vsynopsis {
            font-size: 14px;

          }
        }

      }
    }
  }
</style>

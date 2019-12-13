<template>
  <div class="colbox">
    <el-tabs v-model="active" @tab-click="changetype">
      <el-tab-pane label="全部" name="1">
      </el-tab-pane>
      <el-tab-pane label="待付款" name="2">
      </el-tab-pane>
      <el-tab-pane label="待使用" name="3">
      </el-tab-pane>
      <el-tab-pane label="已完成" name="4">
      </el-tab-pane>
      <el-tab-pane label="已取消" name="5">
      </el-tab-pane>
      <div class="recommentlist" v-if="listshow&&list.length">
        <div class="listitem" v-for="item in list" :key="item.id" @click="goorder(item.id)">
          <div class="statusbox">
            <span class="label1">
               <span class="time">{{item.create_time}}</span>
            <span>订单状态：
              <span :class="[item.status==1?'nopay':'']">{{item.status_text}}</span>
            </span>
            </span>
            <span class="price">单价</span>
            <span class="price">总价</span>
            <span class="btnbox">操作</span>
          </div>
          <div class="listcontent border">
            <span class="label1">
              <span class="labelimg"><img :src="item.image" alt=""></span>
              <span class="labelright">
                <span class="labelname">{{item.goods_name}}</span>
                <span class="labeldes" v-html="item.content">{</span>
              </span>
            </span>
            <span class="price">
             ¥{{item.price}}
              <span>x{{item.number}}</span>
            </span>
            <span class="price">
              ¥{{(parseInt(item.number)*parseFloat(item.price)).toFixed(2)}}
            </span>
            <span class="btnbox">
<!--                <el-button type="danger" size="mini" v-if="item.status==1">去付款</el-button>-->
              <!--                   <el-button type="primary" size="mini" v-if="item.status==2">去使用</el-button>-->
              <!--                  <el-button type="info" size="mini" v-if="item.status==1||item.status==2">取消订单</el-button>-->
              <!--                  <el-button type="info" size="mini" v-if="item.status==3">删除订单</el-button>-->
              <!--                  <el-button type="info" size="mini" v-if="item.status==8">已取消</el-button>-->
                <el-button type="default" size="mini">查看详情</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="recommentlist" v-if="listshow&&list.length==0">
        <NoData :text="'暂无相关订单'"></NoData>
      </div>
      <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
                :scrollTo="680" v-if="totalPages>per_page"></pcpaging>
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
        totalPages: 0,
        status: 0,
        per_page: 10,
        listshow: false
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
        this.$api.OrderIndex(
          this.page,
          this.status
        ).then(res => {
          this.listshow = true;
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
        this.status = val.index
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
      // 去订单详情
      goorder(id) {
        this.$router.push({path: '/download'})
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
      position: relative;
      min-height: 300px;

      .listitem {
        cursor: pointer;
        margin-bottom: 20px;

        .statusbox {
          background-color: #F8F8F8;
          line-height: 40px;
          font-size: 14px;
          color: #666;
          padding: 0 23px;

          span {
            display: inline-block;
          }

          .nopay {
            color: $baseRed;
          }

          .label1 {
            width: 400px;

            .labelimg {
              display: block;
            }

            .labelright {
              display: block;
            }
          }

          .price {
            width: 130px;
            text-align: center;
          }

          .btnbox {
            width: 130px;
            text-align: center;


          }
        }

        .listcontent {
          border: 1px solid #E4E4E4;
          padding: 0 23px;
          font-size: 14px;
          overflow: hidden;

          span {
            display: inline-block;
          }

          .label1 {
            width: 400px;
            display: inline-flex;
            align-items: center;
            padding: 10px 0;
            border-right: 1px solid #e4e4e4;
            float: left;

            .labelimg {
              width: 60px;
              height: 60px;
              overflow: hidden;
              line-height: 60px;
              text-align: center;
              background-color: #f5f5f5;
              margin-right: 18px;
              flex-shrink: 0;

              img {
                width: 100%;
                vertical-align: middle;
              }

              /*display: block;*/
            }

            .labelright {
              /*display: block;*/
              height: 60px;

              .labelname {
                display: block;
                color: #333333;
                font-size: 16px;
                padding: 7px 0;
                font-weight: bold;

              }

              .labeldes {
                display: block;
                font-size: 13px;
                text-indent: 2em;
                color: #666;
                text-align: justify;
                line-height: 18px;
                padding: 0 15px;
                /*white-space: pre-wrap;*/
              }
            }
          }

          .price {
            width: 130px;
            height: 120px;
            padding: 30px 0 0 0;
            text-align: center;
            color: #333;
            font-size: 16px;
            line-height: 30px;
            border-right: 1px solid #e4e4e4;
            float: left;

            span {
              display: block;
              color: #999999;
            }
          }

          .btnbox {
            text-align: center;
            width: 130px;
            float: left;
            padding: 30px 0 0 0;

            /deep/ .el-button {
              margin: 0 0 15px 0;
              display: inline-block;
              width: 80px;
              padding: 7px 0;
              text-align: center;
            }
          }
        }
      }
    }


  }
</style>

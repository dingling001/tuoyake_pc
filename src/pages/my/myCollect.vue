<template>
  <div class="colbox">
    <el-tabs v-model="active" @tab-click="changetype">
      <el-tab-pane label="网吧" name="first">
        <div v-if="list.length" class="clist">
          <div class="citem" v-for="(item,index) in list" :key="index" @click="godetail(item.id)">
            <div class="cimg">
              <img :src="item.image" alt="">
            </div>
            <div class="cright">
              <div class="cname">
                <div class="namebox">
                  <div class="name single-line-text">{{item.name}}</div>
                  <div class="startbox">
                    <span class="iconfont iconstar-fill" v-for="s in parseInt(item.star)"></span>
                  </div>
                </div>
                <span class="juli">{{item.distance}}</span>
              </div>
              <div class="ctype"><span v-for="l in item.label_ids">{{l}}</span></div>
              <div class="caddress">
                <span class="iconfont icondingweiweizhi"></span>
                <span class="single-line-text">{{item.address}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="赛事" name="second">
        <div v-if="list.length&&active==1" class="comlist">
          <div class="jitem " v-for="(item,index) in list" :key="item.id"
               @click="gossdetail(item.id)">
            <div class="jimg">
              <img :src="item.image" alt="">
              <!--<video :src="item.file" preload="auto" controls></video>-->
              <span>12:30</span>
            </div>
            <div class="jright">
              <div class="jname van-ellipsis">{{item.name}}</div>
              <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
              <!--</div>-->
              <div class="jaddress van-ellipsis"><span class="iconfont icontime-circle"></span>
                {{item.create_time}}
              </div>
              <div class="synopsis van-ellipsis">{{item.synopsis}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视频" name="third">
        <div v-if="list.length&&active==2" class="vlist">
          <div class="videoitem" v-for="(item,index) in list" :key="item.id"
               @click="govdetail(item.id)">
            <div class="vimg">
              <img :src="item.poster" alt="">
            </div>
            <div class="vname van-ellipsis">{{item.name}}</div>
            <div class="vtime"><span class="iconfont icontime-circle"></span><span>{{item.create_time}}</span></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="套餐" name="fourth">
        <div v-if="list.length&&active==3" class="comlist">
          <div class="jitem van-row--flex" v-for="(item,index) in list" :key="item.id"
               @click="gotaocandetail(item.id)">
            <div class="jimg"><img :src="item.image" alt=""></div>
            <div class="jright">
              <div class="jname van-ellipsis">{{item.name}}</div>
              <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
              <!--</div>-->
              <div class="jaddress van-ellipsis">{{item.content}}</div>
              <div class="price">￥{{item.price}}</div>
            </div>
            <div class="jbtn">抢购</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "myCollect",
    data() {
      return {
        offset: 0,
        type: 1,
        active: 'first',
        list: [],
        isDownLoading: false,
        isUpLoading: false,
        finished: false,
        page: 0,
        isDownLoading1: false,
        isUpLoading1: false,
        finished1: false,
        page1: 0,
        isDownLoading2: false,
        isUpLoading2: false,
        finished2: false,
        page2: 0,
        isDownLoading3: false,
        isUpLoading3: false,
        finished3: false,
        page3: 0,
      }
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
        ).then(res => {
          if (res.code == 1) {//请求成功
            this.list = res.data.data
          }
          // console.log(this.list)
        })
      },
      // 下拉刷新
      onRefresh() {
        setTimeout(() => {
          console.log(this.type)
          this.$com.showtoast('刷新成功');
          this.isDownLoading = false;
          this.page = 0;
          this._CollectionIndex();
        }, 500);
      },
      // 上拉加载
      onLoad() {
        this.page++;
        this.isUpLoading = true;
        this._CollectionIndex();
      },
      // 下拉刷新
      onRefresh1() {
        setTimeout(() => {
          this.$com.showtoast('刷新成功');
          this.isDownLoading3 = false;
          this.page1 = 0;
          this._CollectionIndex();
        }, 500);
      },
      // 上拉加载
      onLoad1() {
        this.page1++;
        this.isUpLoading1 = true;
        this._CollectionIndex();
      },
      // 下拉刷新
      onRefresh3() {
        setTimeout(() => {
          this.$com.showtoast('刷新成功');
          this.isDownLoading3 = false;
          this.page3 = 0;
          this._CollectionIndex();
        }, 500);
      },
      // 上拉加载
      onLoad3() {
        this.page3++;
        this.isUpLoading3 = true;
        this._CollectionIndex();
      },
      // 改变类型
      changetype() {
        this.page = 0;
        this.page1 = 0;
        this.page2 = 0;
        this.page3 = 0;
        this.type = this.active + 1;
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
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .colbox {
    /deep/ .el-tab-panes {
      .van-pull-refresh {
        min-height: 100vh;
      }
    }

    .clist {
      padding: 23px 0;

      .citem {
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        margin: 0 0 30px 0;

        .cimg {
          flex-shrink: 0;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          background-color: #f2f2f2;

          img {
            width: 100%;
          }
        }

        .cright {
          flex: 1;
          height: 90px;
          display: flex;
          flex-direction: column;

          .cname {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .namebox {
              display: flex;
              align-items: center;

              .name {
                color: #333333;
                font-weight: bold;
                font-size: 14px;
                /*px*/
                max-width: 120px;
              }

              .startbox {
                display: flex;
                align-items: center;
                margin: 0 5px;

                .iconfont {
                  color: $baseRed;
                  font-size: 14px;
                  /*px*/
                }
              }
            }
          }

          .ctype {
            display: flex;
            align-items: center;
            margin: 15px 0;
            flex-wrap: wrap;
            max-width: 240px;

            span {
              padding: 3px 5px;
              /*background-color: ;*/
              background: rgba(242, 49, 59, .1);
              color: $baseRed;
              border-radius: 8px;
              margin-right: 5px;
            }
          }

          .caddress {
            display: flex;
            align-items: center;
            color: #666666;
            font-size: 12px;
            /*px*/
            padding: 0 0 15px 0;
            border-bottom: 1px solid #E4E4E4;
            /*no*/
            .iconfont {
              color: #999999;
              font-size: 10px;
              /*px*/
              margin-right: 5px;
            }

            .single-line-text {
              max-width: 220px;
            }
          }
        }

        &:last-child {
          margin: 0;
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

        .jimg {
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          /*border: 1px solid #eee;*/
          /*no*/
          margin-right: 17px;
          flex-shrink: 0;
          overflow: hidden;
          position: relative;

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
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .jname {
            font-size: 14px;
            /* px */
            font-weight: bold;
            max-width: 200px;
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
            font-size: 15px;
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

    .vlist {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 10px 17px;

      .videoitem {
        width: 162px;
        margin-bottom: 22px;

        &:nth-child(2n-1) {
          margin-right: 10px;
        }

        .vimg {
          width: 100%;
          height: 91px;
          display: flex;
          align-content: center;
          justify-content: center;
          overflow: hidden;
          background-color: #000;

          img {
            width: 100%;
          }
        }

        .vname {
          font-size: 13px;
          /*px*/
          color: #333;
          padding: 17px 0;

        }

        .vtime {
          font-size: 10px;
          /*px*/
          color: #666666;

          .iconfont {
            color: #AAAAAA;
            font-size: 14px;
            /*px*/
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>

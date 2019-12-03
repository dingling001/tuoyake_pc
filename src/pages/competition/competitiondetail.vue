<template>
  <div class="combox" v-loading="showdata">
    <div class="barinfo">
      <div class="leftinfo">
        <div class="comnanme">{{comdata.info.name}}</div>
        <div class="stars">
          <div class="starbox">
            <div class="iconfont iconstar-fill star" v-for="item in Number(comdata.info.star)"></div>
            <div class="iconfont iconstar-fill" v-if="Number(comdata.info.star)<5"
                 v-for="item in 5-Number(comdata.info.star)"></div>
          </div>
          <div class="timeon"><span v-for="(item,index) in comdata.info.label_ids" :key="index">{{item}}</span></div>
        </div>
        <div class="adressitem">地址： <span class="address">{{comdata.info.address}}</span></div>
        <div class="phonecall">电话：{{comdata.info.contact_number}}</div>
        <div class="phonecall" v-if="comdata.info.synopsis">{{comdata.info.synopsis}}</div>
        <div class="iconbox" @click="clllection">
          <div :class="['iconfont iconheart-fill', comdata.info.is_collection==0? '':'iconactive']"></div>
          <div>{{comdata.info.is_collection==0?'收藏':'已收藏'}}</div>
        </div>
      </div>
      <div class="swiperbox">
        <div class="swiper1">
          <swiper :options="swiperOption" ref="mySwiper" v-if="comdata.info.album_images.length">
            <swiper-slide v-for="(item,index) in comdata.info.album_images" :key="index">
              <!--              <el-image-->
              <!--                :src="item"-->
              <!--                :preview-src-list="comdata.info.album_images">-->
              <!--              </el-image>-->
              <img :src="item" alt="">
              <div class="mask animated zoomIn faster" @click="onPreview">
                <i class="el-icon-zoom-in"></i> <span>全部相册</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiper2">
          <swiper :options="swiperOption1" ref="mySwiper1" v-if="comdata.info.album_images.length">
            <swiper-slide v-for="(item,index) in comdata.info.album_images" :key="index"><img :src="item" alt="">
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div class="comlist" v-if="comdata.goods.length">
      <div class="taocan">
        <div class="spanbox">商家套餐</div>
      </div>
      <div class="jlist">
        <div class="jitem van-row--flex" v-for="(item,index) in comdata.goods" :key="item.id"
             @click="gotaocandetail(item.id)">
          <div class="jimg"><img :src="item.image" alt=""></div>
          <div class="jright">
            <div class="jname van-ellipsis">{{item.name}}</div>
            <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
            <!--</div>-->
            <!--            <div class="jaddress van-ellipsis">{{item.content}}</div>-->
            <div class="price">￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comlist" v-if="comdata.match.length">
      <div class="taocan">
        <div class="spanbox">赛事列表</div>
        <div class="all" @click="goall">全部赛事 <span class="iconfont iconjiantou"></span></div>
      </div>
      <div class="slist">
        <div class="sitem " v-for="(item,index) in comdata.match" :key="item.id"
             @click="gossdetail(item.id)">
          <div class="simg"><img :src="item.image" alt=""></div>
          <div class="sright">
            <div class="sname van-ellipsis">{{item.league_name}}</div>
            <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
            <!--</div>-->
            <div class="stime ">赛事时间：{{item.start_time}} ~ {{item.end_time}}</div>
            <div class="sbtn">立即报名</div>
          </div>
        </div>
      </div>
    </div>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="comdata.info.album_images"/>
    <!--    <div class="comitem">-->
    <!--      <div class="comnanme">{{comdata.info.name}}</div>-->
    <!--      <div class="starbox">-->
    <!--        <div class="iconfont iconstar-fill star" v-for="item in Number(comdata.info.star)"></div>-->
    <!--        <div class="iconfont iconstar-fill" v-if="Number(comdata.info.star)<5"-->
    <!--             v-for="item in 5-Number(comdata.info.star)"></div>-->
    <!--      </div>-->
    <!--      <div class="comaddress">-->
    <!--        <div class="adressitem">-->
    <!--          <span class="iconfont icondingweiweizhi"></span>-->
    <!--          <div class="address">{{comdata.info.address}}-->
    <!--            <div class="juli">距您{{comdata.info.distance}}</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <a class="phonecall" :href="'tel:'+comdata.info.contact_number"><span-->
    <!--          class="iconfont iconphone-fill"></span></a>-->
    <!--      </div>-->
    <!--      <div class="hr"></div>-->
    <!--      <div class="comlist" v-if="comdata.goods.length">-->
    <!--        <div class="taocan">-->
    <!--          <div class="spanbox"><span class="span">惠</span> <span>套餐</span></div>-->
    <!--        </div>-->
    <!--        <div class="jitem van-row&#45;&#45;flex" v-for="(item,index) in comdata.goods" :key="item.id"-->
    <!--             @click="gotaocandetail(item.id)">-->
    <!--          <div class="jimg"><img :src="item.image" alt=""></div>-->
    <!--          <div class="jright">-->
    <!--            <div class="jname van-ellipsis">{{item.name}}</div>-->
    <!--            &lt;!&ndash;<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>&ndash;&gt;-->
    <!--            &lt;!&ndash;</div>&ndash;&gt;-->
    <!--            <div class="jaddress van-ellipsis">{{item.content}}</div>-->
    <!--            <div class="price">￥{{item.price}}</div>-->
    <!--          </div>-->
    <!--          <div class="jbtn">抢购</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="hr"></div>-->
    <!--      <div class="comlist" v-if="comdata.match.length">-->
    <!--        <div class="taocan">-->
    <!--          <div class="spanbox"><span class="span">赛</span><span>赛事</span></div>-->
    <!--          <div class="all" v-if="comdata.match.length>1">全部 <span class="iconfont iconjiantou"></span></div>-->
    <!--        </div>-->
    <!--        <div class="jitem van-row&#45;&#45;flex" v-for="(item,index) in comdata.match" :key="item.id"-->
    <!--             @click="gossdetail(item.id)">-->
    <!--          <div class="jimg"><img :src="item.image" alt="">-->
    <!--            <span v-if="item.recommend==1">精选</span>-->
    <!--          </div>-->
    <!--          <div class="jright">-->
    <!--            <div class="jname van-ellipsis">{{item.league_name}}</div>-->
    <!--            &lt;!&ndash;<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>&ndash;&gt;-->
    <!--            &lt;!&ndash;</div>&ndash;&gt;-->
    <!--            <div class="jaddress van-ellipsis"><span class="iconfont icontime-circle"></span>-->
    <!--              {{item.start_time}} ~ {{item.end_time}}-->
    <!--            </div>-->
    <!--            <div class="synopsis van-ellipsis">{{item.synopsis}}</div>-->
    <!--          </div>-->
    <!--          <div class="jbtn s_jbtn">报名</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

  export default {
    name: "competitiondetail",
    data() {
      var _ = this;
      return {
        id: '',
        comdata: {
          goods: [],
          info: {
            album_images: [],
            star: 0,
            is_collection: 0
          },
          match: []
        },
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'vertical',
          observers: true,
          observeParents: true,
          centeredSlides: true,
          loop: true,
          slidesPerView: 1
        },
        swiperOption1: {
          pagination: '.swiper-pagination',
          direction: 'vertical',
          observers: true,
          observeParents: true,
          spaceBetween: 7,
          loop: true,
          slidesPerView: 3,
          centeredSlides: true,
          slideToClickedSlide: true,
          onSlideChangeStart: function (swiper) {
            // alert(swiper.realIndex);
            var s = _.$refs.mySwiper.swiper;
            s.slideTo(swiper.realIndex, 1000, false)
          }
        },
        show: false,
        index: 0,
        collectiontext: '收藏',
        showViewer: false,
        showdata: true
      }
    },
    components: {
      swiper,
      swiperSlide,
      ElImageViewer
    },
    created() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id;
        this._GetBarInfo();
      } else {
        this.$router.replace('/')
      }
    },
    methods: {
      onPreview() {
        this.showViewer = true
      },
      // 关闭查看器
      closeViewer() {
        this.showViewer = false
      },
      // 获取详情
      _GetBarInfo() {
        this.$api.GetBarInfo(this.id).then(res => {
          this.showdata = false;
          if (res.code == 1) {
            this.comdata = res.data;
          }
        })
      },
      // 去套餐详情
      gotaocandetail(id) {
        this.$router.push({path: `/taocan/${id}/${this.id}`})
      },
      gossdetail(id) {
        this.$router.push({path: '/gamedetail', query: {match_id: id, cid: this.id}})
      },
      // 回到列表
      backlist() {
        if (this.is_share == 1) {
          this.$router.push('/competition')
        } else {
          this.$router.go(-1)
        }
      },
      // 改变预览下标
      onChange(index) {
        this.index = index;
      },
      // 收藏
      clllection() {
        this.$api.SetCollection(1, this.comdata.info.id).then(res => {
          if (res.code == 1) {
            if (res.data.is_collection == 1) {
              this.$com.showToast('收藏成功', 'success');
              this.comdata.info.is_collection = 1;
            } else {
              this.$com.showToast('取消收藏');
              this.comdata.info.is_collection = 0;
            }
          }
          // this._GetBarInfo()
        })
      },
      // 全部赛事
      goall(){
        this.$router.push('/gameindex')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .combox {
    width: 1200px;
    margin: 20px auto;

    .barinfo {
      overflow: hidden;
      background-color: #fff;

      .leftinfo {
        float: left;
        width: 858px;
        padding: 24px 0 24px 33px;
        position: relative;

        .iconbox {
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

        .comnanme {
          font-size: 24px;
          /*px*/
          color: #333;
          font-weight: bold;
        }

        .stars {
          overflow: hidden;
          padding: 25px 0 20px;

          .starbox {
            display: flex;
            align-items: center;
            float: left;
            margin-right: 100px;

            .iconstar-fill {
              color: #E4E4E4;
              font-size: 20px;
              /*px*/
              &.star {
                color: $baseRed;
              }
            }
          }

          .timeon {
            float: left;
            line-height: 22px;

            span {
              background-color: #FEEAEB;
              color: #E03A43;
              padding: 0 5px;
              /*width: 56px;*/
              text-align: center;
              border-radius: 10px;
              display: inline-block;
              font-size: 13px;
              margin-right: 5px;
            }
          }
        }

        .adressitem {
          font-size: 14px;
          color: #333;
          padding: 34px 0 20px;
          border-top: 1px solid #EEEEEE;
        }

        .phonecall {
          flex-shrink: 0;
          display: block;
          padding-bottom: 20px;
        }


      }

      .swiperbox {
        width: 322px;
        float: right;
        /*height: 238px;*/
        border-radius: 16px;
        position: relative;
        padding: 54px 0 0 0;

        .swiper1 {
          width: 256px;
          max-height: 256px;
          height:147px;
          float: left;

          .swiper-container {
            height: 147px;

            .swiper-slide {
              background-color: #f5f5f5;
              color: #fff;
              /*border-radius: 10px;*/
              overflow: hidden;
              /*height: 256px;*/
              cursor: pointer;

              &:hover .mask {
                display: block;
              }

              .mask {
                display: none;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                color: #fff;
                background-color: rgba(0, 0, 0, .3);
                text-align: center;
                line-height: 192px;
                cursor: pointer;
                font-size: 12px;
                align-items: center;
                /*transition: ease-in-out .2s;*/
                /*&:hover{*/
                /*  color: #ccc;*/
                /*}*/
                .el-icon-zoom-in {
                  font-size: 30px;
                }

                span {
                }
              }

              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .swiper2 {
          width: 59px;
          height: 147px;
          float: right;

          .swiper-container {
            height: 147px;

            .swiper-slide {
              cursor: pointer;
              background-color: #f5f5f5;
              color: #fff;
              /*border-radius: 10px;*/
              overflow: hidden;

              img {
                height: 100%;
                width: 100%;
              }
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
        color: #333;
        border-bottom: 1px solid #eee;
        overflow: hidden;

        .spanbox {
          font-weight: bold;
          font-size: 18px;
          float: left;

        }

        .all {
          cursor: pointer;
          float: right;
          font-size: 14px;
          color: #333;

          &:hover {
            color: $baseRed;
          }

          .iconfont {
            font-size: 14px;
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
          float: left;
          width: 240px;
          margin: 0 30px 35px 0;
          cursor: pointer;

          &:hover .sright .sname {
            color: $baseBlue;
          }

          .simg {
            width: 240px;
            height: 135px;
            overflow: hidden;
            margin-bottom: 20px;

            img {
              width: 100%;
            }
          }

          .sright {
            .sname {
              font-size: 16px;
              color: #333333;
            }

            .stime {
              font-size: 12px;
              color: #666;
              padding: 13px 0 18px 0;
            }

            .sbtn {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background-color: $baseBlue;
              color: #fff;
              font-size: 14px;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
          }
        }
      }

    }
  }

</style>

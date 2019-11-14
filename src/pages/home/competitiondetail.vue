<template>
  <div class="combox">
    <div class="barinfo">
      <div class="leftinfo">
        <div class="comnanme">{{comdata.info.name}}</div>
        <div class="starbox">
          <div class="iconfont iconstar-fill star" v-for="item in Number(comdata.info.star)"></div>
          <div class="iconfont iconstar-fill" v-if="Number(comdata.info.star)<5"
               v-for="item in 5-Number(comdata.info.star)"></div>
        </div>
        <div class="adressitem">地址： <span class="address">{{comdata.info.address}}</span></div>
        <div class="phonecall">电话：{{comdata.info.contact_number}}</div>
        <div class="tiemon">营业时间： 周一至周日 全天</div>
        <div class="iconbox" @click="clllection">
          <div :class="['iconfont iconheart-fill', comdata.info.is_collection==0? '':'iconactive']"></div>
          <div>{{comdata.info.is_collection==0?'收藏':'已收藏'}}</div>
        </div>
      </div>
      <div class="swiperbox">
        <div class="swiper1">
          <swiper :options="swiperOption" ref="mySwiper" v-if="comdata.info.album_images.length">
            <swiper-slide v-for="(item,index) in comdata.info.album_images" :key="index"><img :src="item" alt="">
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

  export default {
    name: "competitiondetail",
    data() {
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
          // loop: true,
          slidesPerView: 1
        },
        swiperOption1: {
          pagination: '.swiper-pagination',
          direction: 'vertical',
          observers: true,
          observeParents: true,
          // spaceBetween: 7,
          // loop: true,
          slidesPerView: 4
        },
        show: false,
        index: 0,
        collectiontext: '收藏'
      }
    },
    components: {
      swiper,
      swiperSlide,
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
      // 获取详情
      _GetBarInfo() {
        this.$api.GetBarInfo(this.id).then(res => {
          if (res.code == 1) {
            this.comdata = res.data;
          }
        })
      },
      // 去套餐详情
      gotaocandetail(id) {
        this.$router.push({path:  `/taocan/${id}/${this.id}`})
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
        padding: 24px 0 54px 33px;
        position: relative;

        .iconbox {
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

        .comnanme {
          font-size: 24px;
          /*px*/
          color: #333;
          font-weight: bold;
        }

        .starbox {
          display: flex;
          align-items: center;
          padding: 25px 0 20px;

          .iconstar-fill {
            color: #E4E4E4;
            font-size: 20px;
            /*px*/
            &.star {
              color: $baseRed;
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
        padding: 24px 0 0 0;

        .swiper1 {
          width: 256px;
          height: 256px;
          float: left;

          .swiper-container {
            height: 256px;

            .swiper-slide {
              background-color: #f5f5f5;
              color: #fff;
              /*border-radius: 10px;*/
              overflow: hidden;
              height: 256px;

              img {
                width: 100%;
              }
            }
          }
        }

        .swiper2 {
          width: 59px;
          height: 238px;
          float: right;

          .swiper-container {
            height: 238px;

            .swiper-slide {
              background-color: #f5f5f5;
              color: #fff;
              /*border-radius: 10px;*/
              overflow: hidden;
              height: 59px !important;
              margin-bottom: 7px;

              &:nth-child(4n) {
                margin: 0;
              }

              img {
                height: 100%;
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
        font-weight: bold;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #eee;
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
            }
          }
        }
      }

    }
  }

</style>

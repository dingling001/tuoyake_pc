<template>
  <div class="index">
    <div class="bannerbox">
      <!--<div class="swiper-container banner" ref="mySwiper">-->
      <!--&lt;!&ndash;        <div class="swiper-wrapper">&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;          <div&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;            class="slide"&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;            v-for="(item,index) in swiperlist"&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;            :key="index"&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;            :class="{'active':ind==index}"&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;            :style="{'background':'url('+item.image+')no-repeat','background-size':'cover','background-position':'center center'}"&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          &lt;!&ndash;          ></div>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;      &ndash;&gt;-->
      <!--&lt;!&ndash;        </div>&ndash;&gt;-->
      <!--<div class="swiper-wrapper">-->
      <!--<div class="swiper-slide" v-for="(item,index) in swiperlist" :key="item.imgae">-->
      <!--<img :src="item.image" alt="">-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
      <!--<div class="swiper-pagination"></div>-->
      <!--</div>-->
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in swiperlist" :key="item.imgae">
          <img :src="item.image" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination" v-if="swiperlist.length>1"></div>
      </swiper>

    </div>

    <div class="recommendbox">
      <div class="recommendtitle">
        <div class="recommentleft"><span class="iconfont icontuijian"></span> <span>推荐网吧</span></div>
        <!--        <div class="recommentright"><span>查看更多</span><span class="iconbox"><span-->
        <!--          class="iconfont iconjiantou"></span></span></div>-->
      </div>
      <div class="recommentlist" v-if="isload&&netlist.length">
        <div class="recmmentitem animated zoomIn" v-for="(item ,index) in netlist" :key="item.id"
             @click="go_detail(item.id)">
          <div class="rec_img"><img :src="item.image" alt=""></div>
          <div class="rec_name">{{item.name}}</div>
          <div class="rec_type">

          </div>
          <div class="starbox">
            <span class="iconfont iconstar-fill iconactive" v-for="i in parseInt(item.star)"></span>
          </div>
          <div class="typebox">
            <span v-for="(c,cindex) in item.label_ids" :key="cindex" v-if="cindex<3">{{c}}</span>
            <span v-if="item.label_ids.length>3" class="more">更多</span>
          </div>
          <div class="rec_address single-line-text">{{item.address}}</div>
          <div class="sharebox"></div>
        </div>
      </div>
      <div v-if="isload&&netlist.length==0" class="recommentlist">
        <NoData :text="'抱歉，该地区暂无推荐'"></NoData>
      </div>
      <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
                :scrollTo="680" v-if="total>per_page"></pcpaging>
    </div>
  </div>
</template>
<script>
  import pcpaging from '../../components/pcpaging'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "home",
    data() {
      return {
        cur: 0,
        swiperlist: [],
        city: '天津市',
        page: 1,
        per_page: 8,
        keyword: '',
        lat: 0,
        lng: 0,
        recommend: 1,
        label: '',
        district: '',
        circle: '',
        netlist: [],
        offset: 0,
        labellist: [
          {value: '', text: '全部服务'}
        ],
        districtlist: [
          {
            id: '',
            childlist: [],
            name: " 全部地区",
            pid: '',
            spacer: ""
          }
        ],
        citypid: '',
        lindex: 0,
        rindex: 0,
        totop: false,
        showoverlay: false,
        ind: 0,
        mySwiper: {},
        totalPages: 0,
        total: 0,
        swiperOption: {
          pagination: '.swiper-pagination',
          //循环
          loop: true,
          //每张播放时长3秒，自动播放
          autoplay: 20000,
          //滑动速度
          speed: 1000,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          observeParents: true,
          observers: true,
          // delay:1000
        },
        isload: false
      };
    },

    mounted() {
      // window.addEventListener("scroll", this.handleScroll);
      // this.height = document.body.clientHeight;
      this.city = this.$com.getCookies('pccity');
      this._GetSlideList();
      this._GetLabelList();
      this._GetBarList();
      // var timer = setInterval(() => {
      //   if (this.ind <= this.swiperlist.length - 2) {
      //     this.ind = this.ind + 1;
      //   } else {
      //     this.ind = 0;
      //   }
      // }, 5000);

    },
    inject: ["app"],
    components: {
      pcpaging,
      swiper,
      swiperSlide
    },
    methods: {
      // 获取轮播图
      _GetSlideList() {
        this.$api.GetSlideList(this.city).then((res) => {
          if (res.code == 1) {
            this.swiperlist = res.data;
//             setTimeout(() => {
//               this.mySwiper = new Swiper('.banner', {
//                 pagination: '.swiper-pagination',
//                 observer: true,
//                 observeParents: true,
//                 paginationClickable: true,
//                 // 如果需要分页器
// //pagination : '#swiper-pagination1',
//               })
//             }, 500)
          } else {
            this.$common.showToast(res.msg)
          }
        })
      },
      // 获取服务
      _GetLabelList() {
        this.$api.GetLabelList().then(res => {
          if (res.code == 1) {
            var labellist = res.data;
            for (let i in labellist) {
              this.labellist.push({
                value: labellist[i],
                text: labellist[i]
              })
            }
            this.label = this.labellist[0].value;
            // console.log(this.labellist)
          }
        })
      },
      // 获取列表
      _GetBarList() {
        this.$api.GetBarList(
          this.page,
          this.keyword,
          this.city,
          this.lat,
          this.lng,
          this.recommend,
          this.label,
          this.district,
          this.circle,
          this.per_page
        ).then(res => {
          this.isload = true;
          if (res.code == 1) {//请求成功
            this.netlist = res.data.data;
            this.totalPages = res.data.total / this.per_page;
            this.total = res.data.total;
          }
          // console.log(this.netlist)
        })
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._GetBarList();
      },
      callback() {

      },
      go_detail(id) {
        this.$router.push({path: '/competitiondetail/' + id})
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  };
</script>
<style scoped lang="scss">
  @import "../../style/reset";

  .index {
    .bannerbox {
      background-image: url("../../img/index/index_bg.jpg");
      background-position: top;
      background-size: 100% auto;
      background-repeat: no-repeat;
      overflow: hidden;

      /*.b {*/
      /*width: 1200px;*/

      /*}*/
      /deep/ .swiper-container {
        /*overflow: hidden;*/
        width: 1200px;
        margin: 40px auto 18px auto;
        height: 420px;
        /**/
        /* .slide {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           transform: scale(1, 1);
           opacity: 0;
           z-index: -1;
           transition: transform 5000ms linear 0s;
           /**/
        /*&.active {*/
        /*animation: scale 5000ms linear;*/
        /*}*/
        /*}*/

        .swiper-slide {
          cursor: pointer;
          /**/
          img {
            width: 100%;
          }
        }

        .swiper-pagination-bullet {
          transition: ease-in-out .2s;
          background-color: rgba(255, 255, 255, .72);
        }

        .swiper-pagination-bullet-active {
          width: 25px;
          height: 8px;
          border-radius: 4px;
          background-color: $baseBlue;
        }
      }
    }


    .recommendbox {
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      position: relative;

      .recommendtitle {
        overflow: hidden;
        width: 1200px;
        margin: 0 auto;
        padding: 24px 30px;
        border-bottom: 1px solid #EEEEEE;

        .recommentleft {
          float: left;
          font-size: 16px;
          font-weight: bold;

          .iconfont {
            color: $baseRed;
            background-image: -webkit-linear-gradient(bottom, $baseRed, #86AEFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

        }

        .recommentright {
          float: right;
          font-size: 12px;
          color: #777777;
          cursor: pointer;

          &:hover {
            color: $baseRed;
          }

          &:hover .iconbox .iconfont {
            color: #fff;
          }

          &:hover .iconbox {
            background-color: $baseRed;
          }

          .iconbox {
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #E4E4E4;
            margin-left: 8px;
            text-align: center;
            line-height: 15px;
            cursor: pointer;


            .iconfont {
              color: #666666;
              font-size: 12px;
            }
          }
        }
      }

      .recommentlist {
        overflow: hidden;
        padding: 40px 48px 0 48px;
        min-height: 300px;

        .recmmentitem {
          float: left;
          width: 240px;
          margin-bottom: 50px;
          margin-right: 48px;
          /*padding: 0 48px 50px 0;*/
          cursor: pointer;
          overflow: hidden;

          &:nth-child(4n) {
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
            transition: ease-in-out .3s;

            img {
              width: 100%;
            }

            &:hover {
              /*transform: rotateY(360deg);*/
            }
          }

          .rec_name {
            padding: 20px 0 10px;
            font-size: 16px;
            color: #333333;
          }

          .rec_type {
            overflow: hidden;
          }

          .starbox {
            /*float: left;*/
            width: 60px;
            margin: 0 0 10px 0;

            .iconfont {
              color: #c3c3c3;
              margin-right: 2px;
            }

            .iconactive {
              color: $baseRed;
            }
          }

          .typebox {
            /*float: left;*/
            margin: 5px 0 0 0;
            min-height: 22px;
            position: relative;

            span {
              background-color: #FEEAEB;
              color: #E03A43;
              padding: 2px 5px;
              /*width: 56px;*/
              text-align: center;
              border-radius: 10px;
              display: inline-block;
              font-size: 13px;
              margin: 0 5px 5px 0;

              &.more {
                position: absolute;
                right: 0;
                font-size: 12px;

                &:before {
                  content: '...';
                  position: absolute;
                  left: -10px;
                }
              }
            }
          }

          .rec_address {
            color: #999999;
            font-size: 12px;
            padding-top: 10px;
          }
        }
      }
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1, 1);
      opacity: 0.5;
      z-index: 1;
      transition: opacity z-index transform 500ms "cubic-bezier(0,1,1,1)";
    }
    30% {
      opacity: 1;
    }
    60% {
      transform: scale(1.05);
      z-index: 1;
      opacity: 1;
      transition: opacity z-index transform 200ms "cubic-bezier(0,1,1,1)" 0.3s;
    }
    80% {
      transform: scale(1.05);
      z-index: 1;
      opacity: 1;
      transition: opacity z-index transform 200ms "cubic-bezier(0,1,1,1)" 0.3s;
    }
    100% {
      transform: scale(1.5);
      z-index: 1;
      transition: scale 100ms "cubic-bezier(0.5,0,0.2,1)";
    }
  }
</style>

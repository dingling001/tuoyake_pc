<template>
  <div class="index">
    <div class="bannerbox" v-if="swiperlist.length">
      <div class="swiper-container banner">
        <!--        <div class="swiper-wrapper">-->
        <!--          &lt;!&ndash;          <div&ndash;&gt;-->
        <!--          &lt;!&ndash;            class="slide"&ndash;&gt;-->
        <!--          &lt;!&ndash;            v-for="(item,index) in swiperlist"&ndash;&gt;-->
        <!--          &lt;!&ndash;            :key="index"&ndash;&gt;-->
        <!--          &lt;!&ndash;            :class="{'active':ind==index}"&ndash;&gt;-->
        <!--          &lt;!&ndash;            :style="{'background':'url('+item.image+')no-repeat','background-size':'cover','background-position':'center center'}"&ndash;&gt;-->
        <!--          &lt;!&ndash;          ></div>&ndash;&gt;-->
        <!--      -->
        <!--        </div>-->
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperlist" :key="index"><img :src="item.image" alt=""></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="recommendbox">
      <div class="recommendtitle">
        <div class="recommentleft"><span class="iconfont icontuijian"></span><span>推荐网吧</span></div>
        <div class="recommentright"><span>查看更多</span><span class="iconbox"><span
          class="iconfont iconjiantou"></span></span></div>
      </div>
      <div class="recommentlist">
        <div class="recmmentitem" v-for="(item ,index) in netlist" :key="item.id">
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
    </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'

  export default {
    name: "home",
    data() {
      return {
        cur: 0,
        swiperlist: [],
        city: '天津市',
        page: 0,
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
        mySwiper: null
      };
    },

    mounted() {
      // window.addEventListener("scroll", this.handleScroll);
      // this.height = document.body.clientHeight;

      this._GetSlideList();
      this._GetLabelList();
      this._GetBarList();
      var timer = setInterval(() => {
        if (this.ind <= this.swiperlist.length - 2) {
          this.ind = this.ind + 1;
        } else {
          this.ind = 0;
        }
      }, 5000);

    },
    inject: ["app"],
    methods: {
      // 获取轮播图
      _GetSlideList() {
        this.$api.GetSlideList(this.city).then((res) => {
          if (res.code == 1) {
            this.swiperlist = res.data;
            setTimeout(() => {
              this.mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                observer: true,
                observeParents: true,
                paginationClickable: true,
                // 如果需要分页器
//pagination : '#swiper-pagination1',
              })
            }, 500)
          } else {
            this.$common.showToast(res.msg)
          }
        })
      },
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
        ).then(res => {
          if (res.code == 1) {//请求成功
            this.netlist = res.data.data
          }
          console.log(this.netlist)
        })
      },

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "../../style/reset";

  .index {
    .bannerbox {
      background-image: url("../../img/index/index_bg.jpg");
      background-position: top;
      background-size: 100% auto;
      background-repeat: no-repeat;
      overflow: hidden;

      .banner {
        width: 1200px;
        margin: 40px auto 18px auto;
        height: 420px;

        /deep/ .swiper-wrapper {
          overflow: hidden;

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: scale(1, 1);
            opacity: 0;
            z-index: -1;
            transition: transform 5000ms linear 0s;

            &.active {
              animation: scale 5000ms linear;
            }
          }
        }

        .swiper-slide {

          img {
            width: 100%;

          }
        }
      }
    }

    .recommendbox {
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;

      .recommendtitle {
        overflow: hidden;
        width: 1200px;
        margin: 0 auto;
        padding: 24px 30px;
        border-bottom: 1px solid #EEEEEE;

        .recommentleft {
          float: left;
          font-size: 16px;

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
        padding: 40px 48px;

        .recmmentitem {
          float: left;
          width: 240px;
          margin-bottom: 50px;
          margin-right: 48px;
          cursor: pointer;

          &:nth-child(4n) {
            margin-right: 0;
          }

          &:hover .rec_name {
            color: $baseBlue;
            font-weight: bold;
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
              width: 96px;
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
                padding: 1px 0;
                width: 56px;
                text-align: center;
                border-radius: 10px;
                display: inline-block;
                font-size: 13px;
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

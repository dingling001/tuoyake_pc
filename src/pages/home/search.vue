<template>
  <div class="listbox">
    <div class="listtab">
        <span :class="{'ativetab':tab==index}" @click="orderby(index,item.order)"
              v-for="(item,index) in tabs" :key="item.order">{{item.name}}</span>
    </div>
    <div class="list" v-if="netlist.length">
      <div class="recmmentitem" v-for="(item ,index) in netlist" :key="item.id">
        <div class="rec_img"><img :src="item.image" alt=""></div>
        <div class="rec_right">
          <div class="rec_name">{{item.name}}</div>
          <!--            <div class="rec_type">-->
          <div class="starbox">
            <span class="iconfont iconstar-fill iconactive" v-for="i in parseInt(item.star)"></span>
          </div>
          <div class="typebox">
            <span v-for="c in item.label_ids">{{c}}</span>
          </div>
          <!--            </div>-->
          <div class="rec_address single-line-text"><span class="el-icon-location-outline"></span>{{item.address}}
          </div>
        </div>
      </div>
    </div>
    <div class="common-list" v-else>
      <div class="common-list-main">
        <div class="no-search-content">对不起，没有符合条件的商家</div>
      </div>
    </div>
    <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
              :scrollTo="200" v-if="netlist.length"></pcpaging>
  </div>
</template>

<script>
  import pcpaging from '../../components/pcpaging'

  export default {
    name: "search",
    data() {
      return {
        tkeyword: "",
        netlist: [],
        totalPages: 0,
        per_page: 10,
        city: localStorage.city || '天津市',
        lat: 0,
        lng: 0,
        recommend: 0,
        circle: '',
        district: '',
        tabs: [
          {
            name: '默认排序',
            order: '1'
          },
          {
            name: '智能排序',
            order: '2'
          },
          {
            name: '评分最高',
            order: '3'
          },
        ],
        tab: '',
        order: 1
      }
    },
    components: {
      pcpaging
    },
    created() {
      this.keyword = this.$route.params.tkeyword
    },
    watch: {
      '$route': {
        handler(val) {
          this.keyword = val.params.tkeyword;
          this._GetBarList();
        },
        immediate: true,
      }
    },
    methods: {
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
          this.per_page,
          this.order
        ).then(res => {
          if (res.code == 1) {//请求成功
            this.netlist = res.data.data
            this.totalPages = res.data.total / this.per_page;
          }
          // console.log(this.netlist)
        })
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._GetBarList();
      },
      // 排序
      orderby(index, order) {
        this.tab = index;
        this.order = order;
        this._GetBarList();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .listbox {
    background-color: #fff;
    width: 1200px;

    margin: 20px auto;

    .listtab {
      border-bottom: 1px solid #EEEEEE;
      margin: 0 27px;

      span {
        display: inline-block;
        padding: 30px 20px 22px 2px;
        cursor: pointer;

        &:hover {
          color: $baseBlue;
          font-weight: bold;
        }

        &.ativetab {
          color: $baseBlue;
          font-weight: bold;
        }
      }
    }

    .list {
      overflow: hidden;

      .recmmentitem {
        /*float: left;*/
        /*width: 240px;*/
        margin: 0 28px 0 30px;
        cursor: pointer;
        overflow: hidden;
        padding: 45px 0 40px 0;
        border-top: 1px dashed #EEEEEE;

        &:hover .rec_right .rec_name {
          color: $baseBlue;
          font-weight: bold;
        }

        .rec_img {
          width: 220px;
          height: 220px;
          text-align: center;
          line-height: 220px;
          border-radius: 5px;
          overflow: hidden;
          float: left;
          background-color: #f8f8f8;

          img {
            width: 100%;
            vertical-align: middle;
          }
        }

        .rec_right {
          float: left;
          margin-left: 34px;

          .rec_name {
            padding: 18px 0;
            font-size: 20px;
            color: #333333;
          }

          .starbox {
            /*float: left;*/
            /*width: 96px;*/
            padding-bottom: 28px;

            .iconfont {
              color: #c3c3c3;
              margin-right: 5px;
            }

            .iconactive {
              color: $baseRed;
            }
          }

          .typebox {
            /*float: left;*/
            padding-bottom: 33px;

            span {
              background-color: #FEEAEB;
              color: #E03A43;
              padding: 5px 12px;
              text-align: center;
              border-radius: 10px;
              display: inline-block;
              font-size: 14px;
              margin-right: 34px;
            }
          }

          .rec_type {
            overflow: hidden;
          }

          .rec_address {
            color: #999999;
            font-size: 16px;

            .el-icon-location-outline {
              margin-right: 5px;
            }
          }
        }
      }
    }

    .common-list {
      &-main {
        .no-search-content {
          padding: 50px 0;
          text-align: center;
          background-color: #f5f5f5;
        }
      }
    }

  }

</style>

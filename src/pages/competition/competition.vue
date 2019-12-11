<template>
  <div class="cbox">
    <city-select @removeall="removeAll" @labeled="labeledfn" @cityarea="cityareafn" @removecity="removecity"
                 @removelabel="removelabel" @allarea="allarea" @alllabel="alllabel"></city-select>
    <div class="listbox">
      <div class="listtab" v-loading="showlist">
        <span :class="{'ativetab':tab==index}" @click="orderby(index,item.order)"
              v-for="(item,index) in tabs" :key="item.order">{{item.name}}</span>
      </div>
      <div class="list" v-if="showdata&&netlist.length">
        <div class="recmmentitem" v-for="(item ,index) in netlist" :key="item.id" @click="go_detail(item.id)">
          <div class="rec_img"><img :src="item.image" alt="">
            <div class="rec_type" v-if="item.recommend">推荐</div>
          </div>
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
            <div class="rec_address map" @click.stop="showmap(index,item)">查看地图</div>
          </div>
        </div>
      </div>
      <div v-if="showdata&&netlist.length==0" class="list">
        <NoData :text="'暂无符合条件的商家'"></NoData>
      </div>
      <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
                :scrollTo="200" v-if="netlist.length"></pcpaging>
    </div>
    <amap :show.sync="visibleMap" v-if="Object.keys(info).length" :info="info"></amap>
  </div>
</template>

<script>
  import CitySelect from '../../components/CitySelect'
  import pcpaging from '../../components/pcpaging'
  import amap from '../../components/amap'

  export default {
    name: "competition",
    data() {
      return {
        netlist: [],
        totalPages: 0,
        per_page: 10,
        city: '',
        lat: 0,
        lng: 0,
        recommend: 0,
        circle: '',
        keyword: '',
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
        order: 1,
        showdata: false,
        showlist: true,
        visibleMap: false,
        info: {}
      }
    },
    components: {
      CitySelect,
      pcpaging,
      amap
    },
    created() {
      this.city = this.$com.getCookies('pccity') || '北京';
      this._GetBarList()
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
          this.showdata = true;
          this.showlist = false;
          if (res.code == 1) {//请求成功
            this.netlist = res.data.data
            this.totalPages = res.data.total / this.per_page;
          }
          // console.log(this.netlist)
        })
      },
      // 分页
      getPresentPage(val) {
        this.showlist = true;
        this.page = val;
        this._GetBarList();
      },
      // 选中服务标签
      labeledfn(val) {
        this.showlist = true;
        this.page = 1;
        this.label = val;
        this._GetBarList();
      },
      // 选中地区
      cityareafn(val) {
        this.showlist = true;
        this.page = 1;
        this.district = val;
        this._GetBarList();
      },
      // 清除所有条件
      removeAll(val) {
        this.showlist = true;
        this.label = '';
        this.district = '';
        this.page = 1;
        this._GetBarList();
      },
      removecity(val) {
        this.showlist = true;
        this.district = val;
        this.page = 1;
        this._GetBarList();
      },
      removelabel(val) {
        this.showlist = true;
        this.label = val;
        this.page = 1;
        this._GetBarList();
      },
      allarea(val) {
        console.log(val)
        this.district = val;
        this.page = 1;
        this._GetBarList();
      },
      alllabel(val) {
        console.log(val)
        this.label = val;
        this.page = 1;
        this._GetBarList();
      },
      // 排序
      orderby(index, order) {
        this.showlist = true;
        this.tab = index;
        this.order = order;
        this.page = 1;
        this._GetBarList();
      },
      go_detail(id) {
        this.$router.push({path: '/competitiondetail/' + id})
      },
      // 展示地图
      showmap(index, item) {
        this.visibleMap = true;
        this.info = item;
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .cbox {
    width: 1200px;
    margin: 0 auto;

    .listbox {
      background-color: #fff;
      margin: 20px 0;

      .listtab {
        border-bottom: 1px solid #EEEEEE;
        margin: 0 27px;
        position: relative;

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
        min-height: 300px;
        position: relative;

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
            border-radius: 15px;
            overflow: hidden;
            float: left;
            background-color: #f8f8f8;
            position: relative;

            img {
              width: 100%;
              vertical-align: middle;

            }

            .rec_type {
              position: absolute;
              left: 0;
              top: 0;
              font-size: 12px;
              width: 60px;
              line-height: 25px;
              text-align: center;
              color: #fff;
              border-radius: 15px 0 15px 0;
              background: linear-gradient(90deg, #ec8215, #f0a532);
            }
          }

          .rec_right {
            float: left;
            margin-left: 34px;
            position: relative;

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


            .rec_address {
              color: #999999;
              font-size: 16px;

              &.map {
                line-height: 30px;
                font-size: 12px;
                color: $baseBlue;
              }

              .el-icon-location-outline {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }

</style>

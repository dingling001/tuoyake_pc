<template>
  <div class="cbox">
    <city-select @removeall="removeAll" @labeled="labeledfn" @cityarea="cityareafn" @removecity="removecity"
                 @removelabel="removelabel" @allarea="allarea" @alllabel="alllabel" :showlabel="false"></city-select>
    <div class="allschool"><span @click="allcate('',-1)" :class="{'activeacate':ind==-1}">全部电竞俱乐部</span><span
      @click="allcate(item.id,index)" :class="{'activeacate':ind==index}" v-for="(item,index) in catelist"
      :key="index">{{item.name}}</span></div>
    <div class="jlist" v-if="cshow&&clublist.length">
      <div class="jitem van-row--flex" v-for="(item,index) in clublist" :key="item.id"
           @click="godetail(item.category_id)">
        <div class="jimg"><img :src="item.image" alt=""></div>
        <div class="jright">
          <div class="jname ">{{item.name}}</div>
          <div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>
          </div>
          <div class="jaddress ">{{item.address}}</div>
          <div class="jaddress van-ellipsis">{{item.synopsis}}</div>
        </div>
      </div>
    </div>
    <div class="jlist" v-if="cshow&&clublist.length==0">
      <NoData :text="'暂无电竞俱乐部'"></NoData>
    </div>
    <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
              :scrollTo="200" v-if="clublist.length&&totalPages>per_page"></pcpaging>
  </div>
</template>

<script>
  import CitySelect from '../../components/CitySelect'
  import pcpaging from '../../components/pcpaging'

  export default {
    name: "club",
    data() {
      return {
        clublist: [],
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
        category_id: "",
        catelist: [], ind: -1, cshow: false
      }
    },
    components: {
      CitySelect,
      pcpaging
    },
    created() {
      this.city = this.$com.getCookies('pccity') || '北京';
      this._Category();
      this._ClubIndex()
    },
    methods: {
      _Category() {
        this.$api.Category().then(res => {
          if (res.code == 1) {
            this.catelist = res.data;
          }
        })
      },
      // 获取俱乐部列表
      _ClubIndex() {
        this.$api.ClubIndex(
          this.page,
          this.category_id,
          this.district || this.$com.getCookies('pccity'),
          this.keyword,
        ).then(res => {
          this.cshow = true;
          if (res.code == 1) {//请求成功
            this.clublist = res.data.data;
            this.totalPages = res.data.total / this.per_page;
          }
        })
      },
      allcate(id, index) {
        this.category_id = id;
        this.ind = index;
        this.page = 1;
        this._ClubIndex();
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._ClubIndex();
      },

      // 选中服务标签
      labeledfn(val) {
        this.showlist = true;
        this.page = 1;
        this.label = val;
        this._ClubIndex();
      },
      // 选中地区
      cityareafn(val) {
        this.showlist = true;
        this.page = 1;
        this.district = val;
        this._ClubIndex();
      },
      // 清除所有条件
      removeAll(val) {
        this.showlist = true;
        this.label = '';
        this.district = '';
        this.page = 1;
        this._ClubIndex();
      },
      removecity(val) {
        this.showlist = true;
        this.district = val;
        this.page = 1;
        this._ClubIndex();
      },
      removelabel(val) {
        this.showlist = true;
        this.label = val;
        this.page = 1;
        this._ClubIndex();
      },
      allarea(val) {
        console.log(val)
        this.district = val;
        this.page = 1;
        this._ClubIndex();
      },
      alllabel(val) {
        console.log(val)
        this.label = val;
        this.page = 1;
        this._ClubIndex();
      },
      // 排序
      orderby(index, order) {
        this.tab = index;
        this.order = order;
        this._ClubIndex();
      },
      // 去详情
      godetail(id) {
        this.$router.push({path: '/clubdetail', query: {club_id: id}})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .cbox {
    width: 1200px;
    margin: 0 auto;

    .allschool {
      font-size: 18px;
      padding: 26px 27px;
      /*margin: 26px 27px;*/
      border-bottom: 1px solid #eee;
      background-color: #fff;

      span {
        margin-right: 20px;
        cursor: pointer;

        &.activeacate {
          color: $baseRed;
        }
      }
    }

    .jlist {
      background-color: #fff;
      position: relative;
      min-height: 300px;

      .jitem {
        margin: 0 17px 17px 17px;
        /*display: flex;*/
        padding: 40px;
        border-bottom: 1px solid #eee;
        /*no*/
        overflow: hidden;
        cursor: pointer;

        &:hover .jname {
          color: $baseBlue;
        }

        .jimg {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          /*px*/
          /*border: 1px solid #eee;*/
          /*no*/
          margin-right: 17px;
          flex-shrink: 0;
          float: left;

          img {
            width: 100%;
          }
        }

        .jright {
          float: left;

          .jname {
            font-size: 18px;
            /* px */
            padding: 0 0 10px 0;
          }

          .jinfo {
            font-size: 14px;
            /*px*/
            color: #666666;
            padding-bottom: 10px;

            .name {
              margin-right: 10px;
            }
          }

          .jaddress {
            color: #666666;
            font-size: 14px;
            padding-bottom: 18px;

            &.van-ellipsis {
              padding: 0;
            }
          }
        }
      }
    }
  }

</style>

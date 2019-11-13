<template>
  <div class="cbox">
    <city-select @removeall="removeAll" @labeled="labeledfn" @cityarea="cityareafn" :showlabel="false"></city-select>
    <div class="allschool">全部学院</div>
    <div class="jlist">
      <div class="jitem van-row--flex" v-for="(item,index) in clublist" :key="item.category_id"
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
        city: localStorage.city || '天津市',
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
        order: 1
      }
    },
    components: {
      CitySelect,
      pcpaging
    },
    created() {
      this._ClubIndex()
    },
    methods: {
      // 获取俱乐部列表
      _ClubIndex() {
        this.$api.ClubIndex(
          this.page,
          this.category_id,
          this.keyword,
          this.city,
        ).then(res => {
          if (res.code == 1) {//请求成功
            this.clublist = res.data.data;
          }
        })
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._ClubIndex();
      },
      // 选中服务标签
      labeledfn(val) {
        console.log(val)
        this.page = 1;
        this.label = val;
        this._ClubIndex();

      },
      // 选中地区
      cityareafn(val) {
        this.page = 1;
        this.district = val;
        this._ClubIndex();
      },
      // 清除所有条件
      removeAll(val) {
        this.label = '';
        this.district = '';
        this.page = 1;
        this._ClubIndex();
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

  .cbox {
    width: 1200px;
    margin: 0 auto;
    .allschool {
      font-size: 18px;
      padding: 26px 27px;
      /*margin: 26px 27px;*/
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }

    .jlist {
      background-color: #fff;

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
            padding: 0 0 27px;
          }

          .jinfo {
            font-size: 14px;
            /*px*/
            color: #666666;
            padding-bottom: 19px;

            .name {
              margin-right: 10px;
            }
          }

          .jaddress {
            color: #666666;
            font-size: 14px;
            padding-bottom: 20px;

            &.van-ellipsis {
              padding: 0;
            }
          }
        }
      }

    }
  }

</style>

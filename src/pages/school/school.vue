<template>
  <div class="sbox">
    <city-select @removeall="removeAll" @cityarea="cityareafn" @removecity="removecity" @allarea="allarea"
                 :showlabel="false"></city-select>
    <div class="listbox">
      <div class="allschool"><span @click="allcate('',-1)" :class="{'activeacate':ind==-1}">全部酒店</span><span
        @click="allcate(item.id,index)" :class="{'activeacate':ind==index}" v-for="(item,index) in catelist"
        :key="index">{{item.name}}</span>
      </div>
      <div class="list" v-if="cshow&&clublist.length">
        <div class="jitem" v-for="(item,index) in clublist" :key="item.id"
             @click="godetail(item.id)">
          <div class="jimg"><img :src="item.image" alt=""></div>
          <div class="jright">
            <div class="jname">{{item.name}}</div>
            <div class="jinfo"><span class="name">电话：</span><span class="tel">{{item.contact_number}}</span>
            </div>
            <div class="jaddress ">地址：{{item.address}}</div>
            <div class="jaddress ">简介：{{item.synopsis}}</div>
          </div>
        </div>
      </div>
      <div class="list" v-if="cshow&&clublist.length==0">
        <NoData :text="'暂无酒店'"></NoData>
      </div>
      <pcpaging class="pcpaging" :totalPages="totalPages" @presentPage="getPresentPage" :pageSize="per_page"
                :scrollTo="200" v-if="clublist.length&&totalPages>per_page"></pcpaging>
    </div>
  </div>
</template>

<script>
  import CitySelect from '../../components/CitySelect'
  import pcpaging from '../../components/pcpaging'

  export default {
    name: "school",
    data() {
      return {
        page: 0,
        label: '',
        district: '',
        clublist: [],
        category_id: '',
        keyword: '',
        city: '',
        per_page: 10,
        circle: '',
        totalPages: 0,
        catelist: [], ind: -1, cshow: false
      }
    },
    components: {
      CitySelect,
      pcpaging
    },
    created() {
      this._CollegeCategory();
      this._CollegeIndex()
    },
    methods: {
      _CollegeCategory() {
        this.$api.CollegeCategory().then(res => {
          if (res.code == 1) {
            this.catelist = res.data;
          }
        })
      },
      // 获取学院列表
      _CollegeIndex() {
        this.cshow = false;
        this.$api.CollegeIndex(
          this.page,
          this.category_id,
          this.$com.getCookies('pccity'),
          this.keyword,
          this.district,
          this.circle
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
        this._CollegeIndex();
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._CollegeIndex();
      },

      // 选中地区
      cityareafn(val) {
        this.cshow = true;
        this.page = 1;
        this.district = val;
        this._CollegeIndex();
      },
      // 清除所有条件
      removeAll(val) {
        this.cshow = true;
        this.label = '';
        this.district = '';
        this.page = 1;
        this._CollegeIndex();
      },
      removecity(val) {
        this.cshow = true;
        this.district = val;
        this.page = 1;
        this._CollegeIndex();
      },
      allarea(val) {
        console.log(val)
        this.district = val;
        this.page = 1;
        this._CollegeIndex();
      },
      // 去详情
      godetail(id) {
        this.$router.push({path: '/schooldetail', query: {college_id: id}})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .sbox {
    width: 1200px;
    margin: 0 auto;

    .listbox {
      background-color: #fff;
      padding-bottom: 40px;

      .allschool {
        font-size: 18px;
        padding: 26px 0 22px 0;
        margin: 0 27px;
        border-bottom: 1px solid #eee;

        span {
          margin-right: 20px;
          cursor: pointer;

          &.activeacate {
            color: $baseRed;
          }
        }
      }

      .list {
        padding-bottom: 50px;
        position: relative;
        min-height: 300px;

        .jitem {
          margin: 0 27px;
          /*display: flex;*/
          padding: 40px 0 10px 0;
          border-bottom: 1px dashed #eee;
          overflow: hidden;
          cursor: pointer;
          /*&:last-child {*/
          /*border: 0;*/
          /*}*/

          .jimg {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            margin-right: 30px;
            background-color: #F8F8F8;
            float: left;

            img {
              width: 100%;
            }
          }

          .jright {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            float: left;

            &:hover .jname {
              color: $baseBlue;
            }

            .jname {
              font-size: 18px;
              font-weight: bold;
              color: #333;
              padding: 0 0 9px 0;
            }

            .jinfo {
              font-size: 14px;
              color: #666666;
              padding: 20px 0;
            }

            .jaddress {
              color: #666666;
              font-size: 14px;
              padding-bottom: 20px;

            }
          }
        }
      }
    }
  }
</style>

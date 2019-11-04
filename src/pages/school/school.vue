<template>
  <div class="sbox">
    <city-select @removeall="removeAll" @labeled="labeledfn" @cityarea="cityareafn" :showlabel="false"></city-select>
    <div class="listbox">
      <div class="allschool">全部学院</div>
      <div class="list">
        <div class="jitem" v-for="(item,index) in clublist" :key="item.category_id"
             @click="godetail(item.category_id)">
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
        totalPages: 0
      }
    },
    components: {
      CitySelect,
      pcpaging
    },
    created() {
      this._CollegeIndex()
    },
    methods: {
      // 获取学院列表
      _CollegeIndex() {
        this.$api.CollegeIndex(
          this.page,
          this.category_id,
          this.keyword,
          this.city,
        ).then(res => {
          if (res.code == 1) {//请求成功
            this.clublist = res.data.data;
            this.totalPages = res.data.total;
          }

        })
      },
      // 分页
      getPresentPage(val) {
        this.page = val;
        this._CollegeIndex();
      },
      // 选中服务标签
      labeledfn(val) {
        console.log(val)
        this.page = 1;
        this.label = val;
      },
      // 选中地区
      cityareafn(val) {
        this.page = 1;
        this.district = val;
        this._CollegeIndex()

      },
      // 清除所有条件
      removeAll(val) {
        this.label = '';
        this.district = '';
        this.page = 1;
      },
    }
  }
</script>

<style scoped lang="scss">
  .sbox {
    .listbox {
      background-color: #fff;
      padding-bottom: 40px;

      .allschool {
        font-size: 18px;
        padding: 26px 0 22px 0;
        margin: 0 27px;
        border-bottom: 1px solid #eee;
      }

      .list {
        padding-bottom: 50px;

        .jitem {
          margin: 0 27px;
          /*display: flex;*/
          padding: 40px 0 10px 0;
          border-bottom: 1px dashed #eee;
          overflow: hidden;

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

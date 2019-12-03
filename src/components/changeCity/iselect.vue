<template>
  <div class="m-iselect">
    <span class="name">按省份选择</span>
    <el-select v-model="pvalue" placeholder="省份" @change="changeprov">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市" @change="changecity">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直接搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    >
    </el-autocomplete>

  </div>
</template>

<script>
  import _ from 'lodash'
  import province from '../../bin/city'
  import allcity from '../../bin/allcity'

  export default {
    data() {
      return {
        province: [],
        pvalue: '',
        city: [],
        cvalue: '',
        input: '',
        cities: ''
      }
    },

    async mounted() {
      // let {status,data:{province}}=await this.$axios.get('/geo/province')
      this.province = province.data.map(item => {
        return {
          value: item.id,
          label: item.name,
          cityArr: item.cityArr
        }
      })
      console.log(this.province)
    },
    methods: {
      querySearchAsync: _.debounce(async function (query, cb) {
        var citys = allcity.city;
        if (this.cities.length) {
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          this.cities = citys.map(item => {
            return {
              value: item.name
            }
          });
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        }
      }, 200),
      // 选择城市
      handleSelect(item) {
        console.log(item.value);
        // localStorage.city = item.value;
        this.$com.setCookie('pccity',item.value);
        location.href = '/'
        // this.$router.replace('/')
      },
      changeprov(e) {
        // var city = ress.data;
        this.province.map((item, index) => {
          if (item.label == e) {
            this.city = this.province[index].cityArr.map(item => {
              return {
                value: item.id,
                label: item.name
              }
            })
          }
        })
        // this.$api.GetAreaPidByName(this.pvalue).then(res => {
        //   console.log(res.data)
        //   this.$api.GetAreaListTree(res.data).then(ress => {

        //     this.cvalue = ''
        //   })
        // })
      },
      changecity(e) {
        // localStorage.city = e;
        this.$com.setCookie('pccity',e);
        location.href = '/'
        // this.$router.replace('/')
      }
    }
  }
</script>

<style lang="scss">
  .page-changeCity {
    width: 1190px;
    box-sizing: border-box;
    margin: 20px auto 0;
    background-color: #fff;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    min-height: 1000px;
    padding: 20px;

    .m-iselect {
      .province {
        cursor: pointer;
        border-radius: 4px;
        margin: 0 10px 0 20px;
      }

      .city {
        cursor: not-allowed;
        border-radius: 4px;
        margin: 0 20px 0 10px;
      }

      .label {
        margin-left: 40px;
      }

      .input {
        width: 220px;
        height: 40px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 14px;
        color: #666;
        box-sizing: border-box;
      }
    }

    .el-row {
      padding-bottom: 20px;

      &:after {
        content: ' ';
        height: 1px;
        width: 100%;
        border-bottom: 1px solid #E5E5E5;
        padding-top: 20px;
      }
    }
  }

</style>

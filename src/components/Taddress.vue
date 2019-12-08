<template>
  <el-dialog title="新建地址"
             :visible.sync="visible"
             @close="$emit('update:show', false)"
             :show="show" center>
    <el-form :model="form" label-width="100px">
      <el-form-item label="联系人">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.tel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
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
        <el-select v-model="dvalue" :disabled="!district.length" placeholder="区" @change="changedistrict">
          <el-option
            v-for="item in district"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情地址">
        <el-input v-model="form.desc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="add_address">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import province from '../bin/city'

  export default {
    name: "Taddress",
    data() {
      return {
        visible: this.show,

        form: {
          name: '',
          desc: '',
          tel: ''
        },
        province: [],
        pvalue: '',
        city: [],
        cvalue: '',
        dvalue: '',
        district: [],
        is_default: 0,
        id: ''
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
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
      // console.log(this.province)
    },
    watch: {
      show() {
        this.visible = this.show;
      }
    },
    methods: {
      changeprov(e) {
        // var city = ress.data;
        this.city = [];
        this.district = [];
        this.cvalue = '';
        this.dvalue = '';
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

      },
      changecity(e) {
        // localStorage.city = e;
        // this.$router.replace('/')
        this.district = [];
        this.dvalue = ''
        this.$api.GetAreaPidByName(e).then(res => {
          this.$api.GetAreaListTree(res.data).then(ress => {
            this.district = ress.data;

          })
        })
      },
      changedistrict(e) {
        this.dvalue = e;
      },
      add_address() {
        this.$api.AddressSetAddress(
          this.form.name,
          this.form.tel,
          this.pvalue,
          this.cvalue,
          this.dvalue,
          this.form.desc,
          this.is_default,
          this.id
        ).then(res => {
          if(res.code==1){
            this.visible=false;
            this.$emit('add',1)
          }else{
            this.$com.showToast(res.msg||'稍后再试！')
          }

        })
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-dialog {
    .el-form {
      .el-input {
        width: 500px;
      }

      .el-select {
        width: 120px;

        .el-input {
          width: 120px;
        }
      }
    }
  }
</style>

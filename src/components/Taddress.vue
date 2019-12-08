<template>
  <el-dialog title="新建地址"
             :visible.sync="visible"
             width="1140px"
             @close="$emit('update:show', false)"
             :show="show" center>
    <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="form.name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="form.tel" autocomplete="off" maxlength="11" @input="accountinput"></el-input>
      </el-form-item>
      <el-form-item label="地址" required>
        <el-col :span="3">
          <el-form-item prop="pvalue">
            <el-select v-model="form.pvalue" placeholder="省份" @change="changeprov">
              <el-option
                v-for="item in province"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="cvalue">
            <el-select v-model="form.cvalue" :disabled="!city.length" placeholder="城市" @change="changecity">
              <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="dvalue">
            <el-select v-model="form.dvalue" :disabled="!district.length" placeholder="区"
                       @change="changedistrict">
              <el-option
                v-for="item in district"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="详情地址" prop="desc">
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
    // !this.$com.checkPhone(this.ruleForm.account)

    data() {
      var validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'));
        } else {
          if (!this.$com.checkPhone(this.ruleForm.account)) {
            callback(new Error('请输入联系方式不正确'));
          } else {
            callback();
          }
        }
      };
      return {
        visible: this.show,

        form: {
          name: '',
          desc: '',
          tel: '',
          pvalue: '',
          cvalue: '',
          dvalue: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          tel: {validator: validateTel, trigger: 'blur', required: true},
          pvalue: [{required: true, message: '请选择省', trigger: 'change'}],
          cvalue: [{required: true, message: '请选择市', trigger: 'change'}],
          dvalue: [{required: true, message: '请选择地区', trigger: 'change'}],
          desc: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
          ],
        },
        province: [],
        city: [],
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
      accountinput() {
        this.form.tel = this.form.tel.replace(/[^\d]/g, '');
      },
      changeprov(e) {
        // var city = ress.data;
        this.city = [];
        this.district = [];
        this.form.cvalue = '';
        this.form.dvalue = '';
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
        this.form.dvalue = '';
        this.$api.GetAreaPidByName(e).then(res => {
          this.$api.GetAreaListTree(res.data).then(ress => {
            this.district = ress.data;
          })
        })
      },
      changedistrict(e) {
        this.form.dvalue = e;
      },
      add_address() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$api.AddressSetAddress(
              this.form.name,
              this.form.tel,
              this.form.pvalue,
              this.form.cvalue,
              this.form.dvalue,
              this.form.desc,
              this.is_default,
              this.id
            ).then(res => {
              if (res.code == 1) {
                this.visible = false;
                this.$com.showToast('添加成功', 'success')
                this.$emit('add', 1)
              } else {
                this.$com.showToast(res.msg || '稍后再试！')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

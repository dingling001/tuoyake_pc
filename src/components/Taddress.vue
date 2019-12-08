<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             width="1140px"
             @close="$emit('update:show', false)"
             :show="show" center>
    <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="form.name" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="form.mobile" autocomplete="off" clearable maxlength="11" @input="accountinput"></el-input>
      </el-form-item>
      <el-form-item label="地址" required>
        <el-col :span="3">
          <el-form-item prop="province">
            <el-select v-model="form.province" placeholder="省份" @change="changeprov">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="city">
            <el-select v-model="form.city" :disabled="!citys.length" placeholder="城市" @change="changecity">
              <el-option
                v-for="item in citys"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="district">
            <el-select v-model="form.district" :disabled="!districts.length" placeholder="区"
                       @change="changedistrict">
              <el-option
                v-for="item in districts"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="详情地址" prop="address">
        <el-input v-model="form.address" autocomplete="off" clearable></el-input>
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
      var validatemobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'));
        } else {
          if (!this.$com.checkPhone(this.form.mobile)) {
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
          address: '',
          mobile: '',
          province: '',
          city: '',
          district: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          mobile: {validator: validatemobile, trigger: 'blur', required: true},
          province: [{required: true, message: '请选择省', trigger: 'change'}],
          city: [{required: true, message: '请选择市', trigger: 'change'}],
          district: [{required: true, message: '请选择地区', trigger: 'change'}],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
          ],
        },
        provinces: [],
        citys: [],
        districts: [],
        is_default: 0,
        title: '新建地址'
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      id: {
        type: Number || String,
        default: ''
      }
    },

    async mounted() {
      // let {status,data:{province}}=await this.$axios.get('/geo/province')
      this.provinces = province.data.map(item => {
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
      },
      id: {
        handler(val) {
          if (val) {
            this.id = val;
            this._AddressDetail()
          }
        },
        immediate: true
      }
    },
    methods: {
      // 验证手机号
      accountinput() {
        this.form.mobile = this.form.mobile.replace(/[^\d]/g, '');
      },
      // 省改变
      changeprov(e) {
        // var city = ress.data;
        this.citys = [];
        this.districts = [];
        this.form.city = '';
        this.form.district = '';
        this.provinces.map((item, index) => {
          if (item.label == e) {
            this.citys = this.provinces[index].cityArr.map(item => {
              return {
                value: item.id,
                label: item.name
              }
            })
          }
        })

      },
      // 市改变
      changecity(e) {
        // localStorage.city = e;
        // this.$router.replace('/')
        this.districts = [];
        this.form.district = '';
        this.$api.GetAreaPidByName(e).then(res => {
          this.$api.GetAreaListTree(res.data).then(ress => {
            this.districts = ress.data;
          })
        })
      },
      // 地区改变
      changedistrict(e) {
        this.form.district = e;
      },
      // 新增地址
      add_address() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$api.AddressSetAddress(
              this.form.name,
              this.form.mobile,
              this.form.province,
              this.form.city,
              this.form.district,
              this.form.address,
              this.is_default,
              this.id
            ).then(res => {
              if (res.code == 1) {
                this.visible = false;
                this.$refs.ruleForm.resetFields();
                this.$com.showToast('添加成功', 'success')
                this.$emit('add', 1)
              } else {
                this.$com.showToast(res.msg || '稍后再试！')
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      // 获取详情
      _AddressDetail() {
        this.title = '编辑地址'
        this.$api.AddressDetail(this.id).then(res => {
          if (res.code == 1) {
            this.form = res.data;
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

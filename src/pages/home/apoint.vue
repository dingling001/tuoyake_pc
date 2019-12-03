<template>
  <div class="score_box" v-loading="showloading">
    <div class="name">{{matchinfo.name}}</div>
    <div class="date">{{matchinfo.start_time}} ~{{matchinfo.end_time}}</div>
    <el-form label-width="100px" :model="formLabelAlign" :rules="formrules" ref="form">
      <el-form-item label="报名人姓名" prop="username">
        <el-input v-model="formLabelAlign.username" placeholder="报名人姓名" maxlength="30" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formLabelAlign.mobile" placeholder="手机号" maxlength="11" clearable></el-input>
      </el-form-item>
      <el-form-item label="战队名称" prop="team_name">
        <el-input v-model="formLabelAlign.team_name" placeholder="战队名称" maxlength="30" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formLabelAlign.email" placeholder="邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          show-word-limit
          maxlength="150"
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="备注信息"
          resize="none"
          v-model="formLabelAlign.remark">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="gobaoming">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "apoint",
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error("请输入手机号"));
        }
        if (!this.$com.checkPhone(value)) {
          return callback(new Error("手机号不正确"));
        } else {
          callback();
        }
      };
      return {
        showloading: true,
        formLabelAlign: {
          username: '',
          mobile: '',
          team_name: '',
          email: '',
          remark: ''
        },
        formrules: {
          username: [
            {required: true, message: '请输入报名人姓名', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
          mobile: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ],
          team_name: [
            {required: true, message: '请输入战队名称', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}

          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          remark: [
            {min: 0, max: 150, message: '长度在 150 个字符', trigger: 'blur'}
          ]
        },
        matchinfo: {}
      }
    },
    created() {
      if (this.$route.params.match_id) {
        this.match_id = this.$route.params.match_id;
        this._GetMatchInfo()
      } else {
        this.$router.replace('/')
      }
    },
    methods: {
      // 获取套餐详情
      _GetMatchInfo() {
        this.$api.GetMatchInfo(this.match_id).then(res => {
          this.showloading = false;
          if (res.code == 1) {
            this.matchinfo = res.data;
          } else {
            this.$com.showToast(res.msg)
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
      },
      // 立即报名
      gobaoming() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$api.SetMatchSign(
              this.match_id,
              this.formLabelAlign.username,
              this.formLabelAlign.mobile,
              this.formLabelAlign.team_name,
              this.formLabelAlign.email,
              this.formLabelAlign.remark
            ).then(res => {
              this.$com.showToast(res.msg, 'error')
              if (res.code == 1) {
                this.$com.showToast(res.msg, 'success');
                setTimeout(()=>{
                  this.$router.push({path:'/my/myApplication'})
                },1500)
              } else {
                this.$com.showToast(res.msg, 'error')
              }
            })
          } else {
            // console.log('error submit!!');
            this.$com.showToast('请完善表单', 'error')
            return false;
          }
        });

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .score_box {
    width: 1200px;
    margin: 20px auto;
    background-color: #fff;

    .name {
      text-align: center;
      color: #333333;
      font-size: 24px;
      font-weight: bold;
      padding: 50px 0 20px;
    }

    .date {
      text-align: center;
      color: #666666;
      font-size: 14px;
    }

    /deep/ .el-form {
      width: 800px;
      margin: 0 auto;
      padding: 60px 0;

      .el-form-item {
        .el-button {
          width: 300px;
          margin: 0 auto;
          display: block;
        }
      }
    }
  }
</style>

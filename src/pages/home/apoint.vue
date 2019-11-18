<template>
  <div class="score_box">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input
          type="textarea"
          show-word-limit
          maxlength="150"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="formLabelAlign.textarea">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "apoint",
    data() {
      return {
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          textarea: ''
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
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .score_box {
    width: 1200px;
    margin: 20px auto;
    background-color: #fff;

    /deep/ .el-form {
      width: 800px;
      margin: 0 auto;
      padding: 60px 0 ;
      .el-form-item{
        .el-button{
          width: 300px;
          margin: 0 auto;
          display: block;
        }
      }
    }
  }
</style>

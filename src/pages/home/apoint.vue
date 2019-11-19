<template>
  <div class="score_box">
    <div class="name">{{matchinfo.name}}</div>
    <div class="date">{{matchinfo.start_time}} - {{matchinfo.end_time}}</div>
    <el-form label-width="100px" :model="formLabelAlign">
      <el-form-item label="报名人姓名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="战队名称">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input
          type="textarea"
          show-word-limit
          maxlength="150"
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="备注信息"
          resize="none"
          v-model="formLabelAlign.textarea">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
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

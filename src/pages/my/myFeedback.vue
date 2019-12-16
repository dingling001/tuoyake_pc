<template>
  <div class="fbox">
    <div class="iconbox">
      <div class="name">意见反馈</div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="message">
        <el-input
          type="textarea"
          resize="none"
          placeholder="请在这里留下您的宝贵意见"
          show-word-limit
          maxlength="200"
          v-model="ruleForm.message">
        </el-input>
      </el-form-item>
      <el-form-item class="uploadbox" prop="files" ref="files">
        <el-upload class="upload"
                   name="file"
                   :on-preview="handlePictureCardPreview"
                   action=""
                   accept="image/jpeg,image/png,image/gif"
                   :file-list="ruleForm.files"
                   :limit="3"
                   list-type="picture-card"
                   :show-file-list="true"
                   :before-remove="beforeRemove"
                   :on-exceed="handleFileExceed"
                   :on-change="(file,fileList) => handleFileChange(file,fileList)"
                   :on-remove="(file,fileList) => handleFileRemove(file,fileList)" :http-request="handleUpload">
          <i class="el-icon-plus" slot="trigger"></i>
        </el-upload>
      </el-form-item>
      <el-button class="fbtn" @click="feedback_fn">提交评价</el-button>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "myFeedback",
    data() {
      return {
        ruleForm: {
          message: '',
          files: [],
        },
        attaVisible: false,
        rules: {},
        dialogImageUrl: '',
        dialogVisible: false,
        imgs: [],
      }
    },
    methods: {
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleFileChange(file, fileList) {
        this.handleFileOpt(file, fileList);
      },
      handleFileExceed(file, fileList) {
        this.$com.showToast(
          '当前限制选择 3  张图片，请删除后继续上传',
          'warning',
          1000
        )
      },
      handleFileOpt(file, fileList) {
        this.ruleForm.files = fileList;
        if (typeof this.ruleForm.files != "undefined") {
          // this.ruleForm.files.splice(0,1)
          this.imgs.splice(fileList.indexOf(file), 1)
          if (this.ruleForm.files.length > 0) {
            this.$refs.files.clearValidate('files');
          } else {
            this.$refs.files.validate('files');
          }
        }

      },
      handleFileRemove(file, fileList) {
        this.handleFileOpt(file, fileList);
        this.$message({
          message: '刪除成功！',
          type: 'warning',
          during: 2000,
        });
      },
      handleUpload(param) {
        let file = param.file;
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$com.showToast('请上传 png、jpg格式!', 'warning')

          return;
        }
        if (!isLt2M) {
          this.$com.showToast('上传文件大小不能超过 2MB！', 'warning')
          return;
        }
        this._CommonUpload(file)
      },
      _CommonUpload(file) {
        this.$api.CommonUpload(file).then(res => {
          if (res.code == 401) {
            this.$router.push('/login')
            return;
          }
          if (res.code == 1) {
            this.$com.showToast('上传成功！', 'success')
            this.imgs.push(res.data.url);
          }
        })
      },

      // 意见反馈
      feedback_fn() {
        if (this.ruleForm.message == '') {
          this.$com.showtoast('请输入内容')
        } else {
          this.$api.SetFeedback(this.ruleForm.message, this.imgs.toString()).then(res => {
            if (res.code == 1) {
              this.$com.showToast('提交成功', 'success');
              this.$refs['ruleForm'].resetFields()
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .fbox {
    .iconbox {
      line-height: 44px;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;

      .name {
        font-size: 18px;
        color: #333;
        float: left;
      }

      .iconfanhui {
        font-weight: bold;
      }

      .achieve_right {
        float: right;
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }

      .iconcaret-right {
        font-size: 12px;
        /*px*/
      }
    }

    /deep/ .el-textarea {
      width: 748px;
      height: 203px;
      margin: 87px auto 0 auto;
      display: block;

      textarea {
        height: 100%;
      }
    }

    .uploadbox {
      width: 748px;
      margin: 25px auto;

      /deep/ .el-upload {

      }
    }

    .ftips {
      color: #333333;
      padding: 28px 0;
      font-size: 17px;
      /*px*/
      .more {
        color: #AAAAAA;
        font-size: 13px;
        /*px*/
      }
    }

    .fbtn {
      width: 200px;
      margin: 50px auto;
      display: block;
      border-radius: 5px;
      /*line-height: 44px;*/
      text-align: center;
      font-weight: bold;
      font-size: 17px;
      /*px*/
      color: #fff;
      background-color: $baseBlue;

      &:active {
        opacity: .7;
      }
    }
  }
</style>

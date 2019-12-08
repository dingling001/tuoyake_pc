<template>
  <div class="fbox">
    <div class="iconbox">
      <div class="name">意见反馈</div>
    </div>

    <el-input
      type="textarea"
      resize="none"
      placeholder="请在这里留下您的宝贵意见"
      show-word-limit
      maxlength="200"
      v-model="message">
    </el-input>
    <!--<div class="ftips"><span>上传凭证</span><span class="more">（ 图片最多添加3张 ）</span></div>-->
    <div class="uploadbox">

      <el-upload
        action="http://admin.tuoyake.com/api/common/upload"
        multiple
        :limit="3"
        :data="post"
        accept="jpg/png"
        name="file"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div class="fbtn" @click="feedback_fn">提交评价</div>
  </div>
</template>

<script>
  export default {
    name: "myFeedback",
    data() {
      return {
        message: '',
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        post: {
          token: this.$com.getCookies('user_tpc'),
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 意见反馈
      feedback_fn() {
        if (this.message == '') {
          this.$com.showtoast('请输入内容')
        } else {
          console.log(this.fileList)
          var fileList = [];
          for (var i in this.fileList) {
            fileList.push(this.fileList[i].content)
          }
          this.$api.SetFeedback(this.message, fileList.toString()).then(res => {
            if (res.code == 1) {
              this.$com.showtoast('提交成功');
              setTimeout(() => {
                this.$router.go(-1)
              }, 1500)
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
      border-radius: 5px;
      line-height: 44px;
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

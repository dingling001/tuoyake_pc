<template>
  <div class="fbox">
    <div class="iconbox">
      <div class="name">意见反馈</div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="form">
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
      <!--<div class="ftips"><span>上传凭证</span><span class="more">（ 图片最多添加3张 ）</span></div>-->
      <el-form-item class="uploadbox" prop="files" ref="files">

        <!--<el-upload-->
        <!--action="http://admin.tuoyake.com/api/common/upload"-->
        <!--multiple-->
        <!--:limit="3"-->
        <!--:data="post"-->
        <!--accept="jpg/png"-->
        <!--name="file"-->
        <!--list-type="picture-card"-->
        <!--:on-preview="handlePictureCardPreview"-->
        <!--:on-remove="handleRemove">-->
        <!--<i class="el-icon-plus"></i>-->
        <!--</el-upload>-->

        <el-upload class="upload" name="listexcel" action="" accept="jpg/png" :file-list="ruleForm.files" :limit="3"
                   :show-file-list="true" :before-remove="beforeRemove" :on-exceed="handleFileExceed"
                   :on-change="(file,fileList) => handleFileChange(file,fileList,1)"
                   :on-remove="(file,fileList) => handleFileRemove(file,fileList,1)" :http-request="handleUpload">
          <el-button slot="trigger" class="upload__btn">上传表格</el-button>
        </el-upload>
      </el-form-item>
      <el-button class="fbtn" @click="feedback_fn">提交评价</el-button>
    </el-form>
    <el-dialog title="图片预览" :lock-scroll="false" :visible.sync="attaVisible">
      <!--<img src="../../../img/teampw/gonghan.png">-->
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "myFeedback",
    data() {
      return {
        ruleForm: {
          message: '',
          files: [],
        },
        attaVisible: false,
        rules: {}
      }
    },
    methods: {
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },

      handleFileChange(file, fileList, type) {
        this.handleFileOpt(file, fileList, type);
      },
      handleFileExceed(file, fileList) {
        this.$com.showToast(
          '当前限制选择 3  张图片，请删除后继续上传',
          'warning',
          1000
        )
      },
      handleFileOpt(file, fileList, type) {
        //0参观名单,1参观公函
        // let formField = ['files', 'proveAtta'][+type - 1];

        this.ruleForm.files = fileList;
        console.log(fileList)
        //如果文件为空了说明并没有提交文件所以需要显示警告
        // 如果上传了就不显示提示文件警告
        if (typeof this.ruleForm.files != "undefined") {
          if (this.ruleForm.files.length > 0) {
            this.$refs.files.clearValidate('files');
          } else {
            this.$refs.files.validate('files');
          }
        }

      },
      handleFileRemove(file, fileList, type) {
        this.handleFileOpt(file, fileList, type);
        if (+type == 1) {
          this.ruleForm.visitNum = 0;
          this.excelSuccess = false; //隐藏`上传excel数据成功`
          this.excelError = false; //隐藏`上传excel数据错误`
        }
        this.$message({
          message: '文件已删除，请重新上传',
          type: 'warning',
          during: 2000,
        });
      },
      handleUpload(param) {
        let file = param.file;
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
        let extension = testmsg === 'png' || testmsg == 'jpg';
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!extension) {
          this.$message({
            message: '上传文件只能是 png、jpg格式!',
            type: 'warning'
          });
          return;
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 2MB!',
            type: 'warning'
          });
          return;
        }
        return new Promise((resolve, reject) => {
          let formData = new FormData();
          // formData.append('token', this.$con.getCookies('user_tpc'));
          formData.append('file', file);

          axios.post(STATIC_PW_URL + "/api/teamticketorder/listcheck", formData).then(response => {
            let res = response.data;
            if (res.status == 405) {
              this.app.openLogin();
              return;
            }
            if (res.status == 1) {
              // console.log(res)
              this.ruleForm.toi_username = res.data.toi_username;
              this.ruleForm.toi_cardtype = res.data.toi_cardtype;
              this.ruleForm.toi_cardtype_id = res.data.toi_cardtype_id;
              this.ruleForm.toi_card_num = res.data.toi_card_num;
              if (res.data.error_list.length) {
                reject();
                // console.log('未通过')
                this.excelSuccess = false;
                this.excelError = true;
                this.ruleForm.excel_error_list = res.data.error_list;
                this.ruleForm.visitNum = 0;
              } else if (res.data.toi_username.length > 0 && res.data.error_list.length == 0) {
                // console.log('全部通过')
                this.excelSuccess = true;
                this.excelError = false;
                this.ruleForm.excel_error_list = [];
                this.ruleForm.visitNum = Number(res.data.toi_username.length);
                resolve();
              }
            } else {
              this.$message.error(res.msg);
              this.excelSuccess = false;
              this.excelError = false;
              reject();
            }
          }).catch(err => {
            this.excelSuccess = false;
            this.excelError = false;
            reject();
          });
        })
      },
      _CommonUpload() {
        this.$api.CommonUpload().then(res => {

        })
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

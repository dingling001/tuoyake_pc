<template>
  <div class="setbox">
    <div class="score_top">
      <div class="iconbox">
        <div class="name">账户设置</div>
      </div>
    </div>
    <div class="setarea" v-loading="showdata">
      <el-row>
        <el-col :span="4" class="label">头像</el-col>
        <el-col :span="20">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="handleUpload"
          >
            <img v-if="user_info.avatar" :src="user_info.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-button solt>修改</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="label">昵称</el-col>

        <el-col :span="12">{{user_info.nickname}}</el-col>
        <el-col :span="8">
          <el-button @click="changename">修改</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="label">修改手机号</el-col>

        <el-col :span="12">{{user_info.mobile}}</el-col>
        <el-col :span="8">
          <el-button @click="showphone=true">修改</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="label">登录密码</el-col>
        <el-col :span="12">更改密码</el-col>
        <el-col :span="8">
          <el-button @click="showpass=true">修改</el-button>
        </el-col>
      </el-row>
      <el-dialog title="更改密码" :visible.sync="showpass" center>
        <el-form :model="resetForm" ref='resetForm' :rules="resetFormRules">
          <el-form-item label="新密码" label-width="120px" prop="newpwd">
            <el-input v-model="resetForm.newpwd" autocomplete="off" type="password" maxlength="12"
                      minlength="6"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" label-width="120px" prop="renewpwd">
            <el-input v-model="resetForm.renewpwd" autocomplete="off" type="password" maxlength="12"
                      minlength="6"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showpass = false">取 消</el-button>
          <el-button type="primary" @click="go_changepass">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改手机号" :visible.sync="showphone" center>
        <el-form class="loginform" ref="form" :model="ruleForm" label-width="120px">
          <el-form-item prop="mobile" label="原手机号" required>
            <el-input v-model="user_info.mobile" @input="accountinput" disabled readonly clearable autocomplete="off"
                      maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="新手机号" required>
            <el-input v-model="ruleForm.newmobile" @input="accountinputnew" placeholder="新手机号" clearable
                      autocomplete="off"
                      maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="captcha" label="验证码" required>
            <el-input v-model="ruleForm.captcha" @input="captchainput" placeholder="请输入验证码" maxlength="4"
                      style="width: 70%" autocomplete="off"></el-input>
            <el-button icon="el-icon-mobile-phone" @click="_SmsSend" style="width: 28%" type="success"
                       :disabled="disabled=!show">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}} s</span>
            </el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showphone=false">取 消</el-button>
          <el-button type="primary" @click="gonext">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  const TIME_COUNT = 60; //更改倒计时时间

  export default {
    name: "myset",
    data() {
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'));
        } else if (value.toString().length < 6 || value.toString().length > 12) {
          callback(new Error('密码长度为6 - 12个字符'))
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetForm.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        showdata: true,
        showpass: false,
        showphone: false,
        user_info: {},
        showname: false,
        avatar: '',
        name: '',
        user_tpc: '',
        resetForm: {
          newpwd: '',
          renewpwd: '',
        },
        resetFormRules: {
          newpwd: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          renewpwd: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ]
        },
        ruleForm: {
          mobile: '',
          captcha: '',
          newmobile: ''
        },
        show: true,
        count: '',
        timer: null,
      }
    },
    inject: ['app'],
    mounted() {
      this.user_tpc = this.$com.getCookies('user_tpc');
      this._GetUserInfo();
    },
    methods: {
      // 获取个人信息
      _GetUserInfo() {
        this.$api.GetUserInfo().then(res => {
          // console.log(res)
          this.showdata = false;
          if (res.code == 1) {
            this.user_info = res.data;
            this.user_info.mobile = this.user_info.mobile.substr(0, 3) + '****' + this.user_info.mobile.substr(7)
          }
        })
      },
      // 修改个人信息
      _Profile() {
        this.$api.Profile(this.avatar || this.user_info.avatar, this.name || this.user_info.nickname).then(res => {
          if (res.code == 1) {
            this.$com.showToast('修改成功', 'success')
          } else {
            this.$com.showToast(res.msg || '稍后在试')
          }
          this._GetUserInfo()
          this.app._GetUserInfo();
        })
      },
      // 修改昵称
      changename() {
        this.$prompt('请输入昵称', '修改昵称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          inputValidator: (value) => {
            if (!value || value.trim().length < 1) {
              return '昵称不能为空'
            } else if (!(/^[\w\u4e00-\u9fa5]{1,6}$/.test(value))) {
              return '昵称格式不正确'
            } else {
              this.name = value;
            }
          },
          inputPlaceholder: this.user_info.nickname,
        }).then(() => {
          this._Profile();
        })
      },

      handleAvatarSuccess(res, file) {
        this.user_info.avatar = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$com.showToast('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$com.showToast('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleUpload(file) {
        this.$api.CommonUpload(file.file).then(res => {
          if (res.code == 1) {
            // this.$com.showToast('修改成功！', 'success');
            this.user_info.avatar = res.data.url;
            this._Profile();
          }
        })
      },
      go_changepass() {
        this.$refs.resetForm.validate((valid) => {
          if (valid) {
            this.$api.ResetPassword(
              this.resetForm.newpwd,
              this.resetForm.renewpwd
            ).then(res => {
              if (res.code == 1) {
                this.$com.showToast('修改成功', 'success')
                this.showpass = false
              } else {
                this.$com.showToast(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      // 获取验证码
      _SmsSend() {
        if (!this.$com.checkPhone(this.ruleForm.newmobile)) {
          this.$com.showToast('请输入正确的手机号')
        } else {
          this.$api.SmsSend(this.ruleForm.newmobile, 'changemobile').then((res) => {
            this.showbtn = false;
            if (res.code == 1) {
              this.send();
              this.$com.showToast(res.msg, 'success');
              this.ruleForm.captcha = res.data
            } else {
              this.$com.showToast(res.msg);
            }
          })
        }
      },
      // 倒计时
      send() {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);  // 清除定时器
              this.timer = null;
            }
          }, 1000)
        }
      },
      // 修改手机号
      gonext() {
        if (this.captcha == '') {
          this.$com.showToast('请输入验证码')
        } else if (this.ruleForm.newmobile == '') {
          this.$com.showToast('请输入手机号')
        } else {
          this.$api.ChangeMobile(this.ruleForm.newmobile, this.ruleForm.captcha).then((res) => {
            if (res.code == 1) {
              this.$com.showToast('修改成功', 'success');
              this._GetUserInfo();
              this.showphone = false;
            } else {
              this.$com.showToast(res.msg || '稍后再试')
            }
          })
        }
        // this.$router.push({path: '/regnext', query: {}})
      },
      accountinput() {
        this.ruleForm.mobile = this.ruleForm.mobile.replace(/[^\d]/g, '');
      },
      accountinputnew() {
        this.ruleForm.newmobile = this.ruleForm.newmobile.replace(/[^\d]/g, '');
      },
      captchainput() {
        this.ruleForm.captcha = this.ruleForm.captcha.replace(/[^\d]/g, '');
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .setbox {
    .score_top {
      /*background-image: url("../../assets/img/wdbm.png");*/
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      /*padding: 0 0 50px 0;*/

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
          line-height: 47px;

          &:hover {
            color: $baseRed;
          }

          span {
            line-height: 47px;
            display: inline-block;

            &.iconfont {
              font-size: 15px;
            }
          }
        }

      }


    }

    .setarea {
      padding: 0 25px;

      /deep/
      .avatar-uploader .el-upload {
        display: block;
        text-align: left;
        padding: 0 20px;

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }

        .avatar {
          width: 40px;
          height: 40px;
          display: inline-block;
          margin-right: 54%;
        }
      }


      /deep/ .el-row {
        border-bottom: 1px solid #eee;
        padding: 30px 0;
        line-height: 40px;

        .label {
          text-align: right;
          padding: 0 10px;
          border-right: 1px solid #ececec;
          font-size: 16px;
          color: #333333;
        }

        .el-col-12 {
          padding: 0 20px;
          font-size: 12px;
          color: #666666;
        }
      }

      /deep/ .el-dialog {

      }
    }


  }

</style>

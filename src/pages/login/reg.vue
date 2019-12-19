<template>
  <div class="login_box">
    <div class="login_head" @click="$router.push('/')">
      <img src="../../img/index/logo_login.png" alt="">
    </div>
    <el-form class="loginform" ref="form" :model="ruleForm" :rules="rules">
      <div class="logintitle">
        <div class="account">注册</div>
        <div class="phone_box" @click="backlogin">已有账号？<span class="login">登录<span
          class="iconfont iconxiangyou1"></span></span></div>
      </div>
      <el-form-item prop="mobile">
        <el-input v-model="ruleForm.mobile" @input="accountinput" placeholder="手机号" clearable maxlength="11" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="ruleForm.captcha" @input="captchainput" placeholder="请输入验证码" style="width: 70%" autocomplete="off" maxlength="4"
                  clearable></el-input>
        <el-button icon="el-icon-mobile-phone" @click="_SmsSend" style="width: 28%" type="text"
                   :disabled="disabled=!show">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input v-model="ruleForm.password" placeholder="新密码" type="password" maxlength="12" clearable
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input v-model="ruleForm.repassword" placeholder="重复新密码" type="password" maxlength="12" clearable
                  autocomplete="off"></el-input>
      </el-form-item>
      <div class="login_btn" @click="gonext">同意以下协议并注册</div>
      <div class="login_pass" @click="goAgree">用户协议</div>
    </el-form>
  </div>
</template>

<script>
  const TIME_COUNT = 60; //更改倒计时时间
  import {hideLoading, showLoading} from '../../components/loading';

  export default {
    name: "reg",
    data() {
      return {
        ruleForm: {
          mobile: '',
          captcha: '',
          password: '',
          repassword: '',
        },
        rules: {},
        show: true,
        count: '',
        timer: null,
        layerMask: 0,
        text_tip: ''
      }
    },
    created() {
      this._user_agreement();
    },
    methods: {
      // 获取验证码
      _SmsSend() {
        if (!this.$com.checkPhone(this.ruleForm.mobile)) {
          this.$com.showToast('请输入正确的手机号')
        } else {
          this.$api.SmsSend(this.ruleForm.mobile, 'register').then((res) => {
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
      _user_agreement() {
        this.$api.getConfig().then(res => {
          if(res.code==1){
            this.text_tip = res.data.user_agreement;
          }
          // console.log(this.text_tip)
        })
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
      // 下一步
      gonext() {
        // this.$router.push({path: '/regnext', query: {}})
        if (this.ruleForm.mobile == '') {
          this.$com.showToast('请输入手机号')
        } else if (this.captcha == '') {
          this.$com.showToast('请输入验证码')
        } else if (this.ruleForm.password == '') {
          this.$com.showToast('请输入密码')
        } else if (this.ruleForm.repassword == '') {
          this.$com.showToast('请输入重复密码')
        } else if (this.ruleForm.password.length < 6 || this.ruleForm.password.length > 12) {
          this.$com.showToast('密码长度介于6～12位之间')
        } else if (this.ruleForm.password != this.ruleForm.repassword) {
          this.$com.showToast('两次密码不一致')
        } else {
          this.$api.Register(this.ruleForm.mobile, this.ruleForm.captcha, this.ruleForm.password, this.ruleForm.repassword).then((res) => {
            // console.log(res)
            if (res.code == 1) {
              this.$com.showToast('注册成功,正在为您自动登录...', 'success');
              this.$com.setCookie('user_tpc', res.data.userinfo.token);
              // showLoading('正在为您自动登录');
              setTimeout(() => {
                this.$router.push('/')
              }, 2000)
              // this.$com.getCookies('user_tpc'), = res.data.userinfo.token;
              // this.$com.showToast('登录成功', 'success');
              // let redirect = decodeURIComponent(this.$route.query.redirect || "/");
              // this.$router.push(redirect);
            } else {
              this.$com.showToast(res.msg || '稍后再试')
            }
          })
        }
      },
      backlogin() {
        this.$router.push('/login')
      },
      goAgree() {
        this.$alert(this.text_tip, '', {
          confirmButtonText: '知道了',
          // center: true,
          dangerouslyUseHTMLString: true,
          callback: action => {

          }
        });
      },
      accountinput() {
        this.ruleForm.mobile = this.ruleForm.mobile.replace(/[^\d]/g, '');
      },
      captchainput(){
        this.ruleForm.captcha = this.ruleForm.captcha.replace(/[^\d]/g, '');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .login_box {
    height: 100vh;
    background: url("../../img/index/login_bg.jpg") no-repeat 100% 100%;

    .login_head {
      width: 207px;
      height: 64px;
      margin: 0 auto;
      padding: 130px 0 49px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    /deep/ .loginform {
      margin: 0 auto;
      width: 474px;
      /*height: 408px;*/
      background: #fff;
      box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.15);
      padding: 40px 40px 0 40px;

      .logintitle {
        overflow: hidden;
        padding-bottom: 16px;
        line-height: 20px;

        .account {
          font-size: 20px;
          float: left;
          color: #333333;
        }

        .phone_box {
          float: right;
          /*color: #666666;*/
          font-size: 14px;
          line-height: 18px;
          cursor: pointer;
          color: #AAAAAA;

          /*   &:hover {
               color: $baseRed;
             }
   */
          .iconfont {
            margin-right: 6px;
            font-size: 13px;
          }

          .login {
            color: $baseBlue;
          }
        }
      }

      .el-form-item {
        background-color: #F7F7F7;

        .el-input {
          input {
            line-height: 54px;
            height: 54px;
            background-color: #F7F7F7;

          }
        }

        .el-button {
          height: 54px;
          padding: 0;
        }
      }

      .login_btn {
        margin: 51px auto 0 auto;
        text-align: center;
        background-color: $baseBlue;
        color: #fff;
        font-size: 17px;
        font-weight: bold;
        border-radius: 5px;
        padding: 14px 0;
        cursor: pointer;

        &:active {
          opacity: .9;
        }
      }

      .login_pass {
        text-align: center;
        font-size: 15px;
        /*px*/
        color: $baseBlue;
        padding: 29px 0;
        cursor: pointer;

        &:hover {
          /*color: $baseRed;*/
        }
      }
    }

    .notice {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 70px;
      background-color: #fff;
      border-radius: 6px;
      z-index: 1202;

      .title {
        font-size: 18px;
        font-weight: 400;
        color: #000000;
        line-height: 36px;
      }

      .content {
        width: 700px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 36px;
        padding: 20px;
        min-height: 300px;
        white-space: pre-line;
      }

      .checkbox {
        height: 20px;
        line-height: 20px;

        label {
          float: left;
        }

      }
    }
  }
</style>

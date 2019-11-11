<template>
  <div class="login_box">
    <div class="login_head" @click="$router.go(-1)">
      <img src="../../img/index/index_logo.png" alt="">
    </div>
    <el-form class="loginform" ref="form" :model="ruleForm">
      <div class="logintitle">
        <div class="account">注册</div>
        <div class="phone_box" @click="backlogin">已有账号？<span class="login">登录<span
          class="iconfont iconxiangyou1"></span></span></div>
      </div>
      <el-form-item prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" style="width: 70%"></el-input>
        <el-button icon="el-icon-mobile-phone" @click="_SmsSend" style="width: 28%" type="text"
                   :disabled="disabled=!show">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input v-model="ruleForm.password" placeholder="新密码" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input v-model="ruleForm.repassword" placeholder="重复新密码" type="password" clearable></el-input>
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
        show: true,
        count: '',
        timer: null,
      }
    },
    created() {
    },
    methods: {
      // 获取验证码
      _SmsSend() {
        if (!this.$com.checkPhone(this.ruleForm.mobile)) {
          this.$com.showToast('请输入正确的手机号')
        } else {
          this.$api.SmsSend(this.ruleForm.mobile, 'register').then((res) => {
            this.showbtn = false;
            console.log(res)
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
          this.$com.showToast('请输入重复码')
        } else if (this.ruleForm.password != this.ruleForm.repassword) {
          this.$com.showToast('两次密码不一致')
        } else {
          this.$api.Register(this.ruleForm.mobile, this.ruleForm.captcha, this.ruleForm.password, this.ruleForm.repassword).then((res) => {
            // console.log(res)
            if (res.code == 1) {
              this.$com.showToast('注册成功,正在为您自动登录', 'success');
              localStorage.user_tpc = res.data.userinfo.token;
              // showLoading('正在为您自动登录');
              setTimeout(() => {
                this.$router.push('/home')
              }, 2000)
              // localStorage.user_tpc = res.data.userinfo.token;
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
      width: 88px;
      height: 83px;
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

  }
</style>

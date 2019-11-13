<template>
  <div class="login_box">
    <div class="login_head" @click="$router.push('/')">
      <img src="../../img/index/index_logo.png" alt="">
    </div>
    <el-form class="loginform" ref="form" :model="ruleForm">
      <div class="logintitle">
        <div class="account">验证码登录</div>
        <!--<div class="phone_box" @click="gocode"><span class="iconfont iconyouxiang"></span><span>密码登录</span></div>-->
      </div>
      <el-form-item prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" style="width: 70%"></el-input>
        <el-button icon="el-icon-mobile-phone" @click="_SmsSend" style="width: 28%" type="success"
                   :disabled="disabled=!show">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
      </el-form-item>
      <div class="login_btn" @click="gonext">登录</div>
      <div @click="backlogin" class="login_pass">密码登录</div>
    </el-form>
  </div>
</template>

<script>
  const TIME_COUNT = 60; //更改倒计时时间
  export default {
    name: "reg",

    data() {
      return {
        ruleForm: {
          mobile: '',
          captcha: '',
        },

        show: true,
        count: '',
        timer: null,
        redirect: '/',
      }
    },
    created() {
      if (localStorage.user_tpc) {
        this.$router.replace('/')
      }
      this.redirect = this.$route.query.redirect
    },
    methods: {
      // 验证码登录
      gocode() {
        this.$router.push({path: '/logincode', query: {redirect: this.$route.query.redirect || '/'}})
      },
      // 获取验证码
      _SmsSend() {
        if (!this.$com.checkPhone(this.ruleForm.mobile)) {
          this.$com.showToast('请输入正确的手机号')
        } else {
          this.$api.SmsSend(this.ruleForm.mobile, 'login').then((res) => {
            this.showbtn = false;
            console.log(res)
            if (res.code == 1) {
              this.send();
              this.$com.showToast(res.msg, 'success');
              this.ruleForm.captcha = res.data
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
      backlogin() {
        this.$router.go(-1)
      },
      // 登录
      gonext() {
        if (this.ruleForm.mobile == '') {
          this.$com.showToast('请输入手机号')
        } else if (this.captcha == '') {
          this.$com.showToast('请输入验证码')
        } else {
          this.$api.MobileLogin(this.ruleForm.mobile, this.ruleForm.captcha).then((res) => {
            // console.log(res)
            if (res.code == 1) {
              localStorage.user_tpc = res.data.userinfo.token;
              this.$com.showToast('登录成功', 'success');
              let redirect = decodeURIComponent(this.$route.query.redirect || "/");
              this.$router.push(redirect);
            } else {
              this.$com.showToast(res.msg || '稍后再试')
            }
          })
        }
        // this.$router.push({path: '/regnext', query: {}})
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
      height: 408px;
      background: #fff;
      box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.15);
      padding: 40px;

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
          color: #666666;
          font-size: 14px;
          line-height: 18px;
          cursor: pointer;

          &:hover {
            color: $baseRed;
          }

          .iconfont {
            margin-right: 6px;
            color: #AAAAAA;
            font-size: 13px;
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
        width: 300px;
        margin: 51px auto 0 auto;
        text-align: center;
        background-color: $baseBlue;
        color: #fff;
        font-size: 17px;
        /*px*/
        font-weight: bold;
        border-radius: 5px;
        padding: 14px 0;

        &:active {
          opacity: .9;
        }
      }

      .login_pass {
        text-align: center;
        font-size: 15px;
        /*px*/
        padding: 29px 0;
        cursor: pointer;
        color: $baseBlue;
      }
    }

  }
</style>

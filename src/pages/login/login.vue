<template>
  <div class="login_box">
    <div class="login_head" @click="$router.push('/')">
      <img src="../../img/index/logo_login.png" alt="">
    </div>
    <el-form class="loginform" :model="ruleForm" ref="ruleForm">
      <div class="logintitle">
        <div class="account">账号登录</div>
        <div class="phone_box" @click="gocode"><span class="iconfont iconyouxiang"></span><span>手机验证码登录</span></div>
      </div>
      <el-form-item prop="account">
        <el-input v-model.trim="ruleForm.account" placeholder="请输入手机号" clearable maxlength="11"
                  autocomplete="off" @input="accountinput"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" clearable
                  autocomplete="off" maxlength="12" minlength="6" @keyup.enter.native="loginpass"></el-input>
      </el-form-item>
      <div class="btns">
        <router-link tag="span" to="/forgotpass">忘记密码?</router-link>
      </div>
      <!--<div  :loading="loginstatus"></div>-->
      <el-button type="primary" class="login_btn" @click.stop="loginpass"  :loading="loginstatus">登录</el-button>
      <div class="tips">
        <router-link class="reg" to="/reg" tag="span">免费注册</router-link>
        <span class="iconfont iconjiantou"></span>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        ruleForm: {
          account: '',
          password: '',
        },
        loginstatus: false
      }
    },
    created() {
      if (this.$com.getCookies('user_tpc')) {
        this.$router.replace('/')
      }
    },
    methods: {
      // 登录
      loginpass() {
        if (!this.$com.checkPhone(this.ruleForm.account)) {
          this.$com.showToast('请输入正确的手机号')
        } else if (this.ruleForm.password == '') {
          this.$com.showToast('请输入密码')
        } else {
          this.loginstatus = true;
          this.$api.Login(this.ruleForm.account, this.ruleForm.password).then((res) => {
            // console.log(res)
            this.loginstatus = false;
            if (res.code == 1) {
              this.$com.showToast('登录成功', 'success');
              this.$com.setCookie('user_tpc', res.data.userinfo.token);
              setTimeout(() => {
                // this.$router.go(-1)
                let redirect = decodeURIComponent(this.$route.query.redirect || "/");
                this.$router.push(redirect);
              }, 2000)
            } else {
              this.$com.showToast(res.msg)
            }
          })
        }
      },
      // 验证码登录
      gocode() {
        this.$router.push({path: '/logincode', query: {redirect: this.$route.query.redirect || '/my'}})
      },
      accountinput() {
        this.ruleForm.account = this.ruleForm.account.replace(/[^\d]/g, '');
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
      width: 474px;
      height: 408px;
      background: #fff;
      box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.15);
      margin: 0 auto;
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

      }

      .btns {
        padding: 0 0 20px 0;
        cursor: pointer;
        overflow: hidden;

        &:hover span {
          color: $baseRed;
        }

        span {
          float: right;
          color: #6285CC;
          font-size: 14px;
        }

      }

      .login_btn {
        width: 300px;
        margin: 30px auto;
        text-align: center;
        background-color: $baseBlue;
        color: #fff;
        font-size: 17px;
        /*px*/
        font-weight: bold;
        border-radius: 5px;
        padding: 14px 0;
        cursor: pointer;
        display: block;

        &:active {
          opacity: .9;
        }
      }

      .tips {
        text-align: center;
        font-size: 14px;
        cursor: pointer;

        &:hover .reg {
          color: $baseRed
        }

        &:hover .iconjiantou {
          color: $baseRed
        }

        .reg {
          color: #6285CC;
        }

        .iconjiantou {
          color: #6285CC;
          font-size: 12px;
        }
      }
    }

  }
</style>

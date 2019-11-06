<template>
  <div class="login_box">
    <div class="login_head" @click="$router.go(-1)">
      <img src="../../img/index/index_logo.png" alt="">
    </div>
    <el-form class="loginform" :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="logintitle">
        <div class="account">账号登录</div>
        <div class="phone_box" @click="gocode"><span class="iconfont iconyouxiang"></span><span>手机验证码登录</span></div>
      </div>
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" clearable autocomplete></el-input>
      </el-form-item>
      <div class="btns">
        <router-link tag="span" to="/forgotpass">忘记密码?</router-link>
      </div>
      <div class="login_btn" @click="loginpass">登录</div>
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
        rules: {}
      }
    },
    created() {
      if (localStorage.user_tpc) {
        this.$router.replace('/')
      }
    },
    methods: {
      // 登录
      loginpass() {
        console.log(this.$com.checkPhone(this.account))
        if (!this.$com.checkPhone(this.account)) {
          this.$com.showToast('请输入正确的手机号')
        } else if (this.password == '') {
          this.$com.showToast('请输入密码')
        } else {
          this.$api.Login(this.account, this.password).then((res) => {
            console.log(res)
            if (res.code == 1) {
              this.$com.showToast('登录成功');
              localStorage.setItem('user_tpc', res.data.token);
              setTimeout(() => {
                // this.$router.go(-1)
                let redirect = decodeURIComponent(this.$route.query.redirect);
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

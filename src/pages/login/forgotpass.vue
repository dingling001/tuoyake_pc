<template>
  <div class="login_box">
    <div class="login_head" @click="$router.push('/')">
      <img src="../../img/index/index_logo.png" alt="">
    </div>
    <el-form class="loginform" ref="form" :model="ruleForm">
      <div class="logintitle">
        <div class="account">忘记密码</div>
        <!--<div class="phone_box" @click="gocode"><span class="iconfont iconyouxiang"></span><span>密码登录</span></div>-->
      </div>
      <el-form-item prop="mobile">
        <el-input v-model.number="ruleForm.mobile" placeholder="手机号" clearable maxlength="11"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" style="width: 70%" type="number"
                  autocomplete="off"></el-input>
        <el-button icon="el-icon-mobile-phone" @click="_SmsSend" style="width: 28%" type="success"
                   :disabled="disabled=!show">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input v-model="ruleForm.newpassword" placeholder="新密码" type="password" clearable autocomplete="off"
                  minlength="6" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input v-model="ruleForm.repassword" placeholder="重复新密码" type="password" clearable autocomplete="off"
                  minlength="6" maxlength="12"></el-input>
      </el-form-item>
      <!--<van-field v-model="mobile" placeholder="手机号" type="number" clearable/>-->
      <!--<van-field v-model="captcha" placeholder="短信验证码" type="text" center clearable>-->
      <!--<van-button slot="button" type="default" class="code" size="small" @click="_SmsSend" v-if="showbtn">-->
      <!--获取验证码-->
      <!--</van-button>-->
      <!--&lt;!&ndash;                <van-count-down :time="time" v-else />&ndash;&gt;-->
      <!--<span class="" slot="button" v-else>-->
      <!--<span>重新获取</span>-->
      <!--<van-count-down :time="time" format="ss" ref="countDown" :auto-start="atuostart"-->
      <!--@finish="endtime"/>-->
      <!--<span>S</span>-->
      <!--</span>-->
      <!--</van-field>-->
      <el-button class="login_btn" @click="gonext" :loading="repassstatus">重置密码</el-button>
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
          newpassword: '',
          repassword: '',
          captcha: ''
        },
        show: true,
        count: '',
        timer: null,
        repassstatus:false
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
          this.$api.SmsSend(this.ruleForm.mobile, 'resetpwd').then((res) => {
            this.showbtn = false;
            console.log(res)
            if (res.code == 1) {
              this.send();
              this.$com.showToast(res.msg, 'success');
              this.ruleForm.captcha = res.data
            } else {
              this.$com.showToast(res.msg)

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
        if (!this.$com.checkPhone(this.ruleForm.mobile)) {
          this.$com.showToast('请输入正确的手机号')
        } else if (this.ruleForm.captcha == '') {
          this.$com.showToast('请输入验证码')
        } else if (this.ruleForm.newpassword == '') {
          this.$com.showToast('密码不能为空')
        } else if (this.ruleForm.repassword == '') {
          this.$com.showToast('重复密码不能为空')
        } else if (this.ruleForm.newpassword.length < 6 || this.ruleForm.newpassword.length > 12) {
          this.$com.showToast('密码长度介于6～12位之间')
        } else if (this.ruleForm.newpassword !== this.ruleForm.repassword) {
          this.$com.showToast('两次密码不一致')
        } else {
          this.repassstatus=true;
          this.$api.ResetPwd(this.ruleForm.mobile, this.ruleForm.captcha, this.ruleForm.newpassword, this.ruleForm.newpassword).then(res => {
            this.repassstatus=false;
            if (res.code == 1) {
              this.$com.showToast(res.msg, 'success');
              this.backlogin()
            } else {
              this.$com.showToast(res.msg)

            }
          })
        }

        // this.$router.push({path: '/resetpass', query: {}})
      },
      // 密码登录
      backlogin() {
        this.$router.go(-1)
      },
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
        font-weight: bold;
        border-radius: 5px;
        padding: 14px 0;
        cursor: pointer;
        display: block;

        &:active {
          opacity: .9;
        }
      }

      .login_pass {
        text-align: center;
        font-size: 15px;
        color: #666666;
        padding: 20px 0 0 0;
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }
    }

  }
</style>

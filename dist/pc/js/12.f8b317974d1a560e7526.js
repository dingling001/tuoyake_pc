webpackJsonp([12],{"8Tp1":function(s,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});e("VU/8")(null,null,!1,null,null,null).exports;var t={name:"reg",data:function(){return{ruleForm:{mobile:"",captcha:"",password:"",repassword:""},show:!0,count:"",timer:null}},created:function(){},methods:{_SmsSend:function(){var s=this;this.$com.checkPhone(this.ruleForm.mobile)?this.$api.SmsSend(this.ruleForm.mobile,"register").then(function(o){s.showbtn=!1,console.log(o),1==o.code?(s.send(),s.$com.showToast(o.msg,"success"),s.ruleForm.captcha=o.data):s.$com.showToast(o.msg)}):this.$com.showToast("请输入正确的手机号")},send:function(){var s=this;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){s.count>0&&s.count<=60?s.count--:(s.show=!0,clearInterval(s.timer),s.timer=null)},1e3))},gonext:function(){var s=this;""==this.ruleForm.mobile?this.$com.showToast("请输入手机号"):""==this.captcha?this.$com.showToast("请输入验证码"):""==this.ruleForm.password?this.$com.showToast("请输入密码"):""==this.ruleForm.repassword?this.$com.showToast("请输入重复码"):this.ruleForm.password!=this.ruleForm.repassword?this.$com.showToast("两次密码不一致"):this.$api.Register(this.ruleForm.mobile,this.ruleForm.captcha,this.ruleForm.password,this.ruleForm.repassword).then(function(o){1==o.code?(s.$com.showToast("注册成功,正在为您自动登录","success"),localStorage.user_tpc=o.data.userinfo.token,setTimeout(function(){s.$router.push("/home")},2e3)):s.$com.showToast(o.msg||"稍后再试")})},backlogin:function(){this.$router.push("/login")},goAgree:function(){}}},r={render:function(){var s=this,o=s.$createElement,t=s._self._c||o;return t("div",{staticClass:"login_box"},[t("div",{staticClass:"login_head",on:{click:function(o){return s.$router.push("/")}}},[t("img",{attrs:{src:e("Z7O8"),alt:""}})]),s._v(" "),t("el-form",{ref:"form",staticClass:"loginform",attrs:{model:s.ruleForm}},[t("div",{staticClass:"logintitle"},[t("div",{staticClass:"account"},[s._v("注册")]),s._v(" "),t("div",{staticClass:"phone_box",on:{click:s.backlogin}},[s._v("已有账号？"),t("span",{staticClass:"login"},[s._v("登录"),t("span",{staticClass:"iconfont iconxiangyou1"})])])]),s._v(" "),t("el-form-item",{attrs:{prop:"mobile"}},[t("el-input",{attrs:{placeholder:"手机号",clearable:""},model:{value:s.ruleForm.mobile,callback:function(o){s.$set(s.ruleForm,"mobile",o)},expression:"ruleForm.mobile"}})],1),s._v(" "),t("el-form-item",{attrs:{prop:"captcha"}},[t("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入验证码"},model:{value:s.ruleForm.captcha,callback:function(o){s.$set(s.ruleForm,"captcha",o)},expression:"ruleForm.captcha"}}),s._v(" "),t("el-button",{staticStyle:{width:"28%"},attrs:{icon:"el-icon-mobile-phone",type:"text",disabled:s.disabled=!s.show},on:{click:s._SmsSend}},[t("span",{directives:[{name:"show",rawName:"v-show",value:s.show,expression:"show"}]},[s._v("获取验证码")]),s._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:!s.show,expression:"!show"}],staticClass:"count"},[s._v(s._s(s.count)+" s")])])],1),s._v(" "),t("el-form-item",{attrs:{prop:"newpassword"}},[t("el-input",{attrs:{placeholder:"新密码",type:"password",clearable:""},model:{value:s.ruleForm.password,callback:function(o){s.$set(s.ruleForm,"password",o)},expression:"ruleForm.password"}})],1),s._v(" "),t("el-form-item",{attrs:{prop:"repassword"}},[t("el-input",{attrs:{placeholder:"重复新密码",type:"password",clearable:""},model:{value:s.ruleForm.repassword,callback:function(o){s.$set(s.ruleForm,"repassword",o)},expression:"ruleForm.repassword"}})],1),s._v(" "),t("div",{staticClass:"login_btn",on:{click:s.gonext}},[s._v("同意以下协议并注册")]),s._v(" "),t("div",{staticClass:"login_pass",on:{click:s.goAgree}},[s._v("用户协议")])],1)],1)},staticRenderFns:[]};var a=e("VU/8")(t,r,!1,function(s){e("xKmo")},"data-v-8eb12a8e",null);o.default=a.exports},xKmo:function(s,o){}});
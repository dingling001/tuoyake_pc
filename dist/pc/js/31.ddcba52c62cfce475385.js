webpackJsonp([31],{"2MHE":function(e,s,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t={name:"reg",data:function(){return{ruleForm:{mobile:"",newpassword:"",repassword:"",captcha:""},show:!0,count:"",timer:null}},created:function(){},methods:{_SmsSend:function(){var e=this;this.$com.checkPhone(this.ruleForm.mobile)?this.$api.SmsSend(this.ruleForm.mobile,"resetpwd").then(function(s){e.showbtn=!1,console.log(s),1==s.code&&(e.send(),e.$com.showToast(s.msg,"success"),e.ruleForm.captcha=s.data)}):this.$com.showToast("请输入正确的手机号")},send:function(){var e=this;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=60?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)},1e3))},gonext:function(){var e=this;this.$com.checkPhone(this.ruleForm.mobile)?""==this.ruleForm.captcha?this.$com.showToast("请输入验证码"):""==this.ruleForm.newpassword?this.$com.showToast("密码不能为空"):""==this.ruleForm.repassword?this.$com.showToast("重复密码不能为空"):this.ruleForm.newpassword!==this.ruleForm.repassword?this.$com.showToast("两次密码不一致"):this.$api.ResetPwd(this.ruleForm.mobile,this.ruleForm.captcha,this.ruleForm.newpassword,this.ruleForm.newpassword).then(function(s){1==s.code?(e.$com.showToast(s.msg,"success"),e.backlogin()):e.$com.showToast(s.msg)}):this.$com.showToast("请输入正确的手机号")},backlogin:function(){this.$router.go(-1)}}},r={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login_box"},[t("div",{staticClass:"login_head",on:{click:function(s){return e.$router.push("/")}}},[t("img",{attrs:{src:o("Z7O8"),alt:""}})]),e._v(" "),t("el-form",{ref:"form",staticClass:"loginform",attrs:{model:e.ruleForm}},[t("div",{staticClass:"logintitle"},[t("div",{staticClass:"account"},[e._v("忘记密码")])]),e._v(" "),t("el-form-item",{attrs:{prop:"mobile"}},[t("el-input",{attrs:{placeholder:"手机号",type:"number",clearable:""},model:{value:e.ruleForm.mobile,callback:function(s){e.$set(e.ruleForm,"mobile",s)},expression:"ruleForm.mobile"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"captcha"}},[t("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入验证码",type:"number"},model:{value:e.ruleForm.captcha,callback:function(s){e.$set(e.ruleForm,"captcha",s)},expression:"ruleForm.captcha"}}),e._v(" "),t("el-button",{staticStyle:{width:"28%"},attrs:{icon:"el-icon-mobile-phone",type:"success",disabled:e.disabled=!e.show},on:{click:e._SmsSend}},[t("span",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}]},[e._v("获取验证码")]),e._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],staticClass:"count"},[e._v(e._s(e.count)+" s")])])],1),e._v(" "),t("el-form-item",{attrs:{prop:"newpassword"}},[t("el-input",{attrs:{placeholder:"新密码",type:"password",clearable:""},model:{value:e.ruleForm.newpassword,callback:function(s){e.$set(e.ruleForm,"newpassword",s)},expression:"ruleForm.newpassword"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"repassword"}},[t("el-input",{attrs:{placeholder:"重复新密码",type:"password",clearable:""},model:{value:e.ruleForm.repassword,callback:function(s){e.$set(e.ruleForm,"repassword",s)},expression:"ruleForm.repassword"}})],1),e._v(" "),t("div",{staticClass:"login_btn",on:{click:e.gonext}},[e._v("重置密码")]),e._v(" "),t("div",{staticClass:"login_pass",on:{click:e.backlogin}},[e._v("密码登录")])],1)],1)},staticRenderFns:[]};var a=o("VU/8")(t,r,!1,function(e){o("MtGu")},"data-v-2ea59ab8",null);s.default=a.exports},MtGu:function(e,s){}});
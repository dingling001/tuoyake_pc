webpackJsonp([30],{hY8P:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"reg",data:function(){return{ruleForm:{mobile:"",captcha:""},show:!0,count:"",timer:null,redirect:"/"}},created:function(){this.$com.getCookies("user_tpc")&&this.$router.replace("/"),this.redirect=this.$route.query.redirect},methods:{gocode:function(){this.$router.push({path:"/logincode",query:{redirect:this.$route.query.redirect||"/"}})},_SmsSend:function(){var t=this;this.$com.checkPhone(this.ruleForm.mobile)?this.$api.SmsSend(this.ruleForm.mobile,"login").then(function(e){t.showbtn=!1,console.log(e),1==e.code&&(t.send(),t.$com.showToast(e.msg,"success"),t.ruleForm.captcha=e.data)}):this.$com.showToast("请输入正确的手机号")},send:function(){var t=this;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){t.count>0&&t.count<=60?t.count--:(t.show=!0,clearInterval(t.timer),t.timer=null)},1e3))},backlogin:function(){this.$router.go(-1)},gonext:function(){var t=this;""==this.ruleForm.mobile?this.$com.showToast("请输入手机号"):""==this.captcha?this.$com.showToast("请输入验证码"):this.$api.MobileLogin(this.ruleForm.mobile,this.ruleForm.captcha).then(function(e){if(1==e.code){t.$com.setCookie("user_tpc",e.data.userinfo.token),t.$com.showToast("登录成功","success");var o=decodeURIComponent(t.$route.query.redirect||"/");t.$router.push(o)}else t.$com.showToast(e.msg||"稍后再试")})},accountinput:function(){this.ruleForm.mobile=this.ruleForm.mobile.replace(/[^\d]/g,"")},captchainput:function(){this.ruleForm.captcha=this.ruleForm.captcha.replace(/[^\d]/g,"")}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login_box"},[s("div",{staticClass:"login_head",on:{click:function(e){return t.$router.push("/")}}},[s("img",{attrs:{src:o("Z7O8"),alt:""}})]),t._v(" "),s("el-form",{ref:"form",staticClass:"loginform",attrs:{model:t.ruleForm}},[s("div",{staticClass:"logintitle"},[s("div",{staticClass:"account"},[t._v("验证码登录")])]),t._v(" "),s("el-form-item",{attrs:{prop:"mobile"}},[s("el-input",{attrs:{placeholder:"手机号",clearable:"",autocomplete:"off",maxlength:"11"},on:{input:t.accountinput},model:{value:t.ruleForm.mobile,callback:function(e){t.$set(t.ruleForm,"mobile",e)},expression:"ruleForm.mobile"}})],1),t._v(" "),s("el-form-item",{attrs:{prop:"captcha"}},[s("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入验证码",maxlength:"4",autocomplete:"off"},on:{input:t.captchainput},model:{value:t.ruleForm.captcha,callback:function(e){t.$set(t.ruleForm,"captcha",e)},expression:"ruleForm.captcha"}}),t._v(" "),s("el-button",{staticStyle:{width:"28%"},attrs:{icon:"el-icon-mobile-phone",type:"success",disabled:t.disabled=!t.show},on:{click:t._SmsSend}},[s("span",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[t._v("获取验证码")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticClass:"count"},[t._v(t._s(t.count)+" s")])])],1),t._v(" "),s("div",{staticClass:"login_btn",on:{click:t.gonext}},[t._v("登录")]),t._v(" "),s("div",{staticClass:"login_pass",on:{click:t.backlogin}},[t._v("密码登录")])],1)],1)},staticRenderFns:[]};var c=o("VU/8")(s,i,!1,function(t){o("inEw")},"data-v-305a9b76",null);e.default=c.exports},inEw:function(t,e){}});
webpackJsonp([26],{"HN/R":function(e,a,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t={name:"apoint",data:function(){var e=this;return{showloading:!0,formLabelAlign:{username:"",mobile:"",team_name:"",email:"",remark:""},formrules:{username:[{required:!0,message:"请输入报名人姓名",trigger:"blur"},{min:2,max:30,message:"长度在 2 到 30 个字符",trigger:"blur"}],mobile:[{required:!0,validator:function(a,r,t){return r.trim()?e.$com.checkPhone(r)?void t():t(new Error("手机号不正确")):t(new Error("请输入手机号"))},trigger:"blur"}],team_name:[{required:!0,message:"请输入战队名称",trigger:"blur"},{min:2,max:30,message:"长度在 2 到 30 个字符",trigger:"blur"}],email:[{type:"email",required:!0,message:"请输入正确的邮箱地址",trigger:"blur"}],remark:[{min:0,max:150,message:"长度在 150 个字符",trigger:"blur"}]},matchinfo:{}}},created:function(){this.$route.params.match_id?(this.match_id=this.$route.params.match_id,this._GetMatchInfo()):this.$router.replace("/")},methods:{_GetMatchInfo:function(){var e=this;this.$api.GetMatchInfo(this.match_id).then(function(a){e.showloading=!1,1==a.code?e.matchinfo=a.data:(e.$com.showToast(a.msg),setTimeout(function(){e.$router.go(-1)},1e3))})},gobaoming:function(){var e=this;this.$refs.form.validate(function(a){if(!a)return e.$com.showToast("请完善表单","error"),!1;e.$api.SetMatchSign(e.match_id,e.formLabelAlign.username,e.formLabelAlign.mobile,e.formLabelAlign.team_name,e.formLabelAlign.email,e.formLabelAlign.remark).then(function(a){e.$com.showToast(a.msg,"error"),1==a.code?(e.$com.showToast(a.msg,"success"),setTimeout(function(){e.$router.push({path:"/my/myApplication"})},1500)):e.$com.showToast(a.msg,"error")})})}}},l={render:function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.showloading,expression:"showloading"}],staticClass:"score_box"},[r("div",{staticClass:"name"},[e._v(e._s(e.matchinfo.name))]),e._v(" "),r("div",{staticClass:"date"},[e._v(e._s(e.matchinfo.start_time)+" ~"+e._s(e.matchinfo.end_time))]),e._v(" "),r("el-form",{ref:"form",attrs:{"label-width":"100px",model:e.formLabelAlign,rules:e.formrules}},[r("el-form-item",{attrs:{label:"报名人姓名",prop:"username"}},[r("el-input",{attrs:{placeholder:"报名人姓名",maxlength:"30",clearable:""},model:{value:e.formLabelAlign.username,callback:function(a){e.$set(e.formLabelAlign,"username",a)},expression:"formLabelAlign.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[r("el-input",{attrs:{placeholder:"手机号",maxlength:"11",clearable:""},model:{value:e.formLabelAlign.mobile,callback:function(a){e.$set(e.formLabelAlign,"mobile",a)},expression:"formLabelAlign.mobile"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"战队名称",prop:"team_name"}},[r("el-input",{attrs:{placeholder:"战队名称",maxlength:"30",clearable:""},model:{value:e.formLabelAlign.team_name,callback:function(a){e.$set(e.formLabelAlign,"team_name",a)},expression:"formLabelAlign.team_name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{attrs:{placeholder:"邮箱",clearable:""},model:{value:e.formLabelAlign.email,callback:function(a){e.$set(e.formLabelAlign,"email",a)},expression:"formLabelAlign.email"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注信息",prop:"remark"}},[r("el-input",{attrs:{type:"textarea","show-word-limit":"",maxlength:"150",autosize:{minRows:4,maxRows:6},placeholder:"备注信息",resize:"none"},model:{value:e.formLabelAlign.remark,callback:function(a){e.$set(e.formLabelAlign,"remark",a)},expression:"formLabelAlign.remark"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.gobaoming}},[e._v("提交")])],1)],1)],1)},staticRenderFns:[]};var o=r("VU/8")(t,l,!1,function(e){r("S8tk")},"data-v-4348a666",null);a.default=o.exports},S8tk:function(e,a){}});
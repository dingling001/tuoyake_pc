webpackJsonp([15],{P6Hp:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"myFeedback",data:function(){return{message:"",fileList:[],dialogImageUrl:"",dialogVisible:!1,post:{token:this.$com.getCookies('user_tpc'),}}},methods:{handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},feedback_fn:function(){var e=this;if(""==this.message)this.$com.showtoast("请输入内容");else{console.log(this.fileList);var t=[];for(var i in this.fileList)t.push(this.fileList[i].content);this.$api.SetFeedback(this.message,t.toString()).then(function(t){1==t.code&&(e.$com.showtoast("提交成功"),setTimeout(function(){e.$router.go(-1)},1500))})}}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"fbox"},[e._m(0),e._v(" "),i("el-input",{attrs:{type:"textarea",resize:"none",placeholder:"请在这里留下您的宝贵意见","show-word-limit":"",maxlength:"200"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),e._v(" "),i("div",{staticClass:"uploadbox"},[i("el-upload",{attrs:{action:"http://admin.tuoyake.com/api/common/upload",multiple:"",limit:3,data:e.post,accept:"jpg/png",name:"file","list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[i("i",{staticClass:"el-icon-plus"})]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),i("div",{staticClass:"fbtn",on:{click:e.feedback_fn}},[e._v("提交评价")])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"iconbox"},[t("div",{staticClass:"name"},[this._v("意见反馈")])])}]};var o=i("VU/8")(a,s,!1,function(e){i("djhJ")},"data-v-7fa2cb4a",null);t.default=o.exports},djhJ:function(e,t){}});

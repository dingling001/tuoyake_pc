webpackJsonp([28],{gsX7:function(t,e){},"rcM/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"changepass",data:function(){return{password:"",time:6e4,showbtn:!0}},methods:{endtime:function(){},_SmsSend:function(){}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"changgebox"},[s("div",{staticClass:"hr"}),t._v(" "),s("van-cell-group",[s("van-field",{attrs:{type:"text",label:"原手机号",readonly:"",value:"13821452840"}}),t._v(" "),s("van-field",{attrs:{type:"password",label:"新手机号",placeholder:"请输入新手机号"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("van-field",{attrs:{type:"password",label:"验证码",placeholder:"请输入短信验证码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}},[t.showbtn?s("van-button",{staticClass:"code",attrs:{slot:"button",type:"default",size:"small"},on:{click:t._SmsSend},slot:"button"},[t._v("\n                获取验证码\n            ")]):t._e(),t._v(" "),s("van-count-down",{ref:"countDown",attrs:{time:t.time,format:"ss","auto-start":"fasle"},on:{finish:t.endtime}})],1)],1),t._v(" "),s("div",{staticClass:"btn"},[t._v("修改并保存")])],1)},staticRenderFns:[]};var o=s("VU/8")(a,n,!1,function(t){s("gsX7")},"data-v-3d42f7da",null);e.default=o.exports}});
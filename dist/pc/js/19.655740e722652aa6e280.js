webpackJsonp([19],{DO0k:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"about",data:function(){return{platinfo:{}}},created:function(){this._Platform()},methods:{_Platform:function(){var t=this;this.$api.Platform().then(function(a){1==a.code&&(t.platinfo=a.data)})}}},e={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("el-card",{staticClass:"pbox"},[i("div",{staticClass:"logobox"},[i("img",{attrs:{src:t.platinfo.logo,alt:""}})]),t._v(" "),i("div",{staticClass:"pitem"},[t._v("\n    加盟热线："+t._s(t.platinfo.join_hotline)+"\n  ")]),t._v(" "),i("div",{staticClass:"pitem"},[t._v("\n    平台客服："+t._s(t.platinfo.customer_service)+"\n  ")]),t._v(" "),i("div",{staticClass:"pitem"},[i("a",{attrs:{href:"mqqwpa://im/chat?chat_type=wpa&uin="+t.platinfo.qq_number+"&version=1&src_type=web&web_src=oicqzone.com",target:"_blank"}},[t._v("\n      平台QQ："+t._s(t.platinfo.qq_number)+"\n    ")])]),t._v(" "),i("div",{staticClass:"pitem"},[i("a",{attrs:{href:t.platinfo.website,target:"_blank"}},[t._v("\n      平台网址："+t._s(t.platinfo.website)+"\n    ")])]),t._v(" "),i("div",{staticClass:"setbox"},[i("div",{staticClass:"codebox"},[i("div",{staticClass:"citem"},[i("img",{attrs:{src:t.platinfo.weibo_qrcode,alt:""}}),t._v(" "),i("div",[t._v("平台公众号")])]),t._v(" "),i("div",{staticClass:"citem"},[i("img",{attrs:{src:t.platinfo.weibo_qrcode,alt:""}}),t._v(" "),i("div",[t._v("平台微博")])])])])])},staticRenderFns:[]};var n=i("VU/8")(s,e,!1,function(t){i("SMg5")},"data-v-5d2085dc",null);a.default=n.exports},SMg5:function(t,a){}});
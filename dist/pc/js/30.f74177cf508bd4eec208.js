webpackJsonp([30],{VhLt:function(t,a){},"tU/f":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"myPlatform",data:function(){return{platinfo:{}}},created:function(){this._Platform()},methods:{_Platform:function(){var t=this;this.$api.Platform().then(function(a){console.log(a),1==a.code&&(t.platinfo=a.data)})}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pbox"},[e("div",{staticClass:"plogo"},[e("img",{attrs:{src:t.platinfo.logo,alt:""}})]),t._v(" "),e("van-cell-group",{staticClass:"setbox"},[e("a",{attrs:{href:"tel:"+t.platinfo.join_hotline}},[e("van-cell",{attrs:{title:"加盟热线",value:t.platinfo.join_hotline}})],1),t._v(" "),e("a",{attrs:{href:"tel:"+t.platinfo.customer_service}},[e("van-cell",{attrs:{title:"平台客服",value:t.platinfo.customer_service}})],1),t._v(" "),e("a",{attrs:{href:"mqqwpa://im/chat?chat_type=wpa&uin="+t.platinfo.qq_number+"&version=1&src_type=web&web_src=oicqzone.com",target:"_blank"}},[e("van-cell",{attrs:{title:"平台QQ",value:t.platinfo.qq_number}})],1),t._v(" "),e("a",{attrs:{href:t.platinfo.website,target:"_blank"}},[e("van-cell",{attrs:{title:"平台网址",value:t.platinfo.website}})],1),t._v(" "),e("div",{staticClass:"codebox"},[e("div",{staticClass:"citem"},[e("img",{attrs:{src:t.platinfo.weibo_qrcode,alt:""}}),t._v(" "),e("div",[t._v("平台公众号")])]),t._v(" "),e("div",{staticClass:"citem"},[e("img",{attrs:{src:t.platinfo.weibo_qrcode,alt:""}}),t._v(" "),e("div",[t._v("平台微博")])])])])],1)},staticRenderFns:[]};var n=e("VU/8")(i,l,!1,function(t){e("VhLt")},"data-v-2ce30357",null);a.default=n.exports}});
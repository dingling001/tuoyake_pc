webpackJsonp([34],{"1vpe":function(t,i){},HEyi:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={name:"myCoupondetail",data:function(){return{id:"",cup_info:{}}},created:function(){this.id=this.$route.query.id,this._GetCouponInfo()},methods:{_GetCouponInfo:function(){var t=this;this.$api.GetCouponInfo(this.id).then(function(i){1==i.code&&(t.cup_info=i.data)})}}},n={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return Object.keys(t.cup_info)?s("div",{staticClass:"cup_d"},[s("div",{staticClass:"title"},[t._v(" "+t._s(t.cup_info.name)),s("div",{staticClass:"status"},[t._v(t._s(t.cup_info.status_text))])]),t._v(" "),s("div",{staticClass:"date"},[t._m(0),t._v(" "),s("div",{staticClass:"day"},[t._v(t._s(t.cup_info.expire_time))])]),t._v(" "),s("div",{staticClass:"intro"},[t._m(1),t._v(" "),s("div",{staticClass:"introcontent"},[t._v("\n      "+t._s(t.cup_info.remark)+"\n    ")])]),t._v(" "),s("div",{staticClass:"codebox"},[s("qrcode",{attrs:{value:t.cup_info.share_url,options:{size:162}}})],1),t._v(" "),s("router-link",{staticClass:"sharebtn",attrs:{tag:"div",to:"/download"}},[t._v("扫码下载App")]),t._v(" "),s("div",{staticClass:"tips"},[t._v("注：优惠券需分享激活")])],1):t._e()},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("span",{staticClass:"iconfont icontime-circle"}),this._v(" 有效期")])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("span",{staticClass:"iconfont iconjianjie"}),this._v(" 简介")])}]};var a=s("C7Lr")(e,n,!1,function(t){s("1vpe")},"data-v-31395a86",null);i.default=a.exports}});
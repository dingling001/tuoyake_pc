webpackJsonp([9],{IjYw:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"myGift",data:function(){return{mylist:[]}},created:function(){this._ScoreMyReceived()},components:{NoData:NoData},methods:{_ScoreMyReceived:function(){var t=this;this.$api.ScoreMyReceived().then(function(e){1==e.code&&(t.mylist=e.data)})}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rbox"},[t.mylist.length?i("div",{staticClass:"rlist"},t._l(t.mylist,function(e,s){return i("div",{key:e.id,staticClass:"ritem"},[i("div",{staticClass:"rname"},[t._v("领取时间："+t._s(e.create_time))]),t._v(" "),i("div",{staticClass:"rinfo"},[i("van-image",{attrs:{fit:"contain",width:"1.6rem",height:"1.6rem",src:e.image}}),t._v(" "),i("div",{staticClass:"rcontent"},[i("div",{staticClass:"rgname"},[t._v(t._s(e.goods_name))]),t._v(" "),i("div",{staticClass:"rdes"},[t._v("X1")])]),t._v(" "),i("div",{staticClass:"iconfont iconjiantou"})],1)])}),0):t._e()])},staticRenderFns:[]};var n=i("VU/8")(s,a,!1,function(t){i("WTS7")},"data-v-98b5fa1c",null);e.default=n.exports},WTS7:function(t,e){}});
webpackJsonp([42],{XJOZ:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"mbox"},[i("div",{staticClass:"my_left"},[i("div",{staticClass:"my_head"},[i("div",{staticClass:"my_img"},[i("el-avatar",{key:t.user_info.avatar,class:{noimg:t.user_info.avatar},attrs:{shape:"circle",size:80,fit:"cover",src:t.user_info.avatar}})],1),t._v(" "),i("div",{staticClass:"my_nickname"},[t._v(t._s(t.user_info.nickname))]),t._v(" "),i("div",{staticClass:"my_score"},[t._v("当前积分 : "),i("span",[t._v(t._s(t.user_info.score))])])]),t._v(" "),i("div",{staticClass:"my_nav"},[i("div",{class:["nav_item",0==t.cur?"active_item":""],on:{click:function(n){return t.gonav("myCollect",0)}}},[i("span",{staticClass:"iconfont iconheart-fill"}),t._v("我的收藏\n      ")]),t._v(" "),i("div",{class:["nav_item",1==t.cur?"active_item":""],on:{click:function(n){return t.gonav("myOrder",1)}}},[i("span",{staticClass:"iconfont iconicon"}),i("span",[t.onum>0?i("el-badge",{attrs:{value:t.onum,max:999}},[t._v("我的订单")]):i("span",[t._v("我的订单")])],1)]),t._v(" "),i("div",{class:["nav_item",3==t.cur?"active_item":""],on:{click:function(n){return t.gonav("myPoints",3)}}},[i("span",{staticClass:"iconfont iconjifen"}),t._v("我的积分\n      ")]),t._v(" "),i("div",{class:["nav_item",4==t.cur?"active_item":""],on:{click:function(n){return t.gonav("myCoupon",4)}}},[i("span",{staticClass:"iconfont iconyouhuiquan"}),t.cnum>0?i("el-badge",{attrs:{value:t.cnum,max:99}},[t._v("我的优惠券")]):i("span",[t._v("我的优惠券")])],1),t._v(" "),i("div",{class:["nav_item",5==t.cur?"active_item":""],on:{click:function(n){return t.gonav("myFeedback",5)}}},[i("span",{staticClass:"iconfont iconfeedback-center"}),t._v("意见反馈\n      ")]),t._v(" "),i("div",{class:["nav_item",6==t.cur?"active_item":""],on:{click:function(n){return t.gonav("myset",6)}}},[i("span",{staticClass:"iconfont iconshezhi2"}),t._v("账号设置\n      ")])])]),t._v(" "),i("div",{staticClass:"my_right"},[i("router-view")],1)])},staticRenderFns:[]};var a=i("C7Lr")({name:"my",data:function(){return{adinfo:{},user_tpc:"",user_info:{},cur:0,onum:0,cnum:0}},provide:function(){return{app:this}},watch:{$route:{handler:function(t){this.cur=t.meta.cur},immediate:!0}},beforeRouteEnter:function(t,n,i){t.meta.cur&&(i.cur=t.cur),i()},created:function(){this._GetAdv(),this.$com.getCookies("user_tpc")&&(this.user_tpc=this.$com.getCookies("user_tpc"),this._GetUserInfo(),this._OrderGetOrderNum(),this._GetCouponList())},methods:{gonav:function(t,n){this.cur=n,this.$router.push({path:"/my/"+t})},_GetUserInfo:function(){var t=this;this.$api.GetUserInfo().then(function(n){1==n.code&&(t.user_info=n.data)})},_GetAdv:function(){var t=this;this.$api.GetAdv(1).then(function(n){t.adinfo=n.data})},gologin:function(){this.$router.push({path:"/login"})},_OrderGetOrderNum:function(){var t=this;this.$api.OrderGetOrderNum().then(function(n){1==n.code&&(t.onum=n.data)})},_GetCouponList:function(){var t=this;this.$api.GetCouponList(1,0).then(function(n){1==n.code&&(t.cnum=n.data.total)})}}},e,!1,function(t){i("eLmx")},"data-v-0ada4404",null);n.default=a.exports},eLmx:function(t,n){}});
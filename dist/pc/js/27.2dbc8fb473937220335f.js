webpackJsonp([27],{w9z1:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("van-tabs",{staticClass:"coupbox",attrs:{swipeable:""},on:{click:t.changetype},model:{value:t.active,callback:function(s){t.active=s},expression:"active"}},[t._l(t.navs,function(t,s){return a("van-tab",{key:s,staticClass:"tab",attrs:{title:t}})}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.active,expression:"active==0"}]},[a("div",{staticClass:"couponlist"},t._l(t.couplist,function(s,i){return a("div",{class:["coupitem",3==s.status||4==s.status?"used":""],on:{click:function(a){return t.godetail(s.id)}}},[a("span",{staticClass:"leftcricle"}),t._v(" "),a("span",{staticClass:"rightcricle"}),t._v(" "),a("div",{staticClass:"cl"},[a("div",[t._v(t._s(s.name))]),t._v(" "),a("div",{staticClass:"date"},[t._v(t._s(s.expire_time))])]),t._v(" "),a("div",{staticClass:"cr"},[t._v(t._s(s.status_text)+" "),1==s.status||2==s.status?a("span",{staticClass:"iconfont iconcaret-right"}):t._e()])])}),0)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.active,expression:"active==1"}]},[t.couplist.length?a("div",{staticClass:"couponlist"},t._l(t.couplist,function(s,i){return a("div",{class:["coupitem",3==s.status||4==s.status?"used":""]},[a("span",{staticClass:"leftcricle"}),t._v(" "),a("span",{staticClass:"rightcricle"}),t._v(" "),a("div",{staticClass:"cl"},[a("div",[t._v(t._s(s.name))]),t._v(" "),a("div",{staticClass:"date"},[t._v(t._s(s.expire_time))])]),t._v(" "),a("div",{staticClass:"cr"},[t._v(t._s(s.status_text)+" "),1==s.status||2==s.status?a("span",{staticClass:"iconfont iconcaret-right"}):t._e()])])}),0):a("div",{staticClass:"nodata"},[t._v("暂无数据")])])],2)},staticRenderFns:[]};var e=a("VU/8")({name:"myCoupon",data:function(){return{active:0,page:0,navs:["未使用","已使用"],couplist:[],type:1}},created:function(){this._GetCouponList()},methods:{_GetCouponList:function(){var t=this;this.$api.GetCouponList(this.type,this.page).then(function(s){t.couplist=s.data.data})},changetype:function(){this.type=this.active+1,this.page=0,this._GetCouponList()},godetail:function(t){this.$router.push({path:"myCoupondetail",query:{id:t}})}}},i,!1,function(t){a("wIT3")},"data-v-34e76276",null);s.default=e.exports},wIT3:function(t,s){}});
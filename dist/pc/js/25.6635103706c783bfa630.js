webpackJsonp([25],{Cv7J:function(t,s){},LV7v:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"myApplication",data:function(){return{total:0,win:0,isDownLoading:!1,isUpLoading:!1,finished:!1,offset:0,page:0,status:1,singList:[],nav_active:0,sing:!1}},created:function(){this._SignIndex(),this._GetSignList()},methods:{_SignIndex:function(){var t=this;this.$api.SignIndex().then(function(s){1==s.code&&(t.total=s.data.total,t.win=s.data.win)})},changgeNav:function(){this.status=parseInt(this.nav_active)+1,this.page=0,this.singList=[],this._GetSignList()},backmy:function(){this.$router.go(-1)},gomychieve:function(){this.$router.push("/myAchieve")},_GetSignList:function(){var t=this,s=this.page+1;this.$api.GetSignList(s,this.status).then(function(s){t.sing=!0,1==s.code&&(t.singList=s.data.data)})},gossdetail:function(t){this.$router.push({path:"/gamedetail",query:{match_id:t}})}}},e={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"score_box"},[i("div",{staticClass:"score_top"},[i("div",{staticClass:"iconbox",on:{click:t.gomychieve}},[i("div",{staticClass:"name"},[t._v("我的报名")]),t._v(" "),t._m(0)]),t._v(" "),i("div",{staticClass:"score_item"},[i("div",{staticClass:"item"},[i("span",{staticClass:"mys"},[t._v("报名次数")]),t._v(" "),i("span",{staticClass:"scroe"},[t._v(t._s(t.total))]),t._v("次\n      ")]),t._v(" "),i("div",{staticClass:"item"},[i("span",{staticClass:"mys"},[t._v("获奖次数")]),t._v(" "),i("span",{staticClass:"scroe"},[t._v(t._s(t.win))]),t._v("次\n      ")])]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"mlink"},[i("el-tabs",{on:{"tab-click":t.changgeNav},model:{value:t.nav_active,callback:function(s){t.nav_active=s},expression:"nav_active"}},[i("el-tab-pane",{attrs:{label:"进行中的赛事"}}),t._v(" "),i("el-tab-pane",{attrs:{label:"获奖赛事"}}),t._v(" "),i("el-tab-pane",{attrs:{label:"已结束的赛事"}}),t._v(" "),t.sing&&t.singList.length?i("div",{staticClass:"comlist"},t._l(t.singList,function(s,a){return i("div",{key:s.id,staticClass:"jitem van-row--flex",on:{click:function(i){return t.gossdetail(s.match_id)}}},[i("div",{staticClass:"jimg"},[i("img",{attrs:{src:s.image,alt:""}})]),t._v(" "),i("div",{staticClass:"jright"},[i("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(s.league_name))]),t._v(" "),i("div",{staticClass:"jaddress van-ellipsis"},[t._v("\n              赛事时间："+t._s(s.start_time)+" ~ "+t._s(s.end_time)+"\n            ")]),t._v(" "),i("div",{staticClass:"synopsis van-ellipsis"},[t._v(t._s(s.remark))])])])}),0):t._e(),t._v(" "),t.sing&&0==t.singList.length?i("div",{staticClass:"nodata"},[t._v("暂无数据")]):t._e()],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"achieve_right"},[this._v("获奖成就 "),s("span",{staticClass:"iconfont iconjiantou"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"score_label"},[s("div",{staticClass:"label_process"})])}]};var n=i("VU/8")(a,e,!1,function(t){i("Cv7J")},"data-v-47cb16cb",null);s.default=n.exports}});
webpackJsonp([32],{CopG:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"gameindex",data:function(){return{page:0,status:1,nav_active:0,singList:[],sing:!1,bar_id:""}},created:function(){this.bar_id=this.$route.query.bar_id,this._GetMatchList()},methods:{changgeNav:function(){this.status=parseInt(this.nav_active)+1,this.page=0,this.sing=!1,this.singList=[],this._GetMatchList()},_GetMatchList:function(){var t=this;this.$api.GetMatchList(this.bar_id,this.status).then(function(a){t.sing=!0,1==a.code&&(t.singList=a.data.data)})},gossdetail:function(t){this.$router.push({path:"/gamedetail",query:{match_id:t,cid:this.id}})}}},e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"mlink"},[s("el-tabs",{on:{"tab-click":t.changgeNav},model:{value:t.nav_active,callback:function(a){t.nav_active=a},expression:"nav_active"}},[s("el-tab-pane",{attrs:{label:"推荐赛事"}}),t._v(" "),s("el-tab-pane",{attrs:{label:"正在进行"}}),t._v(" "),s("el-tab-pane",{attrs:{label:"过往赛事"}}),t._v(" "),t.sing&&t.singList.length?s("div",{staticClass:"comlist"},t._l(t.singList,function(a,i){return s("div",{key:a.id,staticClass:"jitem van-row--flex",on:{click:function(s){return t.gossdetail(a.id)}}},[s("div",{staticClass:"jimg"},[s("img",{attrs:{src:a.image,alt:""}})]),t._v(" "),s("div",{staticClass:"jright"},[s("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(a.league_name))]),t._v(" "),s("div",{staticClass:"jaddress van-ellipsis"},[t._v("赛事时间："+t._s(a.start_time)+" ~ "+t._s(a.end_time))]),t._v(" "),s("div",{staticClass:"bar_name"},[t._v("所属网吧："+t._s(a.bar_name))]),t._v(" "),s("div",{staticClass:"synopsis moreline"},[t._v("赛事简介："+t._s(a.remark))])])])}),0):t._e(),t._v(" "),t.sing&&0==t.singList.length?s("div",{staticClass:"nodata"},[s("NoData",{attrs:{text:"暂无相关赛事"}})],1):t._e()],1)],1)},staticRenderFns:[]};var n=s("VU/8")(i,e,!1,function(t){s("kOSN")},"data-v-304cbdce",null);a.default=n.exports},kOSN:function(t,a){}});
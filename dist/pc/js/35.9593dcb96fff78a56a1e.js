webpackJsonp([35],{"66f/":function(t,s){},LfFZ:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"myCollect",data:function(){return{type:1,active:"1",list:[],page:0,per_page:12,totalPages:0,isload:!1}},components:{pcpaging:i("s85o").a},created:function(){this._CollectionIndex()},methods:{_CollectionIndex:function(){var t=this;this.$api.CollectionIndex(this.type,this.page,this.lat,this.lng,this.per_page).then(function(s){t.isload=!0,1==s.code&&(console.log(s),t.list=s.data.data,t.totalPages=s.data.total)})},getPresentPage:function(t){this.page=t,this._CollectionIndex()},getPresentPage1:function(t){this.page1=t,this._CollectionIndex()},getPresentPage2:function(t){this.page2=t,this._CollectionIndex()},changetype:function(t,s){this.page=0,this.type=parseInt(t.index)+1,this.list=[],this.isload=!1,this._CollectionIndex()},godetail:function(t){this.$router.push({path:"/competitiondetail/"+t})},gossdetail:function(t){this.$router.push({path:"/gamedetail",query:{match_id:t}})},govdetail:function(t){this.$router.push({path:"/videodetail",query:{video_id:t}})},gotaocandetail:function(t){this.$router.push({path:"/taocan/"+t+"/"+this.id})},s_to_hs:function(t){var s;return s=Math.floor(t/60),t%=60,t+="",(s=1==(s+="").length?"0"+s:s)+":"+(t=1==t.length?"0"+t:t)}}},e={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"colbox"},[i("el-tabs",{on:{"tab-click":t.changetype},model:{value:t.active,callback:function(s){t.active=s},expression:"active"}},[i("el-tab-pane",{attrs:{label:"网吧",name:"1"}},[t.isload&&t.list.length&&1==t.active?i("div",{staticClass:"recommentlist"},t._l(t.list,function(s,a){return i("div",{key:s.id,staticClass:"recmmentitem",on:{click:function(i){return t.godetail(s.id)}}},[s.image?i("div",{staticClass:"rec_img"},[i("img",{attrs:{src:s.image,alt:""}})]):t._e(),t._v(" "),i("div",{staticClass:"rec_name"},[t._v(t._s(s.name))]),t._v(" "),i("div",{staticClass:"rec_type"},[s.star&&s.star.length?i("div",{staticClass:"starbox"},t._l(parseInt(s.star),function(t){return i("span",{staticClass:"iconfont iconstar-fill iconactive"})}),0):t._e()]),t._v(" "),i("div",{staticClass:"typebox "},t._l(s.label_ids,function(a,e){return i("span",{key:e,staticClass:"single-line-text",style:{maxWidth:1/s.label_ids.length*100+"%"}},[t._v(t._s(a))])}),0),t._v(" "),i("div",{staticClass:"rec_address single-line-text"},[t._v(t._s(s.address))])])}),0):t._e(),t._v(" "),t.isload&&0==t.list.length&&1==t.active?i("NoData",{attrs:{text:"暂无收藏网吧"}}):t._e(),t._v(" "),t.totalPages>t.per_page?i("pcpaging",{staticClass:"pcpaging",attrs:{totalPages:t.totalPages,pageSize:t.per_page,scrollTo:680},on:{presentPage:t.getPresentPage}}):t._e()],1),t._v(" "),i("el-tab-pane",{attrs:{label:"赛事",name:"2"}},[t.isload&&t.list.length&&2==t.active?i("div",{staticClass:"comlist"},t._l(t.list,function(s,a){return i("div",{key:s.id,staticClass:"jitem ",on:{click:function(i){return t.gossdetail(s.id)}}},[i("div",{staticClass:"jimg"},[i("img",{attrs:{src:s.image,alt:""}})]),t._v(" "),i("div",{staticClass:"jright"},[i("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(s.name))]),t._v(" "),i("div",{staticClass:"jaddress van-ellipsis"},[i("span",[t._v("赛事时间：")]),t._v(t._s(s.start_time)+" "),i("b",[t._v("~")]),t._v(" "+t._s(s.end_time))]),t._v(" "),i("div",{staticClass:"synopsis van-ellipsis"},[t._v(t._s(s.synopsis))]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"}},[t._v("立即报名")])],1)])}),0):t._e(),t._v(" "),t.isload&&0==t.list.length&&2==t.active?i("NoData",{attrs:{text:"暂无收藏赛事"}}):t._e()],1),t._v(" "),i("el-tab-pane",{attrs:{label:"视频",name:"3"}},[t.isload&&t.list.length&&3==t.active?i("div",{staticClass:"vlist"},t._l(t.list,function(s,a){return i("div",{key:s.id,staticClass:"videoitem",on:{click:function(i){return t.govdetail(s.id)}}},[i("div",{staticClass:"vimg"},[i("img",{attrs:{src:s.poster,alt:""}}),t._v(" "),i("span",{staticClass:"view_num"},[i("span",{staticClass:"iconfont iconbofang1"}),t._v(t._s(t.s_to_hs(s.duration)))])]),t._v(" "),i("div",{staticClass:"vright"},[i("div",{staticClass:"vname van-ellipsis"},[t._v(t._s(s.name))]),t._v(" "),i("div",{staticClass:"vtime"},[i("span",{staticClass:"iconfont icontime-circle"}),i("span",[t._v(t._s(s.create_time))])]),t._v(" "),i("div",{staticClass:"vsynopsis"},[t._v(t._s(s.synopsis))])])])}),0):t._e(),t._v(" "),t.isload&&0==t.list.length&&3==t.active?i("NoData",{attrs:{text:"暂无收藏视频"}}):t._e()],1),t._v(" "),i("el-tab-pane",{attrs:{label:"套餐",name:"4"}},[t.isload&&t.list.length?i("div",{staticClass:"comlist"},t._l(t.list,function(s,a){return i("div",{key:s.id,staticClass:"jitem van-row--flex",on:{click:function(i){return t.gotaocandetail(s.id)}}},[i("div",{staticClass:"jimg"},[i("img",{attrs:{src:s.image,alt:""}})]),t._v(" "),i("div",{staticClass:"jright"},[i("div",{staticClass:"jname van-ellipsis"},[t._v(t._s(s.name))]),t._v(" "),i("div",{staticClass:"jaddress van-ellipsis",domProps:{innerHTML:t._s(s.content)}}),t._v(" "),i("div",{staticClass:"price"},[t._v("￥"+t._s(s.price))]),t._v(" "),i("div",{staticClass:"jbtn"},[t._v("立即抢购")])])])}),0):t._e(),t._v(" "),t.isload&&0==t.list.length&&4==t.active?i("NoData",{attrs:{text:"暂无收藏视频"}}):t._e()],1)],1)],1)},staticRenderFns:[]};var n=i("VU/8")(a,e,!1,function(t){i("66f/")},"data-v-23045804",null);s.default=n.exports}});
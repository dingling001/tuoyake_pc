webpackJsonp([39],{Xhes:function(t,i){},byb2:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"vlisstbox"},[e("div",{staticClass:"vlist"},t._l(t.vlist,function(i,s){return t.vlist.length?e("div",{key:i.id,staticClass:"videoitem",on:{click:function(e){return t.govdetail(i.id)}}},[e("div",{staticClass:"vimg"},[e("img",{attrs:{src:i.poster,alt:""}})]),t._v(" "),e("div",{staticClass:"vname van-ellipsis"},[t._v(t._s(i.name))]),t._v(" "),e("div",{staticClass:"vtime"},[e("span",{staticClass:"iconfont icontime-circle"}),e("span",[t._v(t._s(i.create_time))])])]):t._e()}),0)])},staticRenderFns:[]};var a=e("VU/8")({name:"videolist",data:function(){return{vlist:[],math_id:""}},created:function(){this.$route.query.match_id?(this.match_id=this.$route.query.match_id,this._GetVideoList()):this.$router.replace("/")},methods:{_GetVideoList:function(){var t=this;this.$api.GetVideoList(this.match_id).then(function(i){1==i.code&&(t.vlist=i.data)})},govdetail:function(t){this.$router.push({path:"/videodetail",query:{video_id:t}})}}},s,!1,function(t){e("Xhes")},"data-v-2c98577e",null);i.default=a.exports}});
webpackJsonp([27],{RsFp:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={name:"gamedetail",data:function(){return{matchinfo:{video:[]},match_id:"",is_share:0}},created:function(){this.$route.query.match_id?(this.cid=this.$route.query.cid,this.match_id=this.$route.query.match_id,this._GetMatchInfo()):this.$router.replace("/"),this.is_share=this.$route.query.is_share},methods:{_GetMatchInfo:function(){var t=this;this.$api.GetMatchInfo(this.match_id).then(function(i){1==i.code?t.matchinfo=i.data:(t.$com.showToast(i.msg),setTimeout(function(){t.$router.go(-1)},1e3))})},clllection:function(){var t=this;this.$api.SetCollection(2,this.match_id).then(function(i){1==i.code?1==i.data.is_collection?(t.$com.showToast("收藏成功","success"),t.matchinfo.is_collection=1):(t.$com.showToast("取消收藏","error"),t.matchinfo.is_collection=0):t.$com.showToast(i.msg,"error")})},backlist:function(){1==this.is_share?this.$router.push({path:"/competitiondetail",query:{id:this.cid}}):this.$router.go(-1)},govdetail:function(t){this.$router.push({path:"/videodetail",query:{video_id:t}})},allvideo:function(){this.$router.push({path:"/videolist",query:{match_id:this.match_id}})},goapp:function(){this.$router.push({path:"/apoint/"+this.match_id})},gomy:function(){this.$router.push({path:"/my/myApplication"})},s_to_hs:function(t){var i;return i=Math.floor(t/60),t%=60,t+="",(i=1==(i+="").length?"0"+i:i)+":"+(t=1==t.length?"0"+t:t)}}},o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"gdbox"},[s("div",{staticClass:"swiperbox"},[s("div",{staticClass:"swiperimg"},[s("img",{attrs:{src:t.matchinfo.image,alt:""}})]),t._v(" "),s("div",{staticClass:"taocaninfo"},[s("div",{staticClass:"comnanme"},[t._v(t._s(t.matchinfo.name))]),t._v(" "),s("div",{staticClass:"taocandes",domProps:{innerHTML:t._s(t.matchinfo.content)}}),t._v(" "),s("div",{staticClass:"btnbox"},[0==t.matchinfo.is_sign?s("div",{staticClass:"taocan_btn",on:{click:t.goapp}},[t._v("立即报名")]):s("div",{staticClass:"taocan_btn",on:{click:t.gomy}},[t._v("我的报名")])]),t._v(" "),s("div",{staticClass:"nright",attrs:{title:"收藏我吧"},on:{click:t.clllection}},[s("div",{class:["iconfont iconheart-fill",1==t.matchinfo.is_collection?"iconactive":""]}),t._v(" "),s("div",[t._v(t._s(0==t.matchinfo.is_collection?"收藏":"已收藏"))])])])]),t._v(" "),t.matchinfo.video.length?s("div",{staticClass:"comlist"},[s("div",{staticClass:"taocan"},[s("div",{staticClass:"spanbox"},[t._v("赛事视频")]),t._v(" "),s("span",{staticClass:"all_video",on:{click:t.allvideo}},[t._v("全部视频 "),s("span",{staticClass:"iconfont iconjiantou"})])]),t._v(" "),s("div",{staticClass:"slist"},t._l(t.matchinfo.video,function(i,a){return s("div",{key:i.id,staticClass:"sitem ",on:{click:function(s){return t.govdetail(i.id)}}},[s("div",{staticClass:"simg"},[s("img",{attrs:{src:i.poster,alt:""}}),t._v(" "),s("span",{staticClass:"view_num"},[s("span",{staticClass:"iconfont iconbofang1"}),t._v(t._s(t.s_to_hs(i.duration)))])]),t._v(" "),s("div",{staticClass:"sright"},[s("div",{staticClass:"sname van-ellipsis"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"stime "},[t._v(t._s(i.create_time))]),t._v(" "),s("div",{staticClass:"synopsis"},[t._v(t._s(i.synopsis))])])])}),0)]):t._e()])},staticRenderFns:[]};var c=s("VU/8")(a,o,!1,function(t){s("i9oc")},"data-v-4e1bb89e",null);i.default=c.exports},i9oc:function(t,i){}});
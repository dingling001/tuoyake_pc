webpackJsonp([19],{"2cxu":function(t,i){},KlDs:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var c={name:"clubdetail",data:function(){return{club_id:"",club_detail:{},offsettop:0}},created:function(){this.$route.query.club_id?(this.club_id=this.$route.query.club_id,this._ClubDetail()):this.$router.replace("/")},methods:{_ClubDetail:function(){var t=this;this.$api.ClubDetail(this.club_id).then(function(i){console.log(i),1==i.code&&(t.club_detail=i.data)})},backlist:function(){this.$router.push("/club")}}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"clubbox"},[s("div",{staticClass:"title",on:{click:t.backlist}},[s("span",{staticClass:"iconfont iconfanhui"})]),t._v(" "),s("div",{staticClass:"clubimg"},[s("img",{attrs:{src:t.club_detail.image,alt:""}})]),t._v(" "),s("div",{staticClass:"clubitem"},[s("div",{staticClass:"clubname"},[t._v(t._s(t.club_detail.name))]),t._v(" "),s("div",{staticClass:"clubboss"},[s("span",[t._v(t._s(t.club_detail.contact))]),s("span",[t._v(t._s(t.club_detail.contact_number))])]),t._v(" "),s("div",{staticClass:"clubboss nopadding"},[t._v(t._s(t.club_detail.address))]),t._v(" "),s("div",{staticClass:"clubcontent"},[t._v(t._s(t.club_detail.content))])])])},staticRenderFns:[]};var l=s("VU/8")(c,a,!1,function(t){s("2cxu")},"data-v-6cf30bee",null);i.default=l.exports}});
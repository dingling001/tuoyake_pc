webpackJsonp([11],{V7nY:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"schooldetail",data:function(){return{college_id:"",club_detail:{},offsettop:0}},created:function(){this.$route.query.college_id?(this.college_id=this.$route.query.college_id,this._ClubDetail()):this.$router.replace("/")},methods:{_ClubDetail:function(){var t=this;this.$api.CollegeDetail(this.college_id).then(function(e){console.log(e),1==e.code&&(t.club_detail=e.data)})},backlist:function(){this.$router.push("/school")}}},i={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"clubbox"},[l("div",{staticClass:"clubimg"},[l("img",{attrs:{src:t.club_detail.image,alt:""}})]),t._v(" "),l("div",{staticClass:"clubitem"},[l("div",{staticClass:"clubname"},[t._v(t._s(t.club_detail.name))]),t._v(" "),l("div",{staticClass:"clubboss"},[l("span",[t._v(t._s(t.club_detail.contact))]),l("span",[t._v(t._s(t.club_detail.contact_number))])]),t._v(" "),l("div",{staticClass:"clubboss nopadding"},[t._v(t._s(t.club_detail.address))]),t._v(" "),l("div",{staticClass:"clubcontent"},[t._v(t._s(t.club_detail.content))])])])},staticRenderFns:[]};var c=l("VU/8")(s,i,!1,function(t){l("c53+")},"data-v-841731e0",null);e.default=c.exports},"c53+":function(t,e){}});
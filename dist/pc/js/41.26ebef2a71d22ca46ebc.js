webpackJsonp([41],{"12aZ":function(t,e){},V7nY:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"schooldetail",data:function(){return{college_id:"",club_detail:{},offsettop:0}},created:function(){this.$route.query.college_id?(this.college_id=this.$route.query.college_id,this._ClubDetail()):this.$router.replace("/")},methods:{_ClubDetail:function(){var t=this;this.$api.CollegeDetail(this.college_id).then(function(e){1==e.code&&(t.club_detail=e.data)})},backlist:function(){this.$router.push("/school")}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"clubbox"},[i("div",{staticClass:"clubimg"},[i("img",{attrs:{src:t.club_detail.image,alt:""}})]),t._v(" "),i("div",{staticClass:"clubitem"},[i("div",{staticClass:"clubname"},[t._v(t._s(t.club_detail.name))]),t._v(" "),i("div",{staticClass:"clubboss"},[i("span",[t._v(t._s(t.club_detail.contact))]),i("span",[t._v(t._s(t.club_detail.contact_number))])]),t._v(" "),i("div",{staticClass:"clubboss nopadding"},[t._v(t._s(t.club_detail.address))]),t._v(" "),i("div",{staticClass:"clubcontent",domProps:{innerHTML:t._s(t.club_detail.content)}})])])},staticRenderFns:[]};var a=i("C7Lr")(s,l,!1,function(t){i("12aZ")},"data-v-09f9dc36",null);e.default=a.exports}});
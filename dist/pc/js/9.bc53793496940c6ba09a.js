webpackJsonp([9],{SvZ9:function(t,i){},ocQ4:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={name:"clubdetail",data:function(){return{club_id:"",club_detail:{},offsettop:0}},created:function(){this.$route.query.club_id?(this.club_id=this.$route.query.club_id,this._ClubDetail()):this.$router.replace("/")},methods:{_ClubDetail:function(){var t=this;this.$api.ClubDetail(this.club_id).then(function(i){1==i.code&&(t.club_detail=i.data)})},backlist:function(){this.$router.push("/club")}}},s={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"clubbox"},[a("div",{staticClass:"clubimg"},[a("img",{attrs:{src:t.club_detail.image,alt:""}})]),t._v(" "),a("div",{staticClass:"clubitem"},[a("div",{staticClass:"clubname"},[t._v(t._s(t.club_detail.name))]),t._v(" "),a("div",{staticClass:"clubboss"},[a("span",[t._v(t._s(t.club_detail.contact))]),a("span",[t._v(t._s(t.club_detail.contact_number))])]),t._v(" "),a("div",{staticClass:"clubboss nopadding"},[t._v(t._s(t.club_detail.address))]),t._v(" "),a("div",{staticClass:"clubcontent"},[t._v(t._s(t.club_detail.content))])])])},staticRenderFns:[]};var c=a("C7Lr")(e,s,!1,function(t){a("SvZ9")},"data-v-da1e09c4",null);i.default=c.exports}});
webpackJsonp([32],{"1a5W":function(e,t){},rkvD:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"editAddress",data:function(){return{areaList:areaList,searchResult:[],placeholder:["请选择","请选择","请选择"]}},created:function(){},methods:{onSave:function(){Toast("save")},onDelete:function(){Toast("delete")},onChangeDetail:function(e){console.log(e)}}},n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ebox"},[t("van-address-edit",{attrs:{"area-list":this.areaList,"show-postal":"","show-delete":"","show-set-default":"","show-search-result":"","search-result":this.searchResult,"area-columns-placeholder":this.placeholder},on:{save:this.onSave,delete:this.onDelete,"change-detail":this.onChangeDetail}})],1)},staticRenderFns:[]};var o=a("VU/8")(s,n,!1,function(e){a("1a5W")},"data-v-099513ce",null);t.default=o.exports}});
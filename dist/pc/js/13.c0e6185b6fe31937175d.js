webpackJsonp([13],{R0JZ:function(t,e){},YOAI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"myAddress",data:function(){return{tableData:[],tabelshow:!1,dialogFormVisible:!1,aid:null,showloading:!0}},components:{Taddress:n("uN9M").a},created:function(){this._AddressIndex()},methods:{_AddressIndex:function(){var t=this;this.$api.AddressIndex().then(function(e){t.tabelshow=!0,t.showloading=!1,1==e.code&&(t.tableData=e.data)})},onEdit:function(t){this.aid=t,this.dialogFormVisible=!0},choosedefault:function(t,e){var n=this;this.$api.AddressSetAddress(t.name,t.mobile,t.province,t.city,t.district,t.address,1,t.id).then(function(t){1==t.code?(n.$com.showToast("已设置为默认地址","success"),n._AddressIndex()):n.$com.showToast(t.msg||"稍后再试！")})},_addressDel:function(t){var e=this;this.$confirm("此操作将删除该地址, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.delconfirm(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delconfirm:function(t){var e=this;this.$api.addressDel(t).then(function(t){1==t.code&&(e.$com.showToast("删除成功","success"),e._AddressIndex())})},add:function(t){this._AddressIndex()},addnew:function(){this.dialogFormVisible=!0,this.aid=null}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"myadd"},[t._m(0),t._v(" "),t.tabelshow&&t.tableData.length?n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.showloading,expression:"showloading"}],attrs:{data:t.tableData,center:"",border:""}},[n("el-table-column",{attrs:{property:"name",label:"联系人",width:"120",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{property:"mobile",label:"电话",width:"120",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"地址",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.province)+t._s(e.row.city)+t._s(e.row.district)+t._s(e.row.address)+"\n      ")]}}],null,!1,363198998)}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.onEdit(e.row.id)}}},[t._v("编辑")]),t._v(" "),n("el-button",{staticClass:"del",attrs:{type:"text",size:"small"},on:{click:function(n){return t._addressDel(e.row.id)}}},[t._v("删除")])]}}],null,!1,1300049959)}),t._v(" "),n("el-table-column",{attrs:{label:"默认地址",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{class:["checkbox iconfont",1==e.row.is_default?"iconxuanzhong":"iconweixuanzhong"],on:{click:function(n){return t.choosedefault(e.row,e.$index)}}})]}}],null,!1,4108701182)})],1):t._e(),t._v(" "),t.tabelshow&&0==t.tableData.length?n("div",{staticClass:"nodata"},[n("NoData",{attrs:{text:"还没有添加地址"}})],1):t._e(),t._v(" "),n("el-button",{staticClass:"add_btn",attrs:{type:"primary"},on:{click:t.addnew}},[t._v("+新建地址")]),t._v(" "),n("Taddress",{attrs:{show:t.dialogFormVisible,id:t.aid},on:{"update:show":function(e){t.dialogFormVisible=e},add:t.add}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"score_top"},[e("div",{staticClass:"iconbox"},[e("div",{staticClass:"name"},[this._v("地址设置")])])])}]};var i=n("VU/8")(s,a,!1,function(t){n("R0JZ")},"data-v-6c7dccdd",null);e.default=i.exports}});
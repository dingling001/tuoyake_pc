webpackJsonp([39],{hRxR:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("rcEL"),a=i("s85o"),l={name:"competition",data:function(){return{netlist:[],totalPages:0,per_page:10,city:"",lat:0,lng:0,recommend:0,circle:"",keyword:"",district:"",tabs:[{name:"默认排序",order:"1"},{name:"智能排序",order:"2"},{name:"评分最高",order:"3"}],tab:"",order:1,showdata:!1,showlist:!0}},components:{CitySelect:e.a,pcpaging:a.a},created:function(){this.city=this.$com.getCookies("pccity")||"北京",this._GetBarList()},methods:{_GetBarList:function(){var t=this;this.$api.GetBarList(this.page,this.keyword,this.city,this.lat,this.lng,this.recommend,this.label,this.district,this.circle,this.per_page,this.order).then(function(s){t.showdata=!0,t.showlist=!1,1==s.code&&(t.netlist=s.data.data,t.totalPages=s.data.total/t.per_page)})},getPresentPage:function(t){this.showlist=!0,this.page=t,this._GetBarList()},labeledfn:function(t){this.showlist=!0,this.page=1,this.label=t,this._GetBarList()},cityareafn:function(t){this.showlist=!0,this.page=1,this.district=t,this._GetBarList()},removeAll:function(t){this.showlist=!0,this.label="",this.district="",this.page=1,this._GetBarList()},removecity:function(t){this.showlist=!0,this.district=t,this.page=1,this._GetBarList()},removelabel:function(t){this.showlist=!0,this.label=t,this.page=1,this._GetBarList()},allarea:function(t){console.log(t),this.district=t,this.page=1,this._GetBarList()},alllabel:function(t){console.log(t),this.label=t,this.page=1,this._GetBarList()},orderby:function(t,s){this.showlist=!0,this.tab=t,this.order=s,this.page=1,this._GetBarList()},go_detail:function(t){this.$router.push({path:"/competitiondetail/"+t})}}},n={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"cbox"},[i("city-select",{on:{removeall:t.removeAll,labeled:t.labeledfn,cityarea:t.cityareafn,removecity:t.removecity,removelabel:t.removelabel,allarea:t.allarea,alllabel:t.alllabel}}),t._v(" "),i("div",{staticClass:"listbox"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.showlist,expression:"showlist"}],staticClass:"listtab"},t._l(t.tabs,function(s,e){return i("span",{key:s.order,class:{ativetab:t.tab==e},on:{click:function(i){return t.orderby(e,s.order)}}},[t._v(t._s(s.name))])}),0),t._v(" "),t.showdata&&t.netlist.length?i("div",{staticClass:"list"},t._l(t.netlist,function(s,e){return i("div",{key:s.id,staticClass:"recmmentitem",on:{click:function(i){return t.go_detail(s.id)}}},[i("div",{staticClass:"rec_img"},[i("img",{attrs:{src:s.image,alt:""}})]),t._v(" "),i("div",{staticClass:"rec_right"},[i("div",{staticClass:"rec_name"},[t._v(t._s(s.name))]),t._v(" "),i("div",{staticClass:"starbox"},t._l(parseInt(s.star),function(t){return i("span",{staticClass:"iconfont iconstar-fill iconactive"})}),0),t._v(" "),i("div",{staticClass:"typebox"},t._l(s.label_ids,function(s){return i("span",[t._v(t._s(s))])}),0),t._v(" "),i("div",{staticClass:"rec_address single-line-text"},[i("span",{staticClass:"el-icon-location-outline"}),t._v(t._s(s.address))])])])}),0):t._e(),t._v(" "),t.showdata&&0==t.netlist.length?i("div",{staticClass:"list"},[i("NoData",{attrs:{text:"暂无符合条件的商家"}})],1):t._e(),t._v(" "),t.netlist.length?i("pcpaging",{staticClass:"pcpaging",attrs:{totalPages:t.totalPages,pageSize:t.per_page,scrollTo:200},on:{presentPage:t.getPresentPage}}):t._e()],1)],1)},staticRenderFns:[]};var r=i("VU/8")(l,n,!1,function(t){i("nSsB")},"data-v-12edc5b7",null);s.default=r.exports},nSsB:function(t,s){}});
webpackJsonp([9],{Sqs4:function(t,i){},hRxR:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=s("rcEL"),a=s("s85o"),l=s("8CKj"),n={name:"competition",data:function(){return{netlist:[],totalPages:0,per_page:10,city:"",lat:0,lng:0,recommend:0,circle:"",keyword:"",district:"",tabs:[{name:"默认排序",order:"1"},{name:"智能排序",order:"2"},{name:"评分最高",order:"3"}],tab:"",order:1,showdata:!1,showlist:!0,visibleMap:!1,info:{}}},components:{CitySelect:e.a,pcpaging:a.a,amap:l.default},created:function(){this.city=this.$com.getCookies("pccity")||"北京",this._GetBarList()},methods:{_GetBarList:function(){var t=this;this.$api.GetBarList(this.page,this.keyword,this.city,this.lat,this.lng,this.recommend,this.label,this.district,this.circle,this.per_page,this.order).then(function(i){t.showdata=!0,t.showlist=!1,1==i.code&&(t.netlist=i.data.data,t.totalPages=i.data.total/t.per_page)})},getPresentPage:function(t){this.showlist=!0,this.page=t,this._GetBarList()},labeledfn:function(t){this.showlist=!0,this.page=1,this.label=t,this._GetBarList()},cityareafn:function(t){this.showlist=!0,this.page=1,this.district=t,this._GetBarList()},removeAll:function(t){this.showlist=!0,this.label="",this.district="",this.page=1,this._GetBarList()},removecity:function(t){this.showlist=!0,this.district=t,this.page=1,this._GetBarList()},removelabel:function(t){this.showlist=!0,this.label=t,this.page=1,this._GetBarList()},allarea:function(t){console.log(t),this.district=t,this.page=1,this._GetBarList()},alllabel:function(t){console.log(t),this.label=t,this.page=1,this._GetBarList()},orderby:function(t,i){this.showlist=!0,this.tab=t,this.order=i,this.page=1,this._GetBarList()},go_detail:function(t){this.$router.push({path:"/competitiondetail/"+t})},showmap:function(t,i){this.visibleMap=!0,this.info=i}}},o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"cbox"},[s("city-select",{on:{removeall:t.removeAll,labeled:t.labeledfn,cityarea:t.cityareafn,removecity:t.removecity,removelabel:t.removelabel,allarea:t.allarea,alllabel:t.alllabel}}),t._v(" "),s("div",{staticClass:"listbox"},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.showlist,expression:"showlist"}],staticClass:"listtab"},t._l(t.tabs,function(i,e){return s("span",{key:i.order,class:{ativetab:t.tab==e},on:{click:function(s){return t.orderby(e,i.order)}}},[t._v(t._s(i.name))])}),0),t._v(" "),t.showdata&&t.netlist.length?s("div",{staticClass:"list"},t._l(t.netlist,function(i,e){return s("div",{key:i.id,staticClass:"recmmentitem",on:{click:function(s){return t.go_detail(i.id)}}},[s("div",{staticClass:"rec_img"},[s("img",{attrs:{src:i.image,alt:""}}),t._v(" "),i.recommend?s("div",{staticClass:"rec_type"},[t._v("推荐")]):t._e()]),t._v(" "),s("div",{staticClass:"rec_right"},[s("div",{staticClass:"rec_name"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"starbox"},t._l(parseInt(i.star),function(t){return s("span",{staticClass:"iconfont iconstar-fill iconactive"})}),0),t._v(" "),s("div",{staticClass:"typebox"},t._l(i.label_ids,function(i){return s("span",[t._v(t._s(i))])}),0),t._v(" "),s("div",{staticClass:"rec_address single-line-text"},[s("span",{staticClass:"el-icon-location-outline"}),t._v(t._s(i.address)+"\n          ")]),t._v(" "),s("div",{staticClass:"rec_address map",on:{click:function(s){return s.stopPropagation(),t.showmap(e,i)}}},[t._v("查看地图")])])])}),0):t._e(),t._v(" "),t.showdata&&0==t.netlist.length?s("div",{staticClass:"list"},[s("NoData",{attrs:{text:"暂无符合条件的商家"}})],1):t._e(),t._v(" "),t.netlist.length?s("pcpaging",{staticClass:"pcpaging",attrs:{totalPages:t.totalPages,pageSize:t.per_page,scrollTo:200},on:{presentPage:t.getPresentPage}}):t._e()],1),t._v(" "),Object.keys(t.info).length?s("amap",{attrs:{show:t.visibleMap,info:t.info},on:{"update:show":function(i){t.visibleMap=i}}}):t._e()],1)},staticRenderFns:[]};var r=s("VU/8")(n,o,!1,function(t){s("Sqs4")},"data-v-cab0c1aa",null);i.default=r.exports}});
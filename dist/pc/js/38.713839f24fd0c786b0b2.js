webpackJsonp([38],{Fr7f:function(i,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o={render:function(){var i=this,s=i.$createElement,t=i._self._c||s;return t("div",{staticClass:"tcbox"},[t("div",{staticClass:"swiperbox"},[t("div",{staticClass:"swiperimg"},[t("img",{attrs:{src:i.goodinfo.image,alt:""}})]),i._v(" "),t("div",{staticClass:"taocaninfo"},[t("div",{staticClass:"comnanme"},[i._v(i._s(i.goodinfo.name))]),i._v(" "),t("div",{staticClass:"taocandes"},[i._v(i._s(i.goodinfo.content))]),i._v(" "),t("div",{staticClass:"btnbox"},[t("div",{staticClass:"price"},[i._v("套餐价"),t("span",[t("span",[i._v("¥ ")]),i._v(i._s(i.goodinfo.price))])]),i._v(" "),t("div",{staticClass:"numbox"},[t("span",{class:["iconfont iconminus-circle",i.num<=0?"disicon":""],on:{click:i.nminus}}),i._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:i.num,expression:"num"}],attrs:{type:"number",placeholder:""},domProps:{value:i.num},on:{input:function(s){s.target.composing||(i.num=s.target.value)}}}),i._v(" "),t("span",{staticClass:"iconfont iconplus-circle",on:{click:i.plus}})]),i._v(" "),t("div",{staticClass:"taocan_btn",on:{click:i.goapp}},[i._v("￥"+i._s(i.goodinfo.price*i.num)+" 立即抢购")])]),i._v(" "),t("div",{staticClass:"nright",on:{click:i.clllection}},[t("div",{class:["iconfont iconheart-fill",0==i.goodinfo.is_collection?"":"iconactive"]}),i._v(" "),t("div",[i._v(i._s(0==i.goodinfo.is_collection?"收藏":"已收藏"))])])])]),i._v(" "),i.goodinfo.rules.length?t("div",{staticClass:"rulesbox"},[t("div",{staticClass:"tancantitle"},[i._v("购买须知")]),i._v(" "),t("ul",{staticClass:"rules"},i._l(i.goodinfo.rules,function(s,o){return t("li",{key:o},[t("span",{staticClass:"ruletitle"},[i._v(i._s(s.name))]),t("span",[i._v(i._s(s.value))])])}),0)]):i._e(),i._v(" "),i.goodinfo.rules.length?t("div",{staticClass:"rulesbox"},[t("div",{staticClass:"tancantitle"},[i._v("套餐详情")]),i._v(" "),t("div",{staticClass:"content",domProps:{innerHTML:i._s(i.goodinfo.content)}})]):i._e()])},staticRenderFns:[]};var n=t("VU/8")({name:"taocan",data:function(){return{goodinfo:{star:0,rules:[],is_collection:0},cid:"",goods_id:"",num:0,is_share:0}},created:function(){this.$route.params.goods_id?(this.cid=this.$route.params.cid,this.goods_id=this.$route.params.goods_id,this._GetGoodsInfo()):this.$router.replace("/")},methods:{_GetGoodsInfo:function(){var i=this;this.$api.GetGoodsInfo(this.goods_id).then(function(s){1==s.code&&(i.goodinfo=s.data)})},backlist:function(){1==this.is_share?this.$router.push({path:"/competitiondetail",query:{id:this.cid}}):this.$router.go(-1)},clllection:function(){var i=this;this.$api.SetCollection(4,this.goods_id).then(function(s){1==s.code&&(1==s.data.is_collection?(i.$com.showToast("收藏成功","success"),i.goodinfo.is_collection=1):(i.$com.showToast("取消收藏"),i.goodinfo.is_collection=0))})},plus:function(){this.num+=1},nminus:function(){this.num>0&&(this.num-=1)},goapp:function(){this.$router.push("/download")}}},o,!1,function(i){t("qnsh")},"data-v-169424b8",null);s.default=n.exports},qnsh:function(i,s){}});
webpackJsonp([10],{"9rp4":function(i,t){},Fr7f:function(i,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={render:function(){var i=this,t=i.$createElement,o=i._self._c||t;return o("div",{staticClass:"tcbox"},[o("div",{staticClass:"swiperbox"},[o("div",{staticClass:"swiperimg"},[o("img",{attrs:{src:i.goodinfo.image,alt:""}})]),i._v(" "),o("div",{staticClass:"taocaninfo"},[o("div",{staticClass:"comnanme"},[i._v(i._s(i.goodinfo.name))]),i._v(" "),o("div",{staticClass:"taocandes"},[i._v(i._s(i.goodinfo.content))]),i._v(" "),o("div",{staticClass:"btnbox"},[o("div",{staticClass:"price"},[i._v("套餐价"),o("span",[o("span",[i._v("¥ ")]),i._v(i._s(i.goodinfo.price))])]),i._v(" "),o("div",{staticClass:"numbox"},[o("span",{class:["iconfont iconminus-circle",i.num<=0?"disicon":""],on:{click:i.nminus}}),i._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:i.num,expression:"num"}],attrs:{type:"number",placeholder:""},domProps:{value:i.num},on:{input:function(t){t.target.composing||(i.num=t.target.value)}}}),i._v(" "),o("span",{staticClass:"iconfont iconplus-circle",on:{click:i.plus}})]),i._v(" "),o("div",{staticClass:"taocan_btn",on:{click:i.goapp}},[i._v("￥"+i._s(i.goodinfo.price*i.num)+" 立即抢购")])]),i._v(" "),o("div",{staticClass:"nright",on:{click:i.clllection}},[o("div",{class:["iconfont iconheart-fill",0==i.goodinfo.is_collection?"":"iconactive"]}),i._v(" "),o("div",[i._v(i._s(0==i.goodinfo.is_collection?"收藏":"已收藏"))])])])]),i._v(" "),i.goodinfo.rules.length?o("div",{staticClass:"rulesbox"},[o("div",{staticClass:"tancantitle"},[i._v("购买须知")]),i._v(" "),o("ul",{staticClass:"rules"},i._l(i.goodinfo.rules,function(t,s){return o("li",{key:s},[o("span",{staticClass:"ruletitle"},[i._v(i._s(t.name))]),o("span",[i._v(i._s(t.value))])])}),0)]):i._e(),i._v(" "),i.goodinfo.rules.length?o("div",{staticClass:"rulesbox"},[o("div",{staticClass:"tancantitle"},[i._v("套餐详情")]),i._v(" "),o("div",{staticClass:"content",domProps:{innerHTML:i._s(i.goodinfo.content)}})]):i._e()])},staticRenderFns:[]};var n=o("VU/8")({name:"taocan",data:function(){return{goodinfo:{star:0,rules:[],is_collection:0},cid:"",goods_id:"",num:0,is_share:0}},created:function(){this.$route.params.goods_id?(this.cid=this.$route.params.cid,this.goods_id=this.$route.params.goods_id,this._GetGoodsInfo()):this.$router.replace("/")},methods:{_GetGoodsInfo:function(){var i=this;this.$api.GetGoodsInfo(this.goods_id).then(function(t){1==t.code&&(i.goodinfo=t.data)})},backlist:function(){1==this.is_share?this.$router.push({path:"/competitiondetail",query:{id:this.cid}}):this.$router.go(-1)},clllection:function(){var i=this;this.$api.SetCollection(4,this.goods_id).then(function(t){1==t.code&&(1==t.data.is_collection?(i.$com.showToast("收藏成功","success"),i.goodinfo.is_collection=1):(i.$com.showToast("取消收藏"),i.goodinfo.is_collection=0))})},plus:function(){this.num+=1},nminus:function(){this.num>0&&(this.num-=1)},goapp:function(){}}},s,!1,function(i){o("9rp4")},"data-v-b87a0920",null);t.default=n.exports}});
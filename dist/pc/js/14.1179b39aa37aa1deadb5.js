webpackJsonp([14],{Fr7f:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"tcbox"},[s("div",{staticClass:"swiperbox"},[s("div",{staticClass:"swiperimg"},[s("img",{attrs:{src:t.goodinfo.image,alt:""}})]),t._v(" "),s("div",{staticClass:"taocaninfo"},[s("div",{staticClass:"comnanme"},[t._v(t._s(t.goodinfo.name))]),t._v(" "),s("div",{staticClass:"taocandes",domProps:{innerHTML:t._s(t.goodinfo.content)}}),t._v(" "),s("div",{staticClass:"btnbox"},[s("div",{staticClass:"price"},[t._v("套餐价"),s("span",[s("span",[t._v("¥ ")]),t._v(t._s(t.goodinfo.price))])]),t._v(" "),s("div",{staticClass:"numbox"},[s("span",{class:["iconfont iconminus-circle",t.num<=1?"disicon":""],on:{click:t.nminus}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.num,expression:"num"}],attrs:{type:"number",placeholder:""},domProps:{value:t.num},on:{input:function(i){i.target.composing||(t.num=i.target.value)}}}),t._v(" "),s("span",{staticClass:"iconfont iconplus-circle",on:{click:t.plus}})]),t._v(" "),t.goodinfo.price?s("div",{staticClass:"taocan_btn",on:{click:t.goapp}},[t._v("￥"+t._s(t.goodinfo.price*t.num)+" 立即抢购")]):t._e()]),t._v(" "),s("div",{staticClass:"nright",on:{click:t.clllection}},[s("div",{class:["iconfont iconheart-fill",0==t.goodinfo.is_collection?"":"iconactive"]}),t._v(" "),s("div",[t._v(t._s(0==t.goodinfo.is_collection?"收藏":"已收藏"))])])])]),t._v(" "),t.recommendlist.length?s("div",{staticClass:"rulesbox"},[t._m(0),t._v(" "),s("div",{staticClass:"recommend_list"},t._l(t.recommendlist,function(i,o){return s("div",{key:i.id,staticClass:"rec_right",on:{click:function(s){return t.go_detail(i.id)}}},[s("div",{staticClass:"rec_name single-line-text"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"starbox"},t._l(parseInt(i.star),function(t){return s("span",{staticClass:"iconfont iconstar-fill iconactive"})}),0),t._v(" "),s("div",{staticClass:"typebox single-line-text"},t._l(i.label_ids,function(i){return s("span",[t._v(t._s(i))])}),0),t._v(" "),s("div",{staticClass:"rec_address single-line-text"},[s("span",{staticClass:"el-icon-location-outline"}),t._v(t._s(i.address)+"\n        ")])])}),0)]):t._e(),t._v(" "),t.goodinfo.rules.length?s("div",{staticClass:"rulesbox"},[t._m(1),t._v(" "),s("ul",{staticClass:"rules"},t._l(t.goodinfo.rules,function(i,o){return s("li",{key:o},[s("span",{staticClass:"ruletitle"},[t._v("【"+t._s(i.name)+"】")]),s("span",[t._v(t._s(i.value))])])}),0)]):t._e(),t._v(" "),t.goodinfo.rules.length?s("div",{staticClass:"rulesbox"},[t._m(2),t._v(" "),s("div",{staticClass:"content",domProps:{innerHTML:t._s(t.goodinfo.content)}})]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"taocantitle"},[i("span",{staticClass:"iconfont iconxihuan"}),this._v(" 猜你喜欢")])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"taocantitle"},[i("span",{staticClass:"iconfont icongoumaixuzhi"}),this._v(" 购买须知")])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"taocantitle"},[i("span",{staticClass:"iconfont icontaocanxiangqing"}),this._v(" 套餐详情")])}]};var n=s("VU/8")({name:"taocan",data:function(){return{goodinfo:{star:0,rules:[],is_collection:0},cid:"",goods_id:"",num:1,is_share:0,recommendlist:[]}},created:function(){this.$route.params.goods_id?(this.cid=this.$route.params.cid,this.goods_id=this.$route.params.goods_id,this._GetGoodsInfo()):this.$router.replace("/")},methods:{_GetGoodsInfo:function(){var t=this;this.$api.GetGoodsInfo(this.goods_id).then(function(i){1==i.code&&(t.goodinfo=i.data,t._GetRecommendBarByGoods())})},go_detail:function(t){this.$router.push({path:"/competitiondetail/"+t})},_GetRecommendBarByGoods:function(){var t=this;this.$api.GetRecommendBarByGoods(this.goods_id).then(function(i){1==i.code&&(t.recommendlist=i.data)})},backlist:function(){1==this.is_share?this.$router.push({path:"/competitiondetail",query:{id:this.cid}}):this.$router.go(-1)},clllection:function(){var t=this;this.$api.SetCollection(4,this.goods_id).then(function(i){1==i.code?1==i.data.is_collection?(t.$com.showToast("收藏成功","success"),t.goodinfo.is_collection=1):(t.$com.showToast("取消收藏"),t.goodinfo.is_collection=0):t.$com.showToast(i.msg)})},plus:function(){this.num+=1},nminus:function(){this.num>1&&(this.num-=1)},goapp:function(){this.$router.push("/download")}}},o,!1,function(t){s("G2f9")},"data-v-8acd8bc8",null);i.default=n.exports},G2f9:function(t,i){}});
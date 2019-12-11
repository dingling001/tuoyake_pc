<template>
  <el-dialog title="网咖地图"
             :visible.sync="visible"
             width="1200px"
             @close="$emit('update:show', false)"
             :show="show" center>
<!--    <el-amap vid="amapDemo" class="amap" zoom="12" :center=" [info.lng,info.lat]" :plugin="plugin">-->
<!--      <el-amap-info-window :position="window.position" :content="window.content"></el-amap-info-window>-->
<!--      <el-amap-marker vid="component-marker" :position="componentMarker.position"-->
<!--                      :content-render="componentMarker.contentRender"></el-amap-marker>-->
<!--    </el-amap>-->
    <iframe class="amap" :src="'https://uri.amap.com/marker?position='+info.lng+','+info.lat+'&name='+info.name+'&src='+info.address+'&coordinate=gaode&callnative=0'" frameborder="0"></iframe>
  </el-dialog>
</template>
<!--https://www.amap.com/search?query=%E5%8D%8E%E8%8B%91%E5%9C%B0%E9%93%81%E7%AB%99&city=120000&geoobj=116.601453%7C38.803689%7C117.590247%7C39.207617&zoom=11-->
<!--<script>-->
<!--  export default {-->
<!--    name: "amap",-->
<!--    // !this.$com.checkPhone(this.ruleForm.account)-->
<!--    data() {-->
<!--      return {-->
<!--        visible: this.show,-->
<!--        map: null,-->
<!--        zoom: 22,-->
<!--        plugin: [{-->
<!--          pName: 'MapType',-->
<!--          defaultType: 0,-->
<!--          events: {-->
<!--            init(instance) {-->
<!--              console.log(instance);-->
<!--            }-->
<!--          }-->
<!--        }],-->
<!--componentMarker:{-->
<!--position:this.center,-->
<!--contentRender: (h, instance) => {-->
<!--// if use jsx you can write in this-->
<!--// return-->
<!--<div-->
<!--  style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>-->
<!--return h(-->
<!--'div',-->
<!--{-->
<!--style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},-->
<!--on: {-->
<!--click: () => {-->
<!--const position = this.renderMarker.position;-->
<!--this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];-->
<!--}-->
<!--}-->
<!--},-->
<!--['marker inner text']-->
<!--)-->
<!--}-->
<!--}-->
<!--};-->
<!--},-->
<!--    props: {-->
<!--      show: {-->
<!--        type: Boolean,-->
<!--        default: false-->
<!--      },-->
<!--      center: {-->
<!--        type: Array,-->
<!--        default: [116.397428, 39.90923]-->
<!--      }-->
<!--    },-->
<!--    watch: {-->
<!--      show() {-->
<!--        this.visible = this.show;-->
<!--      },-->
<!--    },-->
<!--    mounted() {-->
<!--      console.log(AMap)-->
<!--      // this.GaodeMap()-->
<!--      console.log(this.center)-->
<!--    },-->
<!--    methods: {-->
<!--      GaodeMap() {-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->
<script>
  module.exports = {
    data: function () {
      let self = this;
      return {
        visible: this.show,
        zoom: 12,
        // center: [121.59996, 31.197646],
        address: '',
        events: {
          click(e) {
            let {lng, lat} = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  self.$nextTick();
                }
              }
            });
          }
        },
        lng: 0,
        lat: 0,
        windows: [
          {
            position: [this.info.lng, this.info.lat],
            content: 'Hi! I am here!',
            visible: true,
            events: {
              close() {
                console.log('close infowindow1');
              }
            }
          },
        ],
        slotWindow: {
          position: [this.info.lng, this.info.lat],
        },
        currentWindow: {
          position: [this.info.lng, this.info.lat],
          content: '',
          events: {},
          visible: false
        },
        plugin: [
          {
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          },
          {
            pName: 'ToolBar',
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          }
        ],
        componentMarker: {
          position: [this.info.lng, this.info.lat],
          contentRender: (h, instance) => {
            // if use jsx you can write in this
            // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
            return h(
              'div',
              {
                style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                on: {
                  click: () => {
                    const position = this.renderMarker.position;
                    this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                  }
                }
              },
              [`<div>1233554</div>`]
            )
          }
        },
        window: {
          position: [this.info.lng, this.info.lat],
          content: `<div class="markerbox">
<div class="name">${this.info.name}</div>
<div class="address">${this.info.address}</div>
<div class="address synopsis">${this.info.synopsis}</div>
<div class="goto"><a href="" target="_blank">公交/驾车路线查询»</a></div>
</div>`
        },
      };
    },
    created() {
      console.log(this.info)
    },
    watch: {
      show() {
        this.visible = this.show
      },
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      // center: {
      //   type: Array,
      //   default: [116.397428, 39.90923]
      // },
      info: {
        type: Object,
        default: {}
      }
    },

  };
</script>
<style lang="scss" scoped>
  @import "../style/reset";

  /deep/ .el-dialog {
    .amap {
      width: 1140px;
      height: 692px;

      .markerbox {
        width: 248px;
        min-height: 82px;
        cursor: pointer;

        .name {
          font-size: 14px;
          font-weight: 900;
          line-height: 25px;
        }

        .address {
          font-size: 12px;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.synopsis {
            color: #666;
            line-height: 30px;
            min-height: 25px;
          }
        }

        .goto {
          line-height: 30px;

          a {
            color: $baseBlue;
          }
        }
      }
    }
  }

</style>


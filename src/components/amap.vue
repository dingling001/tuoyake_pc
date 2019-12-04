<template>
  <div class="map_mold" v-if="centerDialogVisible" @click="centerDialogVisible=false">
    <div id="container" class="map" @click.stop></div>
  </div>
</template>

<script>
  import AMap from 'AMap'

  var map, marker;
  export default {
    name: "amap",
    data() {
      return {
        amap: null,
        // arriveCoor: [108.947025, 34.2613255],//定位坐标
        arrive: "",//具体信息
        centerDialogVisible:true
      }
    },
    props: {
      arriveCoor: {
        type: Array,
        // default: [108.947025, 34.2613255],
      }
    },
    mounted() {
      console.log(AMap)
      // this.amap = new AMap.Map('container');
      this.mapDraw(this.arriveCoor);
      this.mapCoor(this.arriveCoor)
    },
    methods: {
      mapDraw(arriveCoor) {
        map = new AMap.Map('container', {   //map-location是嵌地图div的id
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 16, //初始化地图层级
          center: arriveCoor //初始化地图中心点
        });
        // 定位点
        this.addMarker(arriveCoor);
      },
      // 实例化点标记
      addMarker(arriveCoor) {
        var _this = this;
        marker = new AMap.Marker({
          icon: "",  //图片ip
          imageSize: "20px",
          position: arriveCoor,
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move',
          // 设置拖拽效果
          raiseOnDrag: true
        });
        marker.setMap(map);
      },
      // 查询坐标
      mapCoor(lnglatXY) {
        var _this = this;
        AMap.service('AMap.Geocoder', function () {//回调函数
          var geocoder = new AMap.Geocoder({});
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              //获得了有效的地址信息:
              _this.arrive = result.regeocode.formattedAddress;
            } else {
              _this.arrive = "暂无位置";
            }
          })
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .map_mold {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 99999;

    .map {
      width: 1040px;
      height: 550px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: #000;
    }

  }
</style>

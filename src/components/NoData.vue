<template>
  <div class="nodatabox" :style="{top:top+'px'}">
    <span class="iconfont iconzanwushuju"></span>
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: "NoData",
    props: {
      'img': {
        type: String,
        default: require('../img/index/nodata1.png')
      },
      'top': {
        type: Number || String,
        default: 0
      },
      'text': {
        type: String,
        default: '对不起，没有符合条件的商家'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../style/reset";

  .nodatabox {
    position: absolute;
    z-index: 9;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      /*width: 297px;*/
      /*height: auto;*/
      width: 100px;
      /*height: 111px*/
    }

    .iconfont {
      font-size: 75px;
      color: $baseBlue;
      opacity: .5;
    }

    .text {
      line-height: 40px;
      font-size: 14px;
      /*px*/
      color: #ccc;
    }
  }
</style>

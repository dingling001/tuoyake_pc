<template>
  <div class="netbox">
    <div class="netitem">
      <!--      <span class="iconfont iconzanwushuju"></span>-->
      <div class="netimg"><img src="../img/index/nonet.png" alt=""></div>
      <div class="text">网络连接超时了</div>
      <a href="">
        <el-button type="warning" plain>刷新</el-button>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NetError",
  }
</script>

<style scoped lang="scss">
  .netbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99999;
    text-align: center;

    .netitem {
      position: absolute;
      /*width: 300px;*/
      height: 300px;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;

      .netimg {
        display: block;
        width: 600px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }

      .iconfont {
        font-size: 70px;
        color: #ddd;
      }

      .text {
        padding: 15px 0;
        font-size: 20px;
        color: #ccc;
      }
    }

  }
</style>

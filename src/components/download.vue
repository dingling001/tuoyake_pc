<template>
  <el-card class="download">
    <div class="tips">请扫下方二维码下载官方app进行下单支付</div>
    <div class="tipitem">下单支付流程已调到手机端</div>
    <div class="downloadbox">
      <div class="downloaditem">
        <img src="../img/index/android.png" alt="">
        <a href="https://android.myapp.com/myapp/detail.htm?apkName=com.yt.tyk" target="_blank"><span class="iconfont iconiconfontanzhuo"></span>Android下载</a>
      </div>
      <div class="downloaditem">
        <img src="../img/index/ios.png" alt="">
        <a href="https://apps.apple.com/cn/app/%E6%89%98%E4%BA%9A%E5%85%8B/id1486551960" target="_blank"><span class="iconfont iconpingguo"></span>iPhone下载</a>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "download"
  }
</script>

<style scoped lang="scss">
  .download {
    width: 1200px;
    background-color: #fff;
    margin: 50px auto;
    text-align: center;
    min-height: 500px;

    .tips {
      color: #333333;
      font-weight: bold;
      font-size: 20px;
      padding: 30px 0 0 0;
    }

    .tipitem {
      color: #666;
      font-size: 16px;
      line-height: 50px;
    }

    .downloadbox {
      overflow: hidden;
      margin: 0 250px;
      padding: 80px 0;

      .downloaditem {
        float: left;
        width: 300px;
        text-align: center;
        border: 1px solid #CCCCCC;
overflow: hidden;
        &:last-child {
          float: right;
        }
img{
  width: 100%;
}
        a {
          line-height: 60px;
          display: inline-block;
          width: 100%;
        }

        .iconfont {
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
  }
</style>

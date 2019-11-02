<template>
  <div id="page" class="page">
    <el-pagination
      background
      layout="prev, pager, next,jumper"
      @current-change="handleCurrentChange"
      :page-size="1"
      :total="totalPages">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      "totalPages": {}, //总页数
      'scrollTo': {
        type:  Number,
        default: 0,
      }
    },
    data() {
      return {};
    },
    methods: {
      handleCurrentChange(val) {
        window.scrollTo(0, this.scrollTo);
        this.$emit("presentPage", val);
      }
    }
  };
</script>

<style lang="scss">
  .page {
    margin: 0 auto;
    padding: 0 0 63px 0;
    width: 1200px;
    text-align: center;

    /deep/ .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
      background: none;
      border: 1px solid #E4E4E4;
    }
  }
</style>

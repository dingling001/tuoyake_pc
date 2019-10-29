<template>
  <div class="citybox">
    <div class="cityitem">
      <span>区域</span>
      <span>全部</span>
      <span v-for="(item,index) in districtlist">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CItySelect",
    data() {
      return {
        citypid: '',
        city: '天津市',
        districtlist: []
      }
    },
    created() {
      this._GetAreaPidByName()
    },
    methods: {
      // 根据城市换取id
      _GetAreaPidByName() {
        this.$api.GetAreaPidByName(this.city).then(res => {
          console.log(res)
          // console.log(`${JSON.stringify(res)}res`)
          // Bus.$emit("citypid", res.data)
          // Bus.$emit("city", this.city);
          // Bus.$emit('lat', this.lat);
          // Bus.$emit('lng', this.lng);
          this.citypid = res.data;
          this._GetAreaListTree();

        })
      },
      // 获取当前城市的区
      _GetAreaListTree() {
        this.$api.GetAreaListTree(this.citypid).then(res => {
          this.districtlist = res.data
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .citybox {
    height: 43px;

    .cityitem {
      span {
        display: inline-block;
        margin-right: 64px;
      }
    }
  }
</style>

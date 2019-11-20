<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd v-for="item in list" :key="item.id">
        {{item.name==="市辖区"?item.province:item.name}}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  async mounted() {
    // let {status,data:{hots}} = await this.$axios.get('/geo/hotCity')
    // if(status === 200) {
    //   this.list = hots
    // }
  },
}
</script>

<style lang="scss">
  .m-hcity {
    dl {
      display: flex;

      dt {
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }

      dd {
        margin: 0 20px;
        color: #666;
        line-height: 22px;
      }
    }
  }
</style>

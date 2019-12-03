<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd v-for="item in list" :key="item.id" @click="changecity(item.name)">
        {{item.name==="市辖区"?item.province:item.name}}
      </dd>
    </dl>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            name: '北京',
            id: 1
          },
          {
            name: '天津',
            id: 2
          },
          {
            name: '上海',
            id: 3
          },
          {
            name: '重庆',
            id: 4
          },
          {
            name: '广州',
            id: 5
          },
          {
            name: '深圳',
            id: 6
          }, {
            name: '杭州',
            id: 7
          }, {
            name: '武汉',
            id: 8
          }, {
            name: '成都',
            id: 9
          },
        ]
      }
    },
    async mounted() {
      // let {status,data:{hots}} = await this.$axios.get('/geo/hotCity')
      // if(status === 200) {
      //   this.list = hots
      // }
    },
    methods:{
      changecity(c) {
        // localStorage.city = c;
        this.$com.setCookie('pccity',c);
        location.href = '/'
        // this.$router.replace('/')

      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/reset";
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
        cursor: pointer;
        &:hover{
          color: $baseBlue;
        }
      }
    }
  }
</style>

<template>
  <div class="m-hcity">
    <dt>热门城市</dt>
    <dl>
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
        // 长沙 南京 郑州   武汉  西安  苏州  太原  石家庄   福州  济南  南宁  大连   沈阳   吉林   哈尔滨   呼和浩特   乌鲁木齐  银川  贵州  昆明 南昌
        list: [
          {
            name: '北京',
            id: 100
          },
          {
            name: '天津',
            id: 200
          },
          {
            name: '上海',
            id: 300
          },
          {
            name: '重庆',
            id: 400
          },
          {
            name: '广州',
            id: 500
          },
          {
            name: '深圳',
            id: 600
          }, {
            name: '杭州',
            id: 700
          },
          {
            name: '青岛',
            id: 801
          },
          {
            name: '武汉',
            id: 800
          }, {
            name: '成都',
            id: 900
          },
          {
            name: '长沙',
            id: 1
          },
          {
            name: '南京',
            id: 2
          },
          {
            name: '郑州',
            id: 3
          },
          {
            name: '武汉',
            id: 4
          },
          {
            name: '西安',
            id: 5
          },
          {
            name: '苏州',
            id: 6
          }, {
            name: '太原',
            id: 7
          }, {
            name: '石家庄',
            id: 8
          }, {
            name: '福州',
            id: 9
          },
          {
            name: '济南',
            id: 10
          },
          {
            name: '南宁',
            id: 11
          }, {
            name: '大连',
            id: 12
          }, {
            name: '沈阳',
            id: 13
          }, {
            name: '吉林',
            id: 14
          },
          {
            name: '哈尔滨',
            id: 15
          }, {
            name: '呼和浩特',
            id: 16
          }, {
            name: '乌鲁木齐',
            id: 17
          }, {
            name: '银川',
            id: 18
          }, {
            name: '贵州',
            id: 19
          },
          {
            name: '昆明',
            id: 20
          }, {
            name: '南昌',
            id: 21
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
    methods: {
      changecity(c) {
        // localStorage.city = c;
        this.$com.setCookie('pccity', c);
        location.href = '/'
        // this.$router.replace('/')

      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/reset";

  .m-hcity {
    dt {
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }

    dl {
      display: flex;
      flex-wrap: wrap;
      padding-left: 50px;

      dd {
        /*margin: 0 20px;*/
        min-width: 70px;
        text-align: center;
        color: #666;
        line-height: 30px;
        cursor: pointer;

        &:hover {
          color: $baseBlue;
        }
      }
    }
  }
</style>

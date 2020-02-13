<template>
  <div class="freebox">
    <div class="bannerbox">
      <img src="../../img/indexs/index_banner.jpg" alt="">
    </div>
    <div class="freelist">
      <div class="recommentleft"><span class="iconfont icongoumaixuzhi"></span> <span>有偿资讯</span></div>

      <div class="freeitem" v-for="(item,index) in list" :key="index">
        <div class="content single-line-text"><span class="date">{{item.date}}</span>{{item.content}}</div>
        <div class="more" @click="lookdetail">查看</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "free",
    data() {
      return {
        date: '',
        list: [
          {
            date: '2020-1-10',
            content: '英雄联盟<云顶之羿>比赛 吃鸡奖励  资讯'
          },
          {
            date: '2019-12-09',
            content: '英雄联盟<召唤师峡谷>比赛  5杀  奖励  资讯'
          },
          {
            date: '2019-9-25',
            content: '英雄联盟<召唤师峡谷>比赛  10连胜  奖励  资讯  '
          },
          {
            date: '2019-7-09',
            content: '绝地求生比赛   吃鸡  奖励  资讯'
          },
          {
            date: '2019-6-18',
            content: '电竞比赛场地   报名   资讯  '
          },
          {
            date: '2019-4-03',
            content: '托亚克年度比赛总冠军战队 奖金  资讯'
          },
          {
            date: '2019-8-20',
            content: '托亚克比赛规则积分兑换奖励 资讯 '
          },
          {
            date: '2019-2-19',
            content: '托亚克电竞场地  设备收费标准套餐  资讯'
          },
        ]
      }
    },
    created() {
      // this.date = new Date().toLocaleString(`default`, {
      //   day: `2-digit`,
      //   hour: `2-digit`,
      //   hour12: false,
      //   minute: `2-digit`,
      //   month: `2-digit`,
      //   second: `2-digit`,
      //   year: `numeric`,
      // })
      //   .replace(/[^\d\s\u003a]/gu, `\u002d`);
    },
    methods: {
      lookdetail() {
        this.$confirm('友情提示：当前资讯600元/年', '有偿资讯', {
          distinguishCancelAndClose: true,
          showClose: true,
          confirmButtonText: '注册',
          cancelButtonText: '登陆'
        })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(action => {
            console.log(action)
            if (action == 'close') {

            } else if (action == 'cancel') {
              this.$router.push('/login')

            }
            // this.$message({
            //   type: 'info',
            //   message: action === 'cancel'
            //     ? '放弃保存并离开页面'
            //     : '停留在当前页面'
            // })
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .freebox {
    width: 1200px;
    margin: 20px auto;

    .bannerbox {
      img {
        width: 100%;
      }
    }

    .freelist {
      padding-bottom: 100px;

      .recommentleft {
        font-size: 16px;
        font-weight: bold;
        padding: 20px;

        .iconfont {
          color: $baseRed;
          background-image: -webkit-linear-gradient(bottom, $baseRed, #86AEFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .freeitem {
        padding: 15px;
        cursor: pointer;
        margin-bottom: 10px;

        &:hover .content {
          color: $baseBlue;
        }

        .content {
          max-width: 800px;
          float: left;
          color: #333;
          font-size: 16px;

          .date {
            font-size: 14px;
            color: #666;
            margin-right: 10px;
          }
        }

        .more {
          float: right;
          color: $baseBlue;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>

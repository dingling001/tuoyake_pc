<template>
  <div class="rbox">
    <div class="iconbox" @click="myAddress()">
      <div class="name">积分规则</div>
      <div class="achieve_right"><span>我的积分</span><span class="iconfont iconjiantou"></span></div>
    </div>
    <div class="rulebox">{{content}}</div>

  </div>
</template>

<script>
    export default {
        name: "myRules",
        data() {
            return {
                content: ''
            }
        },
        created() {
            if(this.$route.query.is_sign==1){
                this._SignRule();
            }else{
                this._ScoreRule();
            }
        },
        methods: {
            // 积分规则说明
            _ScoreRule() {
                this.$api.ScoreRule().then(res => {
                    if (res.code == 1) {
                        this.content = res.data.content;

                    }
                })
            },
            _SignRule() {
                this.$api.SignRule().then(res => {
                    if (res.code == 1) {
                        this.content = res.data.content;

                    }
                })
            },
          // 去我的积分
          myAddress() {
            this.$router.push({path: '/my/myPoints'})
          },

        }
    }
</script>

<style scoped lang="scss">
  @import '../../style/reset';
  .rbox{
    .iconbox {
      line-height: 44px;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;

      .name {
        font-size: 18px;
        color: #333;
        float: left;
      }

      .iconfanhui {
        font-weight: bold;
      }

      .achieve_right {
        float: right;
        cursor: pointer;
        line-height: 47px;

        &:hover {
          color: $baseRed;
        }

        span {
          line-height: 47px;
          display: inline-block;

          &.iconfont {
            font-size: 15px;
          }
        }
      }

    }
    .rulebox {
      padding: 25px 16px;
      line-height: 20px;
      font-size: 14px;
      /*px*/
    }
  }

</style>

<template>
  <div>
    <div class="thead">
      <div class="taddress">
        <span class="iconfont iconchakantiezidingwei"></span>
        <span class="city">{{city}}</span>
        <span class="change" @click="changCity">[切换城市]</span>
        <span class="login">
          <span class="loginbox" v-if="!tyktoken">
            <span class="reg" @click="login_fn">立即登录</span>
            <router-link to="/reg" tag="span">注册</router-link>
          </span>
            <span class="loginbox" v-else>
            <span class="reg" title="个人中心" @click="gomy">{{getTimeState}}，{{user_info.nickname}}</span>
            <span @click="loginout">退出</span>
          </span>
        </span>
        <span class="business">商家中心</span>
      </div>
    </div>
    <div class="tnav">
      <div class="tnavtop">
        <div class="tlogo" @click="$router.push('/')">
          <img src="../img/index/index_logo.png" alt="">
        </div>
        <div class="tinput">
          <el-input
            placeholder="搜索网吧或相关赛事"
            v-model="tkeyword"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="gosearch">搜索</el-button>
        </div>
        <el-button type="danger" @click="godownload"><i class="iconfont iconshouji"></i> 下载APP</el-button>
      </div>
      <div class="tnavbottom" v-if="shownav">
        <div :class="cur==index?'tnavitem tnavitemactive':'tnavitem'" :key="index"
             v-for="(item,index) in navs" @click="gonav(index,item.path)">{{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cur: 0,
        city: '北京市',
        top: 0,
        tyktoken: '',
        tkeyword: '',
        navs: [
          {
            name: '首页',
            path: '/'
          },
          {
            name: '电竞馆',
            path: '/competition'
          },
          {
            name: '电竞学院',
            path: '/school'
          },
          {
            name: '电竞俱乐部',
            path: '/club'
          },
          {
            name: '关于我们',
            path: '/about'
          },
        ],
        user_info: {}
      };
    },
    props: {
      shownav: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      $route: {
        handler(val) {
          console.log(val)
          this.cur = val.meta.cur;
        }
      }
    },
    computed: {
      getTimeState() {
        // 获取当前时间
        let timeNow = new Date();
        let hours;
        // 获取当前小时
        hours = timeNow.getHours();
        setInterval(() => {
          hours = timeNow.getHours();
        }, 1000);
        // 设置默认文字
        let text = ``;
        // 判断当前时间段
        if (hours >= 0 && hours <= 10) {
          text = `早上好`;
        } else if (hours > 10 && hours <= 14) {
          text = `中午好`;
        } else if (hours > 14 && hours <= 18) {
          text = `下午好`;
        } else if (hours > 18 && hours <= 24) {
          text = `晚上好`;
        }
        // 返回当前时间段对应的状态
        return text;
      }
    },
    created() {
      this.tyktoken = this.$com.getCookies('user_tpc');
      console.log(this.$com.getCookies('pccity'));
      this.city = this.$com.getCookies('pccity');
      if (this.tyktoken) {
        this._GetUserInfo()
      }

    },
    methods: {
      // 获取个人信息
      _GetUserInfo() {
        this.$api.GetUserInfo().then(res => {
          // console.log(res)
          if (res.code == 1) {
            this.user_info = res.data;
          } else {
            this.$com.showToast(res.msg || '登录已失效');
            this.$com.Cookie.remove('user_tpc');
            this.tyktoken = '';
            this.$router.push('/login')
          }
        })
      },
      // 去登录
      login_fn() {
        this.$router.push({path: '/login'})
      },
      // 切换城市
      changCity() {
        // console.log('切换城市')
        this.$router.push({path: '/changecity/'})
      },
      // 跳转
      gonav(index, path) {
        this.cur = index;
        this.$router.push({path: path})
      },
      handleScroll() {
        this.top =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      },

      // 搜索
      gosearch() {
        if (this.tkeyword) {
          this.$router.push({path: `/search/${this.tkeyword}`})
        }
      },
      // 退出登录
      loginout() {
        localStorage.removeItem('user_tpc');
        this.$com.Cookie.remove('user_tpc')
        this.tyktoken = '';
        this.$com.showToast('退出登录', 'warning')
        this.$router.replace('/')
      },
      // 个人中心
      gomy() {
        this.$router.push({path: '/my'})
      },
      // 下载
      godownload() {
        this.$router.push({path: '/download'})
      }
    },
    beforeRouteEnter(to, form, next) {
      console.log(this)
      if (to.meta.cur) {
        next.cur = to.cur;
      }
      next()
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
      document.title = '托亚克 | ' + this.city;
    },

  };
</script>


<style scoped lang="scss">
  @import "../style/reset";

  .thead {
    background-color: #f4f4f4;

    .taddress {
      width: 1200px;
      margin: 0 auto;
      padding: 13px 0;
      font-size: 12px;
      color: #777;
      overflow: hidden;
      position: relative;

      .change {
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }

      .iconfont {
        color: #999999;
      }

      .city {
        padding: 0 6px;
      }

      .login {
        margin-left: 30px;

        .loginbox {
          span {
            cursor: pointer;

            &:hover {
              color: $baseRed;
            }
          }

          .reg {
            color: $baseRed;
            padding: 0 5px;
          }
        }

      }

      .business {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        line-height: 40px;
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }
    }
  }

  .tnav {
    background-color: #fff;

    &top {
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0;
      overflow: hidden;

      .tlogo {
        width: 203px;
        /*height: 20px;*/
        font-size: 0;
        /*padding: 0 10px 0 0;*/
        /*border-right: 1px solid #eee;*/
        margin-right: 37px;
        float: left;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      .tinput {
        width: 655px;
        float: left;

        /deep/ .el-input {
          width: 555px;
          float: left;
          border-radius: 0;

          input {
            border-radius: 0;
          }
        }

        /deep/ .el-button.el-button--primary {
          float: left;
          text-align: center;
          width: 100px;
          border-radius: 0;
          background-color: $baseBlue;
          border: 0;
          padding: 13px 0;
        }
      }

      /deep/ .el-button.el-button--danger {
        float: right;
        text-align: center;
        width: 173px;
        border-radius: 0;
        background-color: $baseRed;
        border: 0;
        padding: 13px 0;
      }

    }

    &bottom {
      overflow: hidden;
      width: 1200px;
      margin: 0 auto;

      .tnavitem {
        margin-right: 56px;
        font-size: 16px;
        color: #333333;
        float: left;
        cursor: pointer;
        padding: 11px 0;
        border-bottom: 2px solid #fff;
        transition: ease-in-out .3s;

        &:hover {
           color: $baseBlue;
          border-color: $baseBlue;
          font-weight: bold;
        }
      }

      .tnavitemactive {
        color: $baseBlue;
        border-color: $baseBlue;
        font-weight: bold;
      }
    }
  }
</style>

<template>
  <div class="setbox">
    <div class="score_top">
      <div class="iconbox">
        <div class="name">账户设置</div>
      </div>
    </div>
    <div class="setarea">
      <el-row>
        <el-col :span="4" class="label">头像</el-col>
        <el-col :span="20">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="handleUpload"
          >
            <img v-if="user_info.avatar" :src="user_info.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-button solt>修改</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="label">昵称</el-col>

        <el-col :span="12">{{user_info.nickname}}</el-col>
        <el-col :span="8">
          <el-button @click="showname=true">修改</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="label">修改手机号</el-col>

        <el-col :span="12">{{user_info.mobile}}</el-col>
        <el-col :span="8">
          <el-button @click="showname=true">修改</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="label">登录密码</el-col>
        <el-col :span="12">更改密码</el-col>

        <el-col :span="8">
          <el-button @click="showname=true">修改</el-button>
        </el-col>
      </el-row>
      <!--<div title="手机号" :value="user_info.mobile" to="changephone" is-link></div>-->
      <!--<div title="登录密码" is-link to="changepass"/>-->
      <!--<div title="社交账号" is-link to="mySocial"/>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "myset",
    data() {
      return {
        user_info: {},
        showname: false,
        avatar: '',
        user_tpc: ''
      }
    },
    mounted() {
      this.user_tpc = this.$com.getCookies('user_tpc');
      this._GetUserInfo();
    },
    methods: {
      // 获取个人信息
      _GetUserInfo() {
        this.$api.GetUserInfo().then(res => {
          // console.log(res)
          if (res.code == 1) {
            this.user_info = res.data;
          }
        })
      },
      // 修改个人信息
      _Profile() {
        this.$api.Profile(this.avatar, this.user_info.nickname).then(res => {
          if (res.code == 1) {
            this.$com.showtoast('修改成功')
          } else {
            this.$com.showtoast(res.msg || '稍后在试')
          }
          this._GetUserInfo()
        })
      },
      // 修改昵称
      changename() {
        if (this.user_info.nickname == '') {
          this.$com.showtoast('昵称不能为空')
        } else {
          this._Profile()
        }
      },

      handleAvatarSuccess(res, file) {
        this.user_info.avatar = URL.createObjectURL(file.raw);
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$com.showToast('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$com.showToast('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleUpload(file) {
        this.$api.CommonUpload(file.file).then(res => {
          if (res.code == 1) {
            // this.$com.showToast('修改成功！', 'success');
            this.user_info.avatar = res.data.url;
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .setbox {
    .score_top {
      /*background-image: url("../../assets/img/wdbm.png");*/
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      /*padding: 0 0 50px 0;*/

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


    }

    .setarea {
      padding: 0 25px;

      /deep/
      .avatar-uploader .el-upload {
        display: block;
        text-align: left;
        padding: 0 20px;

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }

        .avatar {
          width: 40px;
          height: 40px;
          display: inline-block;
          margin-right: 54%;
        }
      }


      /deep/ .el-row {
        border-bottom: 1px solid #eee;
        padding: 30px 0;
        line-height: 40px;

        .label {
          text-align: right;
          padding: 0 10px;
          border-right: 1px solid #ececec;
          font-size: 16px;
          color: #333333;
        }

        .el-col-12 {
          padding: 0 20px;
          font-size: 12px;
          color: #666666;
        }
      }
    }


  }

</style>

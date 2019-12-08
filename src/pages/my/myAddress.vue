<template>
  <div class="myadd">
    <!--        <van-address-list-->
    <!--                v-model="chosenAddressId"-->
    <!--                :list="list"-->
    <!--                @add="onAdd"-->
    <!--                @edit="onEdit"-->
    <!--                add-button-text="+ 新建收货地址"-->
    <!--        >-->
    <!--            <div slot="default" class="nodata" v-if="list.length==0">-->
    <!--                暂无地址-->
    <!--            </div>-->
    <!--        </van-address-list>-->
    <div class="score_top">
      <div class="iconbox">
        <div class="name">地址设置</div>
      </div>
    </div>
    <el-table
      v-if="tabelshow&&tableData.length"
      :data="tableData"
      center
      border
    >
      <el-table-column
        property="name"
        label="联系人"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        property="mobile"
        label="电话"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="地址"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.province}}{{scope.row.city}}{{scope.row.district}}{{scope.row.address}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="_addressDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="默认地址"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span
            :class="['checkbox iconfont', scope.row.is_default==1?'iconxuanzhong':'iconweixuanzhong']"
            @click="choosedefault(scope.row,scope.$index)"></span>
        </template>
      </el-table-column>
    </el-table>
    <div class="nodata" v-if="tabelshow&&tableData.length==0">
      <NoData :text="'还没有添加地址'"></NoData>
    </div>
    <el-button type="primary" class="add_btn" @click="dialogFormVisible=true">+新建地址</el-button>
    <Taddress :show.sync="dialogFormVisible" @add="add"></Taddress>
  </div>
</template>

<script>
  import Taddress from '../../components/Taddress'

  export default {
    name: "myAddress",
    data() {
      return {
        tableData: [],
        tabelshow: false,
        dialogFormVisible: false
      }
    },
    components: {
      Taddress
    },
    created() {
      this._AddressIndex();
    },
    methods: {
      _AddressIndex() {
        this.$api.AddressIndex().then(res => {
          this.tabelshow = true;
          if (res.code == 1) {
            this.tableData = res.data;
          }
        })
      },
      onEdit() {

      },
      // 选择默认地址
      choosedefault(item, index) {
        // this.tableData[index].is_default = 1;
        this.$api.AddressSetAddress(
          item.name,
          item.mobile,
          item.province,
          item.city,
          item.district,
          item.address,
          1,
          item.id
        ).then(res => {
          if (res.code == 1) {
            this.$com.showToast('已设置为默认地址', 'success')
            this._AddressIndex();
          } else {
            this.$com.showToast(res.msg || '稍后再试！')
          }
        })
        // this.$set(this.tableData[index],'is_default',1)
      },
      // 删除地址
      _addressDel(id) {
        this.$confirm('此操作将删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delconfirm(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 确认删除
      delconfirm(id) {
        this.$api.addressDel(id).then(res => {
          if (res.code == 1) {
            this.$com.showToast('删除成功', 'success');
            this._AddressIndex();
          }
        })
      },
      // 添加成功
      add(val) {
        this._AddressIndex();
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .myadd {
    .score_top {
      /*background-image: url("../../assets/img/wdbm.png");*/
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;

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

          &:hover {
            color: $baseRed;
          }
        }

      }
    }

    /deep/ .el-table {
      margin: 34px auto;
      width: 870px;

      .selectbtn {

      }

      .checkbox {
        cursor: pointer;

        &.iconxuanzhong {
          color: $baseBlue;
        }
      }
    }

    .nodata {
      color: #eee;
      text-align: center;
      font-size: 14px;
      padding: 50px 0;
      min-height: 300px;
      position: relative;
    }

    .add_btn {
      width: 139px;
      margin: 53px auto;
      display: block;
    }
  }
</style>

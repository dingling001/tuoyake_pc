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
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
      v-if="falg&&tableData.length"
      v-loading="showdata"
      @selection-change="handleSelectionChange">
      <el-table-column
        label="联系人"
        width="91"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="电话"
        align="center"
        width="130">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
        width="436"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        width="109"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        type="selection"
        label="默认地址"
        width="103"
        align="center"
        class="selectbtn"
      >
      </el-table-column>
    </el-table>
    <div class="nodata" v-else>
      <NoData :text="'还没有添加地址'"></NoData>
    </div>
    <el-button type="primary" class="add_btn" >+新建地址</el-button>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myAddress",
    data() {
      return {
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 上海市普陀区金沙江路上海市普陀区金沙江路'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        multipleSelection: [],
        showdata:true,
        falg:false,
      }
    },
    created() {
      this._AddressIndex();
    },
    methods: {
      _AddressIndex() {
        this.$api.AddressIndex().then(res => {
          if (res.code == 1) {
            this.tableData = res.data;
          }
        })
      },
      onAdd() {
        this.$router.push({path: '/editAddress', query: {add: 0}})
      },
      onEdit() {

      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
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
      margin: 0 auto;
      width: 870px;

      .selectbtn {

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
    .add_btn{
      width: 139px;
      margin: 0 auto;
      display: block;
    }
  }
</style>

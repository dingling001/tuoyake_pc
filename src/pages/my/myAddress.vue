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
      v-if="tableData.length"
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
        property="address"
        label="地址"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="默认地址"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
         <span :class="['iconfont', scope.$index==ind?'iconxuanzhong':'iconweixuanzhong']" @click="choosedefault(scope.row.id,scope.$index)"></span>
        </template>
      </el-table-column>
    </el-table>
    <div class="nodata" v-else>
      <NoData :text="'还没有添加地址'"></NoData>
    </div>
    <el-button type="primary" class="add_btn">+新建地址</el-button>
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
        showdata: true,
        falg: false,
        currentRow: null,
        ind: -1
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
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      onEdit() {

      },
      choosedefault(id, index) {
        console.log(id)
        console.log(index)
        this.ind = index;
        // this.tableData[index].is_defalut = 1;
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
      .checkbox{
        display: block;
        width: 10px;
        height: 10px;
        border: 1px solid $baseBlue;
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
      margin: 0 auto;
      display: block;
    }
  }
</style>

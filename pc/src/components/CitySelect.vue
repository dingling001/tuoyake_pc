<template>
  <div class="citybox">
    <div class="selectbox" v-if="labeled||cityarea">
      <span>已选条件</span>
      <span class="labeled" v-if="cityarea" @click="removecity">{{cityarea}}</span>
      <span class="labeled" v-if="labeled" @click="removelabel">{{labeled}}</span>
      <span class="clearall">.清除全部</span>
    </div>
    <div class="cityitem">
      <div class="label"><label>区域</label><span :class="['all', cityindex==-1?'activetag':'']">全部</span></div>
      <div class="tagbox">
        <el-dropdown v-for="(item,index) in districtlist" class="tag" :key="item.id" @command="commandid"
                     @visible-change="getchildlist($event,index)">
          <span :class="['el-dropdown-link',index==cityindex?'cityactive':'']">
            <span>{{item.name}}</span>
            <i class=" el-icon-caret-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="cityslot">
            <div class="bigtag">{{item.name}}</div>
            <el-dropdown-item v-for="(i,iindex)  in item.childlist" :key="i.id" :class="{'liactve':iindex==childindex}"
                              :command="i.id+'-'+index+'-'+i.name+'-'+iindex"> {{i.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="cityitem">
      <div class="label"><label>服务</label><span :class="['all', labelindex==-1?'activetag':'']">全部</span>
      </div>
      <div class="tagbox">
        <div :class="['tag',index==labelindex?'activetag':'' ]" v-for="(item,index) in labellist"
             @click="lableselect(index,item)">{{item}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CItySelect",
    data() {
      return {
        citypid: '',
        city: '天津市',
        districtlist: [],
        labellist: [],
        selcetname: '',
        einfo: [],
        selectitem: [],
        labelindex: -1,
        labeled: '',
        cityarea: '',
        childindex: -1,
        cityindex: -1
      }
    },
    created() {
      this._GetAreaPidByName();
      this._GetLabelList()
    },
    methods: {
      // 根据城市换取id
      _GetAreaPidByName() {
        this.$api.GetAreaPidByName(this.city).then(res => {
          if (res.code == 1) {
            this.citypid = res.data;
            this._GetAreaListTree();
          }
        })
      },
      // 获取当前城市的区
      _GetAreaListTree() {
        this.$api.GetAreaListTree(this.citypid).then(res => {
          if (res.code == 1) {
            this.districtlist = res.data;
            for (var i in this.districtlist) {
              this.districtlist[i].childlist.unshift({
                childlist: [],
                id: '0',
                name: "全部",
                pid: '',
                spacer: "&nbsp;├"
              })
            }
          }
        })
      },
      // 获取服务标签
      _GetLabelList() {
        this.$api.GetLabelList().then(res => {
          if (res.code == 1) {
            this.labellist = res.data;
          }
        })
      },
      // 选中地区
      commandid(e) {
        this.einfo = e.split('-');
        if (this.einfo[0] == 0) {
          return
        } else {
          this.cityarea = this.districtlist[this.einfo[1]].childlist[this.einfo[3]].name;
          this.districtlist[this.einfo[1]].name = this.districtlist[this.einfo[1]].childlist[this.einfo[3]].name;
          this.cityindex = this.einfo[1];
        }

      },
      // 触发下拉的行为
      getchildlist(e, index) {
        if (e) {
          // this.childlist = this.districtlist[index].childlist;

        } else {
        }
      },
      removecity() {
        this.cityarea = '';
        this.cityindex = -1;
      },
      // 选中服务标签
      lableselect(index, labeled) {
        this.labelindex = index;
        this.labeled = labeled
      },
      removelabel() {
        this.labeled = '';
        this.labelindex = -1;
      },
      clearall() {
        this.labeled = '';
        this.labelindex = -1;
        this.cityarea = '';
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../style/reset";

  .citybox {
    margin: 20px 0;
    background-color: #fff;
    padding-bottom: 15px;

    .selectbox {
      padding: 11px 20px;
      border-bottom: #EEEEEE 1px solid;

      .labeled {
        position: relative;
        padding: 0 4px 0 5px;
        border: 1px solid $baseBlue;
        border-radius: 10px;
        font-size: 12px;
        margin: 0 10px;
        cursor: pointer;

        &:after {
          font-size: 18px;
          color: $baseBlue;
          margin-left: 2px;
          content: "\00d7";
          vertical-align: -1.4px;
          line-height: 16.5px;
        }
      }

      .clearall {
        font-size: 12px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }
    }
  }

  .cityitem {
    padding: 15px 20px 0;

    .label {
      position: absolute;
      width: 160px;

      label {
        width: 80px;
        display: inline-block;
        line-height: 28px;
        color: #222;
      }

      .all {
        color: #333;
        cursor: pointer;
        padding: 0 10px;
        border-radius: 15px;

        &.activetag {
          color: #fff;
          font-weight: bold;
          background-color: $baseBlue;
        }

        &:hover {
          color: #fff;
          font-weight: bold;
          background-color: $baseBlue;
        }
      }
    }

    .tagbox {
      padding-left: 160px;

      .tag {
        min-width: 120px;
        display: inline-block;
        font-size: 14px;
        color: #666;
        line-height: 28px;
        padding: 0 10px;
        cursor: pointer;

        &:hover {
          color: $baseBlue;
          font-weight: bold;
        }

        &.activetag {
          color: $baseBlue;
          font-weight: bold;
          background-color: $baseBlue;
        }

        .el-dropdown-link {
          padding: 0 5px;

          &.cityactive {
            background-color: $baseBlue;
            border-radius: 20px;
            color: #fff;
          }
        }
      }
    }
  }

</style>

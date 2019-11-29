<template>
  <div class="citybox">
    <div class="selectbox" v-if="labeled||cityarea">
      <span>已选条件</span>
      <span class="labeled" v-if="cityarea" @click="removecity">{{cityarea}}</span>
      <span class="labeled" v-if="labeled" @click="removelabel">{{labeled}}</span>
      <span class="clearall" @click="removeall">.清除全部</span>
    </div>
    <div class="cityitem">
      <div class="label"><label>区域</label>
        <span :class="['all', cityindex==-1?'activetag':'']"  @click="allarea">全部</span></div>
      <div class="tagbox" v-loading="showdistrictlist" v-if="districtlist.length">
        <el-dropdown v-for="(item,index) in districtlist" class="tag" :key="item.id" @command="commandid($event,index)"
                     @visible-change="getchildlist($event,index)">
          <span :class="['el-dropdown-link',index==cityindex?'cityactive':'']">
            <span>{{item.name}}</span>
            <i class=" el-icon-caret-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="cityslot">
            <div class="bigtag">{{item.childlist.area}}</div>
            <el-dropdown-item v-for="(i,iindex)  in item.childlist" :key="i.id" :class="{'liactve':iindex==childindex}"
                              :command="i.id+'-'+index+'-'+i.name+'-'+iindex"> {{i.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="cityitem" v-if="showlabel">
      <div class="label"><label>服务</label><span :class="['all', labelindex==-1?'activetag':'']" @click="alllabel">全部</span>
      </div>
      <div class="tagbox">
        <div class="tag" v-for="(item,index) in labellist"
             @click="lableselect(index,item)"><span :class="{'activetag':index==labelindex}">{{item}}</span>
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
        city: '',
        districtlist: [],
        labellist: [],
        selcetname: '',
        einfo: [],
        selectitem: [],
        labelindex: -1,
        labeled: '',
        cityarea: '',
        childindex: -1,
        cityindex: -1,
        showdistrictlist: true
      }
    },
    props: {
      'showlabel': {
        default: true,
        type: Boolean
      }
    },
    created() {
      this._GetAreaPidByName();
      this._GetLabelList()
    },
    methods: {
      // 根据城市换取id
      _GetAreaPidByName() {
        this.$api.GetAreaPidByName(this.$com.getCookies('pccity')||this.city).then(res => {
          if (res.code == 1) {
            this.citypid = res.data;
            this._GetAreaListTree();
          }
        })
      },
      // 获取当前城市的区
      _GetAreaListTree() {
        this.$api.GetAreaListTree(this.citypid).then(res => {
          this.showdistrictlist = false;
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
              this.districtlist[i].childlist.area = this.districtlist[i].name;
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
      commandid(e, index) {
        this.einfo = e.split('-');
        if (this.einfo[0] == 0) {
          this.districtlist[this.einfo[1]].name = this.districtlist[index].childlist.area;
          this.cityarea = this.districtlist[index].childlist.area;
        } else {
          this.cityarea = this.districtlist[this.einfo[1]].childlist[this.einfo[3]].name;
          this.districtlist[this.einfo[1]].name = this.districtlist[this.einfo[1]].childlist[this.einfo[3]].name;
        }
        this.cityindex = this.einfo[1];
        this.$emit('cityarea', this.cityarea)

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
        this.$emit('removecity', this.cityarea)
      },
      allarea() {
        this.cityindex=-1;
        this.cityarea = '';
        this.$emit('allarea', '')
      },
      alllabel(){
        this.labelindex=-1;
        this.labeled = '';
        this.$emit('alllabel', '')
      },
      // 选中服务标签
      lableselect(index, labeled) {
        this.labelindex = index;
        this.labeled = labeled;
        this.$emit('labeled', labeled)
      },
      removelabel() {
        this.labeled = '';
        this.labelindex = -1;
        this.$emit('removelabel', this.labeled)
      },
      // 清除全部
      removeall() {
        this.labeled = '';
        this.labelindex = -1;
        this.cityarea = '';
        this.cityindex = -1;
        this.$emit('removeall', this.labeled, this.cityarea)
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
    min-height: 100px;

    .selectbox {
      padding: 11px 20px;
      border-bottom: #EEEEEE 1px solid;

      .labeled {
        position: relative;
        padding: 0 4px 0 5px;
        border: 1px solid $baseRed;
        border-radius: 10px;
        font-size: 12px;
        margin: 0 10px;
        cursor: pointer;

        &:after {
          font-size: 18px;
          color: $baseRed;
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
        transition: ease-in-out .2s;

        &.activetag {
          color: #fff;
          font-weight: bold;
          background-color: $baseRed;
        }

        &:hover {
          color: #fff;
          font-weight: bold;
          background-color: $baseRed;
        }
      }
    }

    .tagbox {
      padding-left: 160px;
      min-height: 100px;

      .tag {
        min-width: 130px;
        display: inline-block;
        font-size: 14px;
        color: #666;
        line-height: 28px;
        padding: 0 10px;
        cursor: pointer;

        &:hover {
          color: $baseRed;
          font-weight: bold;
        }

        span {

          border-radius: 20px;
          transition: ease-in-out .1s;

          &.activetag {
            color: #fff;
            font-weight: bold;
            background-color: $baseRed;
            padding: 0 10px;

          }
        }

        .el-dropdown-link {
          padding: 0 5px;

          &.cityactive {
            background-color: $baseRed;
            border-radius: 20px;
            color: #fff;
          }
        }
      }
    }
  }

</style>

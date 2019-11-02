<template>
  <div class="cbox">
    <city-select></city-select>
    <div class="listbox">
      <div class="listtab"><span>智能排序</span><span>评分最高</span></div>
      <div class="list">
        <div class="recmmentitem" v-for="(item ,index) in netlist" :key="item.id">
          <div class="rec_img"><img :src="item.image" alt=""></div>
          <div>
            <div class="rec_name">{{item.name}}</div>
            <div class="rec_type">
              <div class="starbox">
                <span class="iconfont iconstar-fill iconactive" v-for="i in parseInt(item.star)"></span>
              </div>
              <div class="typebox">
                <span v-for="c in item.label_ids">{{c}}</span>
              </div>
            </div>
            <div class="rec_address single-line-text">{{item.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CitySelect from '../../components/CitySelect'

  export default {
    name: "competition",
    data() {
      return {
        netlist: []
      }
    },
    components: {
      CitySelect
    },
    created() {
      this._GetBarList()
    },
    methods: {
      // 获取列表
      _GetBarList() {

        this.$api.GetBarList(
          this.page,
          this.keyword,
          this.city,
          this.lat,
          this.lng,
          this.recommend,
          this.label,
          this.lindex == 0 ? '' : this.district,
          this.circle,
        ).then(res => {
          if (res.code == 1) {//请求成功
            this.netlist = res.data.data
          }
          // console.log(this.netlist)
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/reset";

  .cbox {
    .listbox {
      background-color: #fff;
      margin: 20px 0;

      .listtab {
        border-bottom: 1px solid #EEEEEE;
        margin: 0 27px;

        span {
          display: inline-block;
          padding: 30px 20px 22px 2px;
          cursor: pointer;

          &:hover {
            color: $baseBlue;
            font-weight: bold;
          }
        }
      }

      .list {
        overflow: hidden;

        .recmmentitem {
          /*float: left;*/
          /*width: 240px;*/
          margin-bottom: 50px;
          margin-right: 48px;
          cursor: pointer;
          overflow: hidden;

          &:hover .rec_name {
            color: $baseBlue;
            font-weight: bold;
          }

          .rec_img {
            width: 240px;
            height: 240px;
            border-radius: 5px;
            overflow: hidden;
            float: left;

            img {
              width: 100%;
            }
          }

          .rec_name {
            padding: 18px 0;
            font-size: 16px;
            color: #333333;
          }

          .rec_type {
            overflow: hidden;

            .starbox {
              float: left;
              width: 96px;
              margin-right: 28px;

              .iconfont {
                color: #c3c3c3;
                margin-left: -2px;
                /*margin-right: 5px;*/
              }

              .iconactive {
                color: $baseRed;
              }
            }

            .typebox {
              float: left;

              span {
                background-color: #FEEAEB;
                color: #E03A43;
                padding: 1px 0;
                width: 56px;
                text-align: center;
                border-radius: 10px;
                display: inline-block;
                font-size: 13px;
              }
            }

          }

          .rec_address {
            color: #999999;
            font-size: 12px;
            padding-top: 18px;
          }
        }
      }
    }
  }

</style>

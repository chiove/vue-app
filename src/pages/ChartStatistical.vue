<template>
  <div class="body-container">
    <div class="title-container">
      <div :class="{'tab-left':true,'tab-active':tabLeftActive}"  @click="leftActive">日统计</div>
      <div :class="{'tab-right':true,'tab-active':tabRightActive}" @click="rightActive">周统计</div>
    </div>
    <div class="content-container">
      <div class="left-container" v-if="tabLeftActive">
          <div class="daily-statistical">
            <chart-date-select v-on:selectDate="listenEvent"></chart-date-select>
            <div class="daily-statistical-charts">
              <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
            </div>
          </div>
      </div>
      <div class="right-container" v-if="tabRightActive">
        <div class="week-statistical">
          <div class="week-statistical-title">
            <div>
              <span>第一周</span>
              <img class="week-statistical-select-down" src="../assets/selectDown.png" alt="">
            </div>
            <div>应打卡人数：200</div>
          </div>
          <div class="week-statistical-item">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">30人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
          <div class="week-statistical-item">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">30人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
          <div class="week-statistical-item">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">30人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
          <div class="week-statistical-item">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">30人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
          <div class="week-statistical-item">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">30人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
          <div class="week-statistical-item">
          <div>晚归</div>
          <div>
            <span class="week-statistical-person">30人</span>
            <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
          </div>
        </div>
          <div class="week-statistical-item">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">30人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <teacher-check-tab :pageName="pageName"></teacher-check-tab>
  </div>
</template>

<script>
import teacherCheckTab from '../components/TeacherCheckTab'
import chartDateSelect from '../components/ChartDateSelect'
import Vue from 'vue'
import VeRing from 'v-charts/lib/ring.common'
Vue.use(VeRing)
export default {
  components: {teacherCheckTab, chartDateSelect, VeRing},
  name: 'chart-statistical',
  created: function () {

  },
  data () {
    this.chartSettings = {
      radius: [40, 80],
      labelLine: {
        show: false
      },
      offsetY: 200
    }
    return {
      tabLeftActive: true,
      tabRightActive: false,
      pageName: 'ChartStatistical',
      chartData: {
        columns: ['状态', '人数'],
        rows: [
          { '状态': '到勤', '人数': 160 },
          { '状态': '晚归', '人数': 20 },
          { '状态': '未归', '人数': 20 }
        ]
      }
    }
  },
  methods: {
    leftActive: function () {
      if (this.tabLeftActive !== true) {
        this.tabLeftActive = true
        this.tabRightActive = false
      }
    },
    rightActive: function () {
      if (this.tabRightActive !== true) {
        this.tabLeftActive = false
        this.tabRightActive = true
      }
    },
    listenEvent: function (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
  .title-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:rgba(255,255,255,1);
    box-sizing: border-box;
    border-bottom: 1px solid rgba(236,236,236,1);
  }
  .tab-left,.tab-right{
    height:127px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(51,51,51,1);
    line-height: 127px;
    box-sizing: border-box;
  }
  .tab-left{
    margin-left: 135px;
  }
  .tab-right{
    margin-right: 141px;
  }
  .tab-active{
    border-bottom: 2px solid rgba(61,168,245,1);
    color:rgba(61,168,245,1);
  }
  .content-container{
    height: 985px;
    overflow-y: auto;
  }
  .daily-statistical{
    margin-top: 68px;
    text-align: center;
    font-size: 36px;
    z-index: 99;
  }
  .daily-statistical-charts{
    height: 50px;
    width: 100%;
    max-width: 1125px;
    margin: auto;
  }
  .week-statistical{
    padding: 0 33px;
    background: #fff;
  }
  .week-statistical-title{
    height: 124px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(236,236,236,1);
    font-size:32px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .week-statistical-item{
    height: 124px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(236,236,236,1);
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(51,51,51,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .week-statistical-icon{
    height: 25px;
    width: 15px;
  }
  .week-statistical-select-down{
    height: 12px;
    width: 19px;
  }
  .week-statistical-person{
    color:rgba(153,153,153,1);
  }
</style>

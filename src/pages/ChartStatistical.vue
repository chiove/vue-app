<template>
  <div class="body-container">
    <div class="title-container">
      <div :class="{'tab-left':true,'tab-active':tabLeftActive}"  @click="leftActive">日统计</div>
      <div :class="{'tab-right':true,'tab-active':tabRightActive}" @click="rightActive">周统计</div>
    </div>
    <div class="content-container">
      <div class="left-container" v-if="tabLeftActive">
          <div class="daily-statistical">
            <chart-date-select v-on:selectDateChart="listenEvent"></chart-date-select>
            <div class="daily-statistical-charts">
              <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
            </div>
          </div>
      </div>
      <div class="right-container" v-if="tabRightActive">
        <div class="week-statistical">
          <div class="week-statistical-title">
            <div @click="weekSelectFun">
              <span>第{{week}}周</span>
              <img class="week-statistical-select-down" src="../assets/selectDown.png" alt="">
            </div>
            <div class="week-statistical-total" v-if="weekTotal" @click="confirmWeekFun">
              <div class="week-statistical-total-item" v-for="(item,index) in weekList" :data-index="item" v-bind:key="index">{{item}}</div>
            </div>
            <div>应打卡人数：{{needClockNumber}}</div>
          </div>
          <div class="week-statistical-item" @click="stayOutLateFun">
            <div>晚归</div>
            <div>
              <span class="week-statistical-person">{{lateNumber}}人</span>
              <img class="week-statistical-icon" src="../assets/selectRight.png" alt="">
            </div>
          </div>
          <div class="week-statistical-item"  @click="stayOutFun">
            <div>未归</div>
            <div>
              <span class="week-statistical-person">{{notNumber}}人</span>
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
  mounted: function () {
    console.log(this.$http.getSystemConfig())
    /*初始化查询周统计*/
   this.weekSearch()
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
      weekTotal:false,/*总周数面板控制*/
      week:1,/*当前第几周*/
      pageName: 'ChartStatistical',
      needClockNumber:0, /*应打卡人数*/
      lateNumber:0,/*晚归人数*/
      notNumber:0,/*未归人数*/
      userId:1,/*用户id*/
      clockStatus:0,/*打卡状态*/
      weekList:[1,2,3],/*循环周列表*/
      chartData: {/*图表数据*/
        columns: ['状态', '人数'],
        rows: [
          { '状态': '到勤', '人数': 0 },
          { '状态': '晚归', '人数': 0 },
          { '状态': '未归', '人数': 0 }
        ]
      }
    }
  },
  methods: {
    /*tab切换*/
    leftActive: function () {
      if (this.tabLeftActive !== true) {
        this.tabLeftActive = true
        this.tabRightActive = false
      }
    },
    /*tab切换*/
    rightActive: function () {
      if (this.tabRightActive !== true) {
        this.tabLeftActive = false
        this.tabRightActive = true
      }
    },
    /*控制周选择面板*/
    weekSelectFun:function(){
      this.weekTotal = true
    },
    /*周选择*/
    confirmWeekFun:function(e){
      if(e.target.getAttribute('class')==='week-statistical-total'){
        return
      }
      this.week = e.target.dataset.index
      this.weekTotal = false
      /*选择周数查询列表*/
      this.weekSearch()
    },
    /*监听日期选择*/
    listenEvent: function (data) {
      this.dailySearch(data.year,data.month,data.day,data.userId)
    },
    /*图表查询*/
    dailySearch:function (year,month,day,userId) {
      const dailyList= this.$http.getDailyTotal(year,month,day,userId)
      this.chartData.rows = [
        { '状态': '到勤', '人数': dailyList.data.clockNum},
        { '状态': '晚归', '人数': dailyList.data.stayOutLateNum },
        { '状态': '未归', '人数': dailyList.data.stayOutNum }
      ]
    },
    /*周统计查询*/
    weekSearch:function () {
      /*查询应打卡人数*/
      const weekStatistics = this.$http.getWeekTotal(this.userId,this.week);
      this.needClockNumber = weekStatistics.data.totalNum
      this.lateNumber =  weekStatistics.data.stayOutLateNum
      this.notNumber =  weekStatistics.data.stayOutLateNum
      /*周数列表*/
      const weekTotal = this.$http.getWeekList()
      for (let week=1;week<weekTotal.length;week++)
      {
        this.weekList.push(week)
      }
    },
    /*打开晚归详细页面*/
    stayOutLateFun:function () {
      const _this = this
      this.$router.push({
        name:'LateBackList',
        params:{
          userId:_this.userId,
          clockStatus:3,
          weekNumber:_this.week,
          stayOutLateNumber:this.lateNumber
        }
      })
    },
    /*打开未归详细页面*/
    stayOutFun:function () {
      const _this = this
      this.$router.push({
        name:'LateBackList',
        params:{
          userId:_this.userId,
          clockStatus:4,
          weekNumber:_this.week,
          stayOutNumber:_this.notNumber
        }
      })
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
  .week-statistical-total{
    position: absolute;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: flex-start;
    max-width: 1125px;
    width: 100%;
    height: 400px;
    left: 0;
    top: 256px;
    z-index: 99;
    flex-flow: row wrap;
  }
  .week-statistical-total-item{
    width:14.2%;
    text-align: center;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    align-self: center;
  }
</style>

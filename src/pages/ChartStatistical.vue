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
              <ve-ring :data="chartData" :colors="chartColors" :settings="chartSettings" height="340px"></ve-ring>
            </div>
          </div>
        <div class="all-data-container">
          <div class="all-data-item" @click="dayClockFun">
            <div class="all-data-header">
              {{clockNum}}
            </div>
            <div class="all-data-footer">
              <div class="all-data-icon background-success"></div>
              <div class="all-data-text color-success">到勤人数</div>
            </div>
          </div>
          <div class="all-data-item" @click="dayStayOutLateFun">
            <div class="all-data-header">
              {{stayOutLateNum}}
            </div>
            <div class="all-data-footer">
              <div class="all-data-icon background-warning"></div>
              <div class="all-data-text color-warning">晚归人数</div>
            </div>
          </div>
          <div class="all-data-item" @click="dayStayOutFun">
            <div class="all-data-header">
              {{stayOutNum}}
            </div>
            <div class="all-data-footer">
              <div class="all-data-icon background-danger"></div>
              <div class="all-data-text color-danger">未归人数</div>
            </div>
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
              <div class="week-statistical-total-item" v-for="(item,index) in weekList" :data-index="JSON.stringify(item)" v-bind:key="index">{{item.weekNumber}}</div>
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
    <teacher-check-tab></teacher-check-tab>
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
    if(localStorage.getItem('checkDormitoryUserId')){
      this.userId = localStorage.getItem('checkDormitoryUserId')
    }
    this.getCurrentWeek()
  },
  activated:function(){
    if(localStorage.getItem('checkDormitoryUserId')){
      this.userId = localStorage.getItem('checkDormitoryUserId')
    }
  },
  watch:{
    timeState:function (val) {
      if(val){
        this.dailySearch()
      }
    },
    week:function (val) {
      /*初始化查询周统计*/
      if(val===null){
        this.week = 1
      }
      this.weekSearch()
    }
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
      stayOutNum:'0',
      stayOutLateNum:'0',
      clockNum:'0',
      tabLeftActive: true,
      tabRightActive: false,
      weekTotal:false,/*总周数面板控制*/
      week:1,/*当前第几周*/
      needClockNumber:0, /*应打卡人数*/
      lateNumber:0,/*晚归人数*/
      notNumber:0,/*未归人数*/
      userId:'',/*用户id*/
      clockStatus:0,/*打卡状态*/
      weekList:[],/*周列表*/
      year:'',
      month:'',
      day:'',
      chartColors:['#40C984','#FC9A16','#FF4141'],
      chartData: {/*图表数据*/
        columns: ['状态', '人数'],
        rows: [
          { '状态': '到勤', '人数': 0 },
          { '状态': '晚归', '人数': 0 },
          { '状态': '未归', '人数': 0 }
        ]
      },
      timeState:false
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
      this.week = JSON.parse(e.target.dataset.index).weekNumber
      this.weekTotal = false
      /*选择周数查询列表*/
      this.weekSearch()
    },
    /*监听日期选择*/
    listenEvent: function (data) {
      this.year = data.year
      this.month = data.month
      this.day = data.day
      this.dailySearch()
      this.timeState = true
    },
    /*图表查询*/
    dailySearch:function () {
      this.$http.get(process.env.API_HOST+'dormitory-check/day-stat',{
        params:{
          year:this.year,
          month:this.month,
          day:this.day,
          userId:this.userId
        }
      }).then(function (res) {
        if(res){
          this.chartData.rows = [
            { '状态': '到勤', '人数': res.data.data.clockNum},
            { '状态': '晚归', '人数': res.data.data.stayOutLateNum },
            { '状态': '未归', '人数': res.data.data.stayOutNum }
          ]
          this.clockNum = res.data.data.clockNum
          this.stayOutLateNum = res.data.data.stayOutLateNum
          this.stayOutNum = res.data.data.stayOutNum
        }
      }).catch(function (error) {
        console.log(error)
      })

    },
    /*周统计查询*/
    weekSearch:function () {
      /*查询应打卡人数*/
      this.$http.get(process.env.API_HOST+'dormitory-check/week-stat',{
        params:{
          userId:this.userId,
          weekNumber:this.week
        }
      }).then(function (res) {
        if(res){
          const data = res.data.data
          this.needClockNumber = data.totalNum
          this.lateNumber =  data.stayOutLateNum
          this.notNumber =  data.stayOutNum
        }
      }).catch(function (error) {
        console.log(error)
      })
      /*周数列表*/
      this.$http.get(process.env.API_HOST+'select-data/week-info/all').then(function (res) {
        if(res){
          this.weekList = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })


    },
    /*打开晚归详细页面*/
    stayOutLateFun:function () {
      const _this = this
      localStorage.setItem('clockStatus',3)
      localStorage.setItem('userId',_this.userId)
      localStorage.setItem('weekNumber',_this.week)
      localStorage.setItem('stayOutLateNumber',_this.lateNumber)
      this.$router.push({
        name:'LateBackList',
        query:{
          listName:'晚归列表'
        }
      })
    },
    /*打开未归详细页面*/
    stayOutFun:function () {
      const _this = this
      localStorage.setItem('clockStatus',4)
      localStorage.setItem('userId',_this.userId)
      localStorage.setItem('weekNumber',_this.week)
      localStorage.setItem('stayOutNumber',_this.notNumber)
      this.$router.push({
        name:'LateBackList',
        query:{
          listName:'未归列表'
        }
      })
    },
    /*日统计到勤*/
    dayClockFun:function () {
      const _this = this
      localStorage.setItem('clockStatus',2)
      localStorage.setItem('userId',_this.userId)
      localStorage.setItem('dateNumber',JSON.stringify({year:_this.year,month:_this.month,day:_this.day}))
      localStorage.setItem('clockNumber',_this.clockNum)
      this.$router.push({
        name:'DayLateBackList',
        query:{
          listName:'到勤列表'
        }
      })
    },
    /*日统计打开晚归*/
    dayStayOutLateFun:function () {
      const _this = this
      localStorage.setItem('clockStatus',3)
      localStorage.setItem('userId',_this.userId)
      localStorage.setItem('dateNumber',JSON.stringify({year:_this.year,month:_this.month,day:_this.day}))
      localStorage.setItem('stayOutLateNumber',_this.stayOutLateNum)
      this.$router.push({
        name:'DayLateBackList',
        query:{
          listName:'晚归列表'
        }
      })
    },
    /*日统计打开未归*/
    dayStayOutFun:function () {
      const _this = this
      localStorage.setItem('clockStatus',4)
      localStorage.setItem('userId',_this.userId)
      localStorage.setItem('dateNumber',JSON.stringify({year:_this.year,month:_this.month,day:_this.day}))
      localStorage.setItem('stayOutNumber',_this.stayOutNum)
      this.$router.push({
        name:'DayLateBackList',
        query:{
          listName:'未归列表'
        }
      })
    },
    /*获取当前周*/
    getCurrentWeek(){
      const _this = this
      this.$http.get(process.env.API_HOST+'select-data/curr-week').then(function (res) {
        if(res){
          if(res.data.code==='000000'){
            _this.week = res.data.data
          }
        }
      }).catch(function (error) {
        console.log(error)
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
    /*height: 985px;*/
    overflow-y: auto;
    flex: 1;
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
  .all-data-container{
    margin-top: 610px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .all-data-item{
    margin:0 25px;
  }
  .all-data-header{
    text-align: center;
    font-size:72px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(85,85,85,1);
  }
  .all-data-footer{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .all-data-icon{
    height: 20px;
    width: 20px;
    margin-right: 12px;
  }
  .all-data-text{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
  }
</style>

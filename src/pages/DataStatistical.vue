<template>
  <div class="body-container">
    <data-banner></data-banner>
    <history-select @selectDate="selectDate"></history-select>
    <div class="history-details-container">
      <history-list v-for="(item,index) in historyListData" v-bind:key="index" :data="item"></history-list>
    </div>
    <sign-tab :pageName="pageName"></sign-tab>
  </div>
</template>

<script>
import signTab from "../components/signTab"
import dataBanner from "../components/dataBanner"
import historySelect from "../components/historySelect"
import historyList from "../components/StudentHistoryList"
import axios from '../units/axios'
export default {
  components: {signTab,dataBanner,historySelect,historyList},
  name: "statistical-data",
  mounted:function () {
    const studentIformation = axios.getStudent("传入学生ID")/*获取学生信息*/
    const clocktimes = getStudentsClocktimes("传入学生ID")/*获取晚归，到勤，未归*/
    const studentClockHistory = studentClockHistory(this.selectDateSearch,'传入学生ID')/*根据学生ID和日期查询全部历史*/
    this.profilePhoto = require(`${studentIformation.data.profilePhoto}`)
    this.studentName = studentIformation.data.studentName
    this.classNames = studentIformation.data.className
    this.majorName = studentIformation.data.majorName
    this.instructorName = studentIformation.data.instructorName
    this.studentCode = studentIformation.data.studentCode
    this.dormitoryName = studentIformation.data.dormitoryName
    this.bedCode = studentIformation.data.bedCode
    this.studentName = studentIformation.data.studentName
    /*获取晚归，到勤，未归*/
    this.totalStayOutLate = clocktimes.data.totalStayOutLate
    this.totalClock = clocktimes.data.totalClock
    this.totalStayOut = clocktimes.data.totalStayOut
    /*根据学生ID和日期查询全部历史*/
    this.historyListData = studentClockHistory.data
  },
  data() {
    return {
      pageName:"StatisticalData",
      selectDateSearch:'',
      historyListData:[],
      pageData:{
        profilePhoto:'',
        studentName:'',
        classNames:'',
        collegeName:'',
        majorName:'',
        instructorName:'',
        studentCode:'',
        dormitoryName:'',
        bedCode:'',
        totalStayOutLate:'',
        totalClock:'',
        totalStayOut:'',
      }
    }
  },
  methods:{
    selectDate:function (data) {
     this.selectDateSearch = data
    }
  }
}
</script>

<style scoped>
  .history-details-container{
    height: 546px;
    overflow-y: auto;
    padding: 0 32px;
  }
</style>

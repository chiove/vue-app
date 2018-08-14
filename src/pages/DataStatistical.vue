<template>
  <div class="body-container">
    <data-banner :data="pageData"></data-banner>
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
    const studentIformation = axios.getStudent(this.pageData.studentId)/*获取学生信息*/
    const clocktimes = axios.getStudentsClocktimes(this.pageData.studentId)/*获取晚归，到勤，未归*/
    const studentClockHistoryYM = axios.studentClockHistoryYM(this.selectDateSearch.year,this.selectDateSearch.month,this.pageData.studentId)/*根据学生ID和日期查询全部历史*/
    this.pageData.profilePhoto = require(`${studentIformation.data.profilePhoto}`)
    this.pageData.studentName = studentIformation.data.studentName
    this.pageData.classNames = studentIformation.data.className
    this.pageData.majorName = studentIformation.data.majorName
    this.pageData.instructorName = studentIformation.data.instructorName
    this.pageData.studentCode = studentIformation.data.studentCode
    this.pageData.dormitoryName = studentIformation.data.dormitoryName
    this.pageData.bedCode = studentIformation.data.bedCode
    this.pageData.studentName = studentIformation.data.studentName
    /*获取晚归，到勤，未归*/
    this.pageData.totalStayOutLate = clocktimes.data.totalStayOutLate
    this.pageData.totalClock = clocktimes.data.totalClock
    this.pageData.totalStayOut = clocktimes.data.totalStayOut
    /*根据学生ID和日期查询全部历史*/
    this.historyListData = studentClockHistoryYM.data
  },
  data() {
    return {
      pageName:"StatisticalData",
      selectDateSearch:'',
      historyListData:[],
      pageData:{
        studentId:0,
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

<template>
  <div class="body-container">
    <data-banner :data="pageData"></data-banner>
    <history-select @selectDate="selectDate"></history-select>
    <div class="history-details-container">
      <history-list v-for="(item,index) in historyListData" v-bind:key="index" :data="item"></history-list>
    </div>
    <submit-btn :data="pageData.studentId"></submit-btn>
  </div>
</template>

<script>
import submitBtn from '../components/submitBtn'
import dataBanner from '../components/dataBanner'
import historySelect from '../components/historySelect'
import historyList from '../components/StudentHistoryList'
import axios from '../units/axios'
export default {
  components: {submitBtn, dataBanner, historySelect, historyList},
  name: 'teacher-submit',
  mounted:function(){
    /*获取学生信息*/
    const studentIformation = axios.getStudent(this.pageData.studentId)
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
    const clocktimes = axios.getStudentsClocktimes(this.pageData.studentId)
    this.pageData.totalStayOutLate = clocktimes.data.data.totalStayOutLate
    this.pageData.totalClock = clocktimes.data.data.totalClock
    this.pageData.totalStayOut = clocktimes.data.data.totalStayOut
    /*根据学生ID和日期查询全部历史*/
    const studentClockHistoryYM = axios.studentClockHistoryYM(this.selectDateSearch.year,this.selectDateSearch.month,this.pageData.studentId)
    this.historyListData = studentClockHistoryYM.data
  },
  data: function () {
    return {
      selectDateSearch:{
        year:2018,
        month:8
      },
      historyListData:[],
      pageData:{
        studentId:1,
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
    height: 508px;
    padding: 0 30px;
    overflow-y: auto;
  }
</style>

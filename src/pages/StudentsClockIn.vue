<template>
  <div class="body-container">
     <sign-banner :data="pageData"></sign-banner>
     <sign-content :data="pageData" @studentClockFun="listenStudentClockFun"></sign-content>
     <sign-user :data="pageData"></sign-user>
     <sign-tab :pageName = "pageName"></sign-tab>
  </div>
</template>

<script>
import signBanner from '../components/SignBanner'
import signContent from '../components/signContent'
import signTab from '../components/signTab'
import signUser from '../components/signUser'
import axios from '../units/axios'
import units from '../units/tools'
export default {
  components: {signBanner, signContent, signTab, signUser},
  name: 'students-clock-in',
  mounted: function () {
    /*获取系统配置*/
    const systemConfig = axios.getSystemConfig()
    const nowClockStartTime = Number(units.getCurrentTime('hour'))/*获取学生当前考勤状态*/
    this.pageData.clockStartTime =  systemConfig.clockStartTime.substring(0,4)
    this.pageData.clockEndTime =  systemConfig.clockEndTime.substring(0,4)
    const clockStartNumber = Number(this.clockStartTime.substring(0,2))
    const clockEndNumber = Number(this.clockEndTime.substring(0,2))

    if(Number(this.clockStartTime.substring(0,2))<nowClockStartTime){
      this.pageData.state = 'default'
    }else if(clockStartNumber<=nowClockStartTime&&nowClockStartTime<clockEndNumber){
      this.pageData.state = 'primary'
    }else if(nowClockStartTime>clockEndNumber&&nowClockStartTime<24){
      this.pageData.state = 'warning'
    }else{
      this.pageData.state = 'danger'
    }
    /*获取学生信息*/
    const studentIformation = axios.getStudent(this.pageData.studentId)
    this.pageData.profilePhoto = studentIformation.data.profilePhoto
    this.pageData.studentName = studentIformation.data.studentName
    /*获取晚归，到勤，未归*/
    const clocktimes = axios.getStudentsClocktimes(this.pageData.studentId)
    this.pageData.totalClock = clocktimes.data.totalClock
    /*获取学生当前考勤状态*/
    const studentClockStatus = axios.studentClockStatus(this.pageData.studentId)
    this.pageData.clockStatus = studentClockStatus.data
    if(this.pageData.clockStatus===1){
      this.pageData.state = 'default'
    }else if(this.pageData.clockStatus===2){
      this.pageData.state = 'sucess'
    }else if(this.pageData.clockStatus===3){
      this.pageData.state = 'warning'
    }else if(this.pageData.clockStatus===4){
      this.pageData.state = 'danger'
    }else{
      this.pageData.state = 'primary'
    }
  },
  updated:function(){
    if(this.pageData.clockStateCode === "000000"){
      this.pageData.state = 'sucess'
    }
  },
  data () {
    return {
      pageName: 'StudentsClockIn',
      pageData: {
        studentId:0,
        clockStartTime:'18:00',
        clockEndTime:'23:00',
        state:'sucess',
        profilePhoto:'',
        studentName:'',
        clockStatus:0,
        totalClock:0,
        clockStateCode:''
      }
    }
  },
  methods: {
    listenStudentClockFun:function (data) {
      const state = axios.studentClock(data)
      this.pageData.clockStateCode = state.code
    }
  }
}
</script>

<style scoped>
</style>

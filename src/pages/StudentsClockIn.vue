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
import getHour from '../units/tools'
export default {
  components: {signBanner, signContent, signTab, signUser},
  name: 'students-clock-in',
  mounted: function () {
    /*获取系统配置*/
    const systemConfig = axios.getSystemConfig()
    const nowClockStartTime = Number(getHour('hour'))/*获取学生当前考勤状态*/
    this.pageData.clockStartTime =  systemConfig.clockStartTime
    this.pageData.clockEndTime =  systemConfig.clockEndTime
    const clockStartNumber = Number(this.clockStartTime.substring(0,4)
    const clockEndNumber = Number(this.clockEndTime.substring(0,4)
    if(Number(this.clockStartTime.substring(0,2))<nowClockStartTime){
      this.pageData.state = 'default'
    }else if(clockStartNumber<=nowClockStartTime&&nowClockStartTime<clockEndNumber){
      this.pageData.state = 'primary'
    }else if(nowClockStartTime>clockEndNumber&&nowClockStartTime<24){
      this.pageData.state = 'warning'
    }else if('打卡成功返回状态'){
      this.pageData.state = 'sucess'
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
    this.pageData.checkData = studentClockStatus.data
  },
  updated:function(){
    if(this.clockStatus===2){
      this.state = 'sucess'
    }else if(this.clockStatus===3){
      this.state = 'warning'
    }else if(this.clockStatus===4){
      this.state = 'danger'
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
        clockStatus: 0,
        checkData:0,
        totalClock:0
      }
    }
  },
  methods: {
    listenStudentClockFun:function (data) {
      const state = axios.studentClock(data)
      this.clockStatus = state.data.clockStatus
    }
  }
}
</script>

<style scoped>
</style>

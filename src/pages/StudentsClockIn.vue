<template>
  <div class="body-container">
     <sign-banner :data="pageData"></sign-banner>
     <sign-content :data="pageData"></sign-content>
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
    /*/!*时间范围*!/
    const systemConfig = axios.getSystemConfig()/!*获取系统配置*!/
    const studentIformation = axios.getStudent("传入学生ID")/!*获取学生信息*!/
    const nowClockStartTime = Number(getHour('hour'))
    const clockStartNumber = Number(this.clockStartTime.substring(0,2)
    const clockEndNumber = Number(this.clockEndTime.substring(0,2)
    this.clockStartTime =  systemConfig.clockStartTime
    this.clockEndTime =  systemConfig.clockEndTime
    this.profilePhoto = require(`${studentIformation.data.profilePhoto}`)
    this.studentName = studentIformation.data.studentName
    if(Number(this.clockStartTime.substring(0,2))<nowClockStartTime){
      this.state = 'default'
    }else if(clockStartNumber<=nowClockStartTime&&nowClockStartTime<clockEndNumber){
      this.state = 'primary'
    }else if(nowClockStartTime>clockEndNumber&&nowClockStartTime<24){
      this.state = 'warning'
    }else if('打卡成功返回状态'){
      this.state = 'sucess'
    }else{
      this.state = 'danger'
    }*/
  },
  data () {
    return {
      pageName: 'StudentsClockIn',
      pageData: {
        clockStartTime:'18:00',
        clockEndTime:'23:00',
        state:'sucess',
        profilePhoto:'',
        studentName:''
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

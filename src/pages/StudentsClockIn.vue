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
    /*获取系统配置*/
    getSystemConfig:function () {
      const _this = this
      this.$http.get('/api/system-config').then(function (res) {
        if(res){
          _this.pageData.clockStartTime =  res.data.data.clockStartTime.substring(0,4)
          _this.pageData.clockEndTime =  res.data.data.clockEndTime.substring(0,4)
          /*获取当前时间*/
          const nowClockStartTime = Number(units.getCurrentTime('hour'))
          const clockStartNumber = Number(_this.clockStartTime.substring(0,2))
          const clockEndNumber = Number(_this.clockEndTime.substring(0,2))
          if(Number(_this.clockStartTime.substring(0,2))<nowClockStartTime){
            _this.pageData.state = 'default'
          }else if(clockStartNumber<=nowClockStartTime&&nowClockStartTime<clockEndNumber){
            _this.pageData.state = 'primary'
          }else if(nowClockStartTime>clockEndNumber&&nowClockStartTime<24){
            _this.pageData.state = 'warning'
          }else{
            _this.pageData.state = 'danger'
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取学生信息*/
    getStudentDetailsListData:function (studentId) {
      const _this = this
      this.$http.get(`/api/student/${studentId}`).then(function (res) {
        if(res){
          _this.pageData.profilePhoto = res.data.data.profilePhoto
          _this.pageData.studentName = res.data.data.studentName
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取打卡次数*/
    getStudentsClocktimes:function (studentId) {
      const _this = this
      this.$http.get(`/student-clock/${studentId}/stat/`).then(function (res) {
        if(res){
          _this.pageData.totalClock = res.data.data.totalClock
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取学生当前考勤状态*/
    getStudentClockStatus:function (studentId) {
      const _this = this
      this.$http.get('/api/student-clock-status',{
        params:{
          studentId:studentId
        }
      }).then(function (res) {
        if(res){
          _this.pageData.clockStatus = res.data.data
          if(_this.pageData.clockStatus===1){
            _this.pageData.state = 'default'
          }else if(_this.pageData.clockStatus===2){
            _this.pageData.state = 'sucess'
          }else if(_this.pageData.clockStatus===3){
            _this.pageData.state = 'warning'
          }else if(_this.pageData.clockStatus===4){
            _this.pageData.state = 'danger'
          }else{
            _this.pageData.state = 'primary'
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*打卡监听子组件事件*/
    listenStudentClockFun:function (data) {
      const _this = this
      this.$http.get('/api/student-clock',{
        params:data
      }).then(function (res) {
        if(res){
          if(res.data.data.code === "000000"){
            this.pageData.state = 'sucess'
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
</style>

<template>
  <div class="body-container">
     <sign-banner :data="pageData"></sign-banner>
     <sign-content :data="pageData" @studentClockFun="listenStudentClockFun"></sign-content>
     <sign-user :data="pageData"></sign-user>
     <sign-tab></sign-tab>
  </div>
</template>

<script>
import signBanner from '../components/SignBanner'
import signContent from '../components/signContent'
import signTab from '../components/signTab'
import signUser from '../components/signUser'
import units from '../units/tools'
export default {
  components: {signBanner, signContent, signTab, signUser},
  name: 'students-clock-in',
  mounted: function () {
    this.getSystemConfig()/*获取系统配置*/
    this.getStudentClockStatus(this.pageData.studentId)/*获取学生当前考勤状态*/
    this.getStudentDetailsListData(this.pageData.studentId)/*获取学生信息*/
    this.getStudentsClocktimes(this.pageData.studentId)/*获取总打卡次数*/
  },
  data () {
    return {
      pageName: 'StudentsClockIn',
      pageData: {
        checkDevice:'',/*检查设备*/
        studentId:201760230413,/*学生ID*/
        clockStartTime:'',/*开始打卡时间*/
        clockEndTime:'',/*结束打卡时间*/
        clockAddressSettingList:[],/*系统设定的打卡地址参数*/
        profilePhoto:'',/*头像*/
        studentName:'',/*学生姓名*/
        clockStatus:'',/*学生当前考勤状态 0时间未到禁止打卡，1未打卡，2到勤，3晚归，4未归*/
        totalClock:0,/*打卡次数*/
        clockStateCode:''/* 考勤状态*/,
        isRequested:false
      }
    }
  },
  methods: {
    /*获取系统配置*/
    getSystemConfig:function () {
      this.$http.get('/api/system-config').then(function (res) {
        if(res){
          const data = res.data.data
          this.pageData.clockStartTime =  data.clockStartTime.substring(0,5)
          this.pageData.clockEndTime =  data.clockEndTime.substring(0,5)
          this.pageData.checkDevice = data.checkDevice
          this.pageData.clockAddressSettingList = data.clockAddressSettingList
          this.pageData.isRequested = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取学生信息*/
    getStudentDetailsListData:function (studentId) {
      this.pageData.isRequested = false
      this.$http.get(`/api/student/${studentId}`).then(function (res) {
        if(res){
          this.pageData.profilePhoto = res.data.data.profilePhoto
          this.pageData.studentName = res.data.data.studentName
          this.pageData.isRequested = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取打卡次数*/
    getStudentsClocktimes:function (studentId) {
      this.pageData.isRequested = false
      this.$http.get(`/api/student-clock/${studentId}/stat/`).then(function (res) {
        if(res){
          this.pageData.totalClock = res.data.data.totalClock
          this.pageData.isRequested = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取学生当前考勤状态*/
    getStudentClockStatus:function (studentId) {
      this.pageData.isRequested = false
      this.$http.get('/api/student-clock-status',{
        params:{
          studentId:studentId
        }
      }).then(function (res) {
        if(res){
          this.pageData.clockStatus = res.data.data
          if(res.data.data===1){
           const nowClockStartTime = units.getCurrentTime('hour').substring(0,5)
           if(nowClockStartTime<this.pageData.clockStartTime){
             this.pageData.clockStatus = 0
           }else if(this.pageData.clockStartTime<=nowClockStartTime&&nowClockStartTime<=this.pageData.clockEndTime){
             this.pageData.clockStatus = 1
           }else if(nowClockStartTime>this.pageData.clockEndTime){
             this.pageData.clockStatus = 4
           }
         }
          this.pageData.isRequested = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*打卡监听子组件事件*/
    listenStudentClockFun:function () {
      const clockStatus = this.pageData.clockStatus
      this.pageData.clockStatus = 2
      if( clockStatus === 1 ){
         this.$http.get('/api/student-clock',{
           params:{}
         }).then(function (res) {
           if(res){
             if(res.data.data.code === "000000"){
               this.pageData.state = 2
             }
           }
         }).catch(function (error) {
           console.log(error)
         })
      }else{
        return false
      }

    },
  }
}
</script>

<style scoped>
</style>

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
import units from '../units/tools'
export default {
  components: {signBanner, signContent, signTab, signUser},
  name: 'students-clock-in',
  mounted: function () {
    console.log(this.pageData.clockStatus)
    this.getSystemConfig()/*获取系统配置*/
    this.getStudentClockStatus(this.pageData.studentId)/*获取学生当前考勤状态*/
    this.checkClockStatus()/*判断页面是否打卡*/
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
        clockStateCode:''/**/
      }
    }
  },
  methods: {
    /*获取系统配置*/
    getSystemConfig:function () {
      const _this = this
      this.$http.get('/api/system-config').then(function (res) {
        if(res){
          const data = res.data.data
          _this.pageData.clockStartTime =  data.clockStartTime.substring(0,5)
          _this.pageData.clockEndTime =  data.clockEndTime.substring(0,5)
          _this.pageData.checkDevice = data.checkDevice
          _this.pageData.clockAddressSettingList = data.clockAddressSettingList
          const nowClockStartTime = units.getCurrentTime('hour').substring(0,5)
          if(nowClockStartTime<_this.pageData.clockStartTime){
            _this.pageData.clockStatus = 0
          }else if(_this.pageData.clockStartTime<=nowClockStartTime&&nowClockStartTime<=_this.pageData.clockEndTime){
            _this.pageData.clockStatus = 1
          }else if(nowClockStartTime>_this.pageData.clockEndTime){
            _this.pageData.clockStatus = 4
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
      this.$http.get(`/api/student-clock/${studentId}/stat/`).then(function (res) {
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
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*判断是否打卡状态*/
    checkClockStatus(){
      /*获取当前时间*/

    },
    /*打卡监听子组件事件*/
    listenStudentClockFun:function () {
      const _this = this
      if(this.pageData.clockStatus ===1 ){
         this.$http.get('/api/student-clock',{
           params:data
         }).then(function (res) {
           if(res){
             if(res.data.data.code === "000000"){
               _this.pageData.state = 'success'
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

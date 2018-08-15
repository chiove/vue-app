<template>
  <div class="body-container">
    <teacher-clock-in-banner :data="pageData"></teacher-clock-in-banner>
    <teacher-content :data="pageData" @teacherClockFun="teacherClockFun"></teacher-content>
    <teacher-information :data="pageData"></teacher-information>
  </div>
</template>

<script>
  import teacherClockInBanner from '../components/TeacherClockInBanner'
  import teacherContent from "../components/TeacherContent"
  import teacherInformation from "../components/TeacherInformation"
  import axios from '../units/axios'
  export default {
    components:{teacherClockInBanner,teacherContent,teacherInformation},
    name: "teacher-clock-in",
    mounted:function(){
      /*/!*根据辅导员ID统计总打卡次数*!/
      const teacherClockTimes = axios.getTeacherClockTimes(this.pageData.instructorId)
      this.pageData.totalClockCount = teacherClockTimes.data.totalClockCount
      /!*根据辅导员ID查询当前考勤状态*!/
      const teacherCheck=axios.getTeacherCheck(this.pageData.instructorId)
      if(teacherCheck.data===1){
        this.pageData.state = 'default'
      }else if(teacherCheck.data===2){
        this.pageData.state = 'sucess'
      }
      /!*根据用户ID查询基本信息*!/
      const teacherBaseInformation = axios.getTeacherBaseInformation(this.pageData.instructorId)
      this.pageData.name = teacherBaseInformation.data.name
      this.pageData.profilePhoto = teacherBaseInformation.data.profilePhoto*/
    },
    updated:function(){
      /*if(this.pageData.clockStateCode === "000000"){
        this.pageData.state = 'sucess'
      }*/
    },
    data(){
      return {
        pageData:{
          instructorId:0,
          state:'',
          clockStateCode:'',
          totalClockCount:0,
          name:'',
          profilePhoto:''
        }
      }
    },
    methods:{
      teacherClockFun:function (data) {
        const state = axios.postTeacherClock(data.instructorId,data.qrCode)
        this.pageData.clockStateCode = state.code
      }
    }
  }
</script>

<style scoped>

</style>

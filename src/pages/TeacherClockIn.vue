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
  import units from '../units/tools'
  export default {
    components:{teacherClockInBanner,teacherContent,teacherInformation},
    name: "teacher-clock-in",
    mounted:function(){
      this.getSystemConfig()/*获取系统配置*/
      this.getTeacherClockTimes()/*根据辅导员ID统计总打卡次数*/
      this.getTeacherCheckStatus()/*根据辅导员ID查询当前考勤状态*/
      this.getTeacherInfo()/*根据用户ID查询基本信息*/
    },
    updated:function(){
      if(this.pageData.clockStateCode === "000000"){
        this.pageData.state = 'sucess'
      }
    },
    data(){
      return {
        pageData:{
          instructorId:100725,
          clockStatus:'',/*考勤状态*/
          clockStateCode:'',
          totalClockCount:0,
          name:'',
          profilePhoto:''
        }
      }
    },
    methods:{
      /*辅导员打卡调原生应用相机*/
      teacherClockFun:function (data) {
        if(this.pageData.clockStatus === 1){

        }else{
          return false
        }
      },
      /*根据辅导员ID统计总打卡次数*/
      getTeacherClockTimes(){
        this.$http.get('/api/instructor-clock/stat-all-count',{
          params:{
            instructorId:this.pageData.instructorId
          }
        }).then(function (res) {
          if(res){
            this.pageData.totalClockCount = res.data.data.totalClockCount
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*根据辅导员ID查询当前考勤状态*/
      getTeacherCheckStatus(){
        this.$http.get('/api/instructor-clock-status',{
          params:{
            instructorId:this.pageData.instructorId
          }
        }).then(function (res) {
          if(res){
            this.pageData.clockStatus = res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*根据辅导员ID查询基本信息*/
      getTeacherInfo(){
        this.$http.get(`/api/select-data/user/${this.pageData.instructorId}`).then(function (res) {
          if(res){
            this.pageData.name = res.data.data.name
            this.pageData.profilePhoto = res.data.data.profilePhoto
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*获取系统配置*/
      getSystemConfig:function () {
        this.$http.get('/api/system-config').then(function (res) {
          if(res){
            const data = res.data.data
            this.pageData.checkClockStartTime =  data.checkClockStartTime.substring(0,5)
            this.pageData.checkClockEndTime =  data.checkClockEndTime.substring(0,5)
            const nowClockStartTime = units.getCurrentTime('hour').substring(0,5)
            if(nowClockStartTime<this.pageData.checkClockStartTime){
              this.pageData.clockStatus = 0
            }else if(this.pageData.checkClockStartTime<=nowClockStartTime&&nowClockStartTime<=this.pageData.checkClockEndTime){
              this.pageData.clockStatus = 1
            }else if(nowClockStartTime>this.pageData.checkClockEndTime){
              this.pageData.clockStatus = 4
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
    }
  }
</script>

<style scoped>

</style>

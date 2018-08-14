<template>
  <div class="body-container">
    <teacher-clock-in-banner :data="pageData"></teacher-clock-in-banner>
    <sign-content :data="pageData" :notPosition="notPosition"></sign-content>
    <sign-user :data="pageData"></sign-user>
  </div>
</template>

<script>
  import teacherClockInBanner from '../components/TeacherClockInBanner'
  import signContent from "../components/signContent"
  import signUser from "../components/signUser"
  import axios from '../units/axios'
  import getHour from '../units/tools'
export default {
  components:{teacherClockInBanner,signContent,signUser},
  name: "teacher-clock-in",
  mounted:function(){

  },
  data(){
    return {
      notPosition:true,
      pageData:{
        studentId:0,
        clockStartTime:'',
        clockEndTime:'',
        state:''
      }
    }
  }
}
</script>

<style scoped>

</style>

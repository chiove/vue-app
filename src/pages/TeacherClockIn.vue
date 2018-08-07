<template>
  <div class="body-container">
    <teacher-clock-in-banner :data="data"></teacher-clock-in-banner>
    <sign-content :data="{data}" :notPosition="notPosition"></sign-content>
    <sign-user :data="data"></sign-user>
  </div>
</template>

<script>
  import teacherClockInBanner from '../components/TeacherClockInBanner'
  import signContent from "../components/signContent"
  import signUser from "../components/signUser"
  const data = {
    state:"warning",
    name:"张晓强",
    times:23,
  }
export default {
components:{teacherClockInBanner,signContent,signUser},
name: "teacher-clock-in",
data(){
    return {
      notPosition:true,
      data:data
    }
}
}
</script>

<style scoped>

</style>

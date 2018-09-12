<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted:function(){
    this.changeTitle(this.$route)
  },
  watch: {
    $route: {
      handler: function(val){
        this.changeTitle(val)
      },
      // 深度观察监听
      deep: true
    }
  },
  methods:{
    changeTitle(val){
      if (val.name==='PastoralCare') {
        document.title = '学生关怀'
      }else if (val.name==='StudentsClockIn') {
        document.title = '学生打卡'
      }else if (val.name==='DataStatistical') {
        document.title = '打卡统计'
      }else if (val.name==='TeacherSubmit') {
        document.title = '打卡统计'
      }else if (val.name==='TeacherHistoryMemory') {
        document.title = '打卡统计'
      }else if (val.name==='NotClockIn') {
        document.title = '学生打卡'
      }else if (val.name==='UnitException') {
        document.title = '学生打卡'
      }else if (val.name==='TeacherClockIn') {
        document.title = '查寝签到'
      }else if (val.name==='ChartStatistical') {
        document.title = '统计'
      }else if (val.name==='CheckDormitory') {
        document.title = '查寝'
      }else if (val.name==='SearchStudents') {
        document.title = '查寝'
      }else if (val.name==='ClockInDetails') {
        document.title = '打卡详情'
      }else if (val.name==='RoomDetails') {
        document.title = '寝室详情'
      }else if (val.name==='CheckPersonalInformation'||val.name==='DailyPersonalInformation') {
        document.title = '个人信息'
      }else if (val.name==='LateBackList') {
        document.title = '列表'
      }else if (val.name==='WeekPersonalInformation') {
        document.title = '打卡统计'
      }else if (val.name==='DayLateBackList') {
        document.title = '列表'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  height: 100%;
}
</style>

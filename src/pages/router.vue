<template>
  <div class="body-container">
    <ul class="router-list" @click="routerLink">
      <li v-for="(item,index) in routerList" :data-index="item.path" v-bind:key="index">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'router',
  data () {
    return {
      routerList: [ {
        path: '/pastoralCare',
        name: '关怀列表'
      },
      {
        path: '/studentsClockIn',
        name: '学生打卡主页'
      },
      {
        path: '/dataStatistical',
        name: '学生打卡数据统计'
      },
      {
        path: '/teacherSubmit',
        name: '教师反馈'
      },
      {
        path: '/teacherHistoryMemory',
        name: '辅导员打卡历史记录'
      },
      {
        path: '/notClockIn',
        name: '无需打卡'
      },
      {
        path: '/unitException',
        name: '设备异常'
      },
      {
        path: '/teacherClockIn',
        name: '辅导员打卡'
      },
      {
        path: '/chartStatistical',
        name: '统计图表，日统计、周统计'
      },
      {
        path: '/checkDormitory',
        name: '辅导员查寝'
      },
      {
        path: '/searchStudents',
        name: '辅导员查寝,查询学生列表'
      },
      {
        path: '/clockInDetails',
        name: '打卡详情'
      },
      {
        path: '/roomDetails',
        name: '寝室详情'
      },
      {
        path: '/checkPersonalInformation',
        name: '查寝个人信息'
      },
      {
        path: '/dailyPersonalInformation',
        name: '日统计个人信息'
      },
      {
        path: '/weekPersonalInformation',
        name: '周统计个人信息'
      },
      {
        path: '/lateBackList',
        name: '晚归列表'
      }
      ]
    }
  },
  methods: {
    routerLink: function (e) {
      this.$router.push({path: e.target.dataset.index})
      console.log(e.target.dataset.index)
    }
  }
}
</script>

<style scoped>
.router-list li{
  padding:20px;
  color: #3DA8F5;
}
</style>

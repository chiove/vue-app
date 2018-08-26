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
      routerList: [
      {
        path: '/studentsClockIn',
        name: '学生打卡主页'
      },

        {
          path: '/teacherClockIn',
          name: '辅导员打卡'
        },
        {
          path: '/checkDormitory',
          name: '辅导员查寝'
        },
        {
          path: '/chartStatistical',
          name: '日周统计'
        },
        {
          path: '/pastoralCare',
          name: '关怀列表'
        },
        {
          path: '/notClockIn',
          name: '无需打卡'
        },
        {
          path: '/unitException',
          name: '设备异常'
        },
      ]
    }
  },
  methods: {
    routerLink: function (e) {
      this.$router.push({path: e.target.dataset.index})
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

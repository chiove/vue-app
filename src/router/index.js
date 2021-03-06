import Vue from 'vue'
import Router from 'vue-router'
import StudentsClockIn from '@/pages/StudentsClockIn'/* 学生打卡主页 */
import DataStatistical from '@/pages/DataStatistical'/* 学生打卡数据统计 */
import TeacherSubmit from '@/pages/TeacherSubmit'/* 教师反馈 */
import TeacherHistoryMemory from '@/pages/TeacherHistoryMemory'/* 辅导员打卡历史记录 */
import PastoralCare from '@/pages/PastoralCare'/* 关怀列表 */
import NotClockIn from '@/pages/NotClockIn'/* 无需打卡 */
import UnitException from '@/pages/UnitException'/* 设备异常 */
import TeacherClockIn from '@/pages/TeacherClockIn'/* 辅导员打卡 */
import ChartStatistical from '@/pages/ChartStatistical'/* 统计图表，日统计、周统计 */
import CheckDormitory from '@/pages/CheckDormitory'/* 辅导员查寝 */
import SearchStudents from '@/pages/SearchStudents'/* 辅导员查寝,查询学生列表 */
import ClockInDetails from '@/pages/ClockInDetails'/* 打卡详情 */
import RoomDetails from '@/pages/RoomDetails'/* 寝室详情 */
import CheckPersonalInformation from '@/pages/CheckPersonalInformation'/* 查寝个人信息 */
import WeekPersonalInformation from '@/pages/WeekPersonalInformation'/* 周统计个人信息 */
import LateBackList from '@/pages/LateBackList'/* 晚归列表 */
import DayLateBackList from '@/pages/DayLateBackList'/* 晚归列表 */
import DailyPersonalInformation from '@/pages/DailyPersonalInformation'/* 日个人信息 */
import router from '@/pages/router'/* 路由 */
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'router',
      component: router
    },
    {
      path: '/pastoralCare',
      name: 'PastoralCare',
      component: PastoralCare
    },
    {
      path: '/studentsClockIn',
      name: 'StudentsClockIn',
      component: StudentsClockIn
    },
    {
      path: '/dataStatistical',
      name: 'DataStatistical',
      component: DataStatistical
    },
    {
      path: '/teacherSubmit',
      name: 'TeacherSubmit',
      component: TeacherSubmit
    },
    {
      path: '/teacherHistoryMemory',
      name: 'TeacherHistoryMemory',
      component: TeacherHistoryMemory
    },
    {
      path: '/notClockIn',
      name: 'NotClockIn',
      component: NotClockIn
    },
    {
      path: '/unitException',
      name: 'UnitException',
      component: UnitException
    },
    {
      path: '/teacherClockIn',
      name: 'TeacherClockIn',
      component: TeacherClockIn
    },
    {
      path: '/chartStatistical',
      name: 'ChartStatistical',
      component: ChartStatistical
    },
    {
      path: '/checkDormitory',
      name: 'CheckDormitory',
      component: CheckDormitory
    },
    {
      path: '/searchStudents',
      name: 'SearchStudents',
      component: SearchStudents
    },
    {
      path: '/ClockInDetails',
      name: 'ClockInDetails',
      component: ClockInDetails
    },
    {
      path: '/roomDetails',
      name: 'RoomDetails',
      component: RoomDetails
    },
    {
      path: '/checkPersonalInformation',
      name: 'CheckPersonalInformation',
      component: CheckPersonalInformation
    },
    {
      path: '/lateBackList',
      name: 'LateBackList',
      component: LateBackList
    },
    {
      path: '/dayLateBackList',
      name: 'DayLateBackList',
      component: DayLateBackList
    },
    {
      path: '/weekPersonalInformation',
      name: 'WeekPersonalInformation',
      component: WeekPersonalInformation
    },
    {
      path: '/dailyPersonalInformation',
      name: 'DailyPersonalInformation',
      component: DailyPersonalInformation
    }
  ]
})

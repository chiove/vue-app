<template>
  <div class="body-container">
    <data-banner :data="pageData"></data-banner>
    <history-select @selectDate="selectDate"></history-select>
    <div class="history-details-container">
      <history-list v-for="(item,index) in historyListData" v-bind:key="index" :data="item" :studentId="pageData.studentId"></history-list>
    </div>
    <sign-tab :pageName="pageName"></sign-tab>
  </div>
</template>

<script>
import signTab from "../components/signTab"
import dataBanner from "../components/dataBanner"
import historySelect from "../components/historySelect"
import historyList from "../components/StudentHistoryList"
import axios from 'axios'
export default {
  components: {signTab,dataBanner,historySelect,historyList},
  name: "statistical-data",
  mounted:function () {
    this.getStudentsInfo(this.pageData.studentId)/*获取学生信息*/
    this.getClockTimes(this.pageData.studentId) /*获取晚归，到勤，未归*/
  },
  data() {
    return {
      pageName:"StatisticalData",
      selectDateSearch:{},
      historyListData:[],
      pageData:{
        studentId: 201760230413,/*学生ID*/
        profilePhoto:'',/*头像地址*/
        studentName:'',/*学生姓名*/
        classNames:'',/*班级*/
        collegeName:'',/*学院名称*/
        majorName:'',/*专业名称*/
        instructorName:'',/*辅导专员*/
        studentCode:'',/*学号*/
        dormitoryName:'',/*专业*/
        bedCode:'',/*床号*/
        totalStayOutLate:'',/*晚归总数*/
        totalClock:'',/*到勤总数*/
        totalStayOut:'',/*未归总数*/
      }
    }
  },
  methods:{
    selectDate:function (data) {
      this.selectDateSearch = data
      this.getHistoryList()/*根据学生ID和日期查询全部历史*/
    },
    /*获取学生信息*/
    getStudentsInfo(studentId){
      this.$http.get(`/api/student/${studentId}`).then(function (res) {
        if(res){
          const data = res.data.data
          this.pageData.profilePhoto = data.profilePhoto
          this.pageData.collegeName = data.collegeName
          this.pageData.studentName = data.studentName
          this.pageData.classNames = data.className
          this.pageData.majorName = data.majorName
          this.pageData.instructorName = data.instructorName
          this.pageData.studentCode = data.studentCode
          this.pageData.dormitoryName = data.dormitoryName
          this.pageData.bedCode = data.bedCode
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取晚归，到勤，未归*/
    getClockTimes(studentId){
      this.$http.get(`/api/student-clock/${studentId}/stat/`).then(function (res) {
        if(res){
          const data = res.data.data
          this.pageData.totalStayOutLate = data.totalStayOutLate
          this.pageData.totalClock = data.totalClock
          this.pageData.totalStayOut = data.totalStayOut
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*根据学生ID和日期查询全部历史*/
    getHistoryList(){
      this.$http.get('/api/student-clock',{
       params:{
         year:this.selectDateSearch.year,
         month:this.selectDateSearch.month,
         studentId:this.pageData.studentId
       }
      }).then(function (res) {
        if(res){
          this.historyListData =res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>
  .history-details-container{
    height: 546px;
    overflow-y: auto;
    padding: 0 32px;
  }
</style>

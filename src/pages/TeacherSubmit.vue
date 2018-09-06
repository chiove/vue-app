<template>
  <div class="body-container">
    <data-banner :data="pageData"></data-banner>
    <history-select @selectDate="selectDate"></history-select>
    <div class="history-details-container">
      <history-list v-for="(item,index) in historyListData" v-bind:key="index" :studentId="pageData.studentId" :data="item"></history-list>
    </div>
    <submit-btn :data="pageData.studentId" v-if="careState"></submit-btn>
  </div>
</template>

<script>
import submitBtn from '../components/submitBtn'
import dataBanner from '../components/dataBanner'
import historySelect from '../components/historySelect'
import historyList from '../components/StudentHistoryList'
export default {
  components: {submitBtn, dataBanner, historySelect, historyList},
  name: 'teacher-submit',
  mounted:function(){
    this.pageData.studentId = localStorage.getItem('careStudentId')
     localStorage.getItem('careState')==='no'?this.careState =false: this.careState = true
    this.getStudentsInfo()/*获取学生信息*/
    this.getClockTimes() /*获取晚归，到勤，未归*/
  },
  activated(){
    this.pageData.studentId = localStorage.getItem('careStudentId')
    localStorage.getItem('careState')==='no'?this.careState =false: this.careState = true
    this.getStudentsInfo()/*获取学生信息*/
    this.getClockTimes() /*获取晚归，到勤，未归*/
  },
  data: function () {
    return {
      selectDateSearch:{},
      historyListData:[],
      careState:'',
      pageData:{
        studentId:1,
        profilePhoto:'',
        studentName:'',
        classNames:'',
        collegeName:'',
        majorName:'',
        instructorName:'',
        studentCode:'',
        dormitoryName:'',
        bedCode:'',
        totalStayOutLate:'',
        totalClock:'',
        totalStayOut:'',
      }
    }
  },
  methods:{
    selectDate:function (data) {
      this.selectDateSearch = data
      this.getHistoryList()/*根据学生ID和日期查询全部历史*/
    },
    /*获取学生信息*/
    getStudentsInfo(){
      this.$http.get(process.env.API_HOST+`student/${this.pageData.studentId}`).then(function (res) {
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
    getClockTimes(){
      this.$http.get(process.env.API_HOST+`student-clock/${this.pageData.studentId}/stat/`).then(function (res) {
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
      this.$http.get(process.env.API_HOST+'student-clock',{
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
    /*height: 508px;*/
    padding: 0 30px;
    overflow-y: auto;
    flex: 1;
  }
</style>

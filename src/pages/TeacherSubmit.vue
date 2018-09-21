<template>
  <div class="body-container">
    <data-banner :data="pageData"></data-banner>
    <history-select @selectDate="selectDate"></history-select>
    <div class="history-details-container">
      <!--<history-list v-for="(item,index) in historyListData" v-bind:key="index" :studentId="pageData.studentId" :data="item"></history-list>-->
      <div v-for="(item,index) in historyListData" v-bind:key="index">
        <div class="history-list" @click="viewDetailsFun($event,item)">
          <div class="history-icon" :class="item.classState"></div>
          <div class="history-text">{{item.clockDate}}</div>
          <div class="history-state" :class="item.colorState">{{item.textState}}</div>
          <img class="history-details-img" src="../assets/iconRight.png" >
        </div>
      </div>
    </div>
    <submit-btn :data="pageData.careId" v-if="careState"></submit-btn>
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
    this.pageData.careId = localStorage.getItem('careId')
     localStorage.getItem('careState')==='no'?this.careState =false: this.careState = true
    this.getStudentsInfo()/*获取学生信息*/
    this.getClockTimes() /*获取晚归，到勤，未归*/
    this.getHistoryList()
  },
  activated(){
    this.pageData.studentId = localStorage.getItem('careStudentId')
    this.pageData.careId = localStorage.getItem('careId')
    localStorage.getItem('careState')==='no'?this.careState =false: this.careState = true
    this.getStudentsInfo()/*获取学生信息*/
    this.getClockTimes() /*获取晚归，到勤，未归*/
    this.getHistoryList()
  },
  watch:{
   /* timeState:function (val) {
      if(val){
        this.getHistoryList()/!*根据学生ID和日期查询全部历史*!/
      }
    },*/
  },
  data: function () {
    return {
      selectDateSearch:{},
      historyListData:[],
      careState:'',
      pageData:{
        careId:'',
        studentId:'',
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
      },
      timeState:false
    }
  },
  methods:{
    selectDate:function (data) {
      this.selectDateSearch = data
      this.timeState = true
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
          res.data.data.forEach(function (item,index) {
            if(item.clockStatus===2){
              item.classState = 'icon-success'
              item.colorState = 'color-success'
              item.textState = '到勤'
            }else if(item.clockStatus===3){
              item.classState = 'icon-warning'
              item.colorState = 'color-warning'
              item.textState = '晚归'
            }else if(item.clockStatus===4){
              item.classState = 'icon-danger'
              item.colorState = 'color-danger'
              item.textState = '未归'
            }else{
              item.classState = 'icon-default'
              item.colorState = 'color-default'
              item.textState = '未打卡'
            }
          })
          this.historyListData =res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    viewDetailsFun(e,item){
      this.$router.push({
        name:'ClockInDetails',
        params:{
          data:item,
          studentId:this.studentId
        }
      })
    }
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
  .history-list{
    height: 106px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .history-icon{
    width:14px;
    height:14px;
    border-radius: 14px;
  }
  .history-text{
    color: rgba(85, 85, 85, 1);
    font-size: 28px;
    margin-left: 20px;
    margin-right: 136px;
  }
  .history-state{
    width: 100px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    margin-right: 80px;
    text-align: center;
    border-radius: 2px;
  }
  .history-details-img{
    width: 15px;
    height: 25px;
  }
</style>

<template>
  <div class="body-container">
    <div class="late-back-list-container">
      <div class="late-back-list-title">
        <span class="late-back-list-title-left">第{{weekNumber}}周</span>
        <span>{{clockStatusText}}{{studentsNumber}}人</span>
      </div>
      <div class="late-back-list" @click="studentDetailsFun">
        <div class="late-back-list-item" v-for="(item,index) in studentsList" v-bind:key="index" :data-index="JSON.stringify(item)">
          <div>{{item.studentName}}</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LateBackList',
  mounted:function () {
    /*接受路由传参*/
    console.log( this.$route.params)
    this.userId = localStorage.getItem('userId')
    this.clockStatus = localStorage.getItem('clockStatus')
    this.weekNumber = localStorage.getItem('weekNumber')
    if(this.clockStatus==3){
      this.clockStatusText = '晚归'
      this.studentsNumber = localStorage.getItem('stayOutLateNumber')
    }else if(this.clockStatus==4){
      this.clockStatusText = '未归'
      this.studentsNumber = localStorage.getItem('stayOutNumber')
    }
    this.getStudentsList()/*查询学生列表*/
  },
  activated:function(){
    this.userId = localStorage.getItem('userId')
    this.clockStatus = localStorage.getItem('clockStatus')
    this.weekNumber = localStorage.getItem('weekNumber')
    if(this.clockStatus==3){
      this.clockStatusText = '晚归'
      this.studentsNumber = localStorage.getItem('stayOutLateNumber')
    }else if(this.clockStatus==4){
      this.clockStatusText = '未归'
      this.studentsNumber = localStorage.getItem('stayOutNumber')
    }
    this.getStudentsList()/*查询学生列表*/
  },
  data(){
    return {
      userId:'',/*用户id*/
      clockStatus:0,/*查勤状态*/
      weekNumber:0,/*当前周数*/
      studentsNumber:0,/*人数*/
      studentsList:[],
      clockStatusText:'未归'
    }
  },
  methods:{
    studentDetailsFun:function (e) {
      if(e.target.dataset.index){
        const studentId = JSON.parse(e.target.dataset.index).studentId
        localStorage.setItem('studentId',studentId)
        this.$router.push({
          name:'WeekPersonalInformation',
        })
      }
    },
    getStudentsList(){
      this.$http.get(process.env.API_HOST+'dormitory-check/week-stat/student',{
        params:{
          userId:this.userId,
          clockStatus:this.clockStatus,
          weekNumber:this.weekNumber
        }
      }).then(function (res) {
        if(res){
          this.studentsList = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.late-back-list-container{
  overflow: hidden;
  padding: 0 33px;
  background: #fff;
  flex: 1;
}
.late-back-list-title{
  height: 120px;
  line-height: 120px;
  font-size:36px;
  font-family:PingFang-SC-Medium;
  color:rgba(153,153,153,1);
}
.late-back-list{
  height: 100%;
  overflow-y: auto;
}
.late-back-list-title-left{
  margin-right: 40px;
}

.late-back-list-item{
  height: 124px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(236,236,236,1);
  font-size:36px;
  font-family:PingFang-SC-Medium;
  color:rgba(51,51,51,1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.late-back-list-icon{
  height: 25px;
  width: 15px;
}
</style>

<template>
  <div class="body-container">
    <div class="late-back-list-container">
      <div class="late-back-list-title">
        <span class="late-back-list-title-left">第{{weekNumber}}周</span>
        <span>{{clockStatusText}}{{studentsNumber}}人</span>
      </div>
      <div class="late-back-list" @click="studentDetailsFun">
        <div class="late-back-list-item" v-for="(item,index) in studentsList" v-bind:key="index" :data-index="item.studentId">
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
    this.userId = this.$route.params.userId
    this.clockStatus = this.$route.params.clockStatus
    this.weekNumber = this.$route.params.weekNumber
    if(this.clockStatus===3){
      this.clockStatusText = '晚归'
      this.studentsNumber = this.$route.params.stayOutLateNumber
    }else if(this.clockStatus===4){
      this.clockStatusText = '未归'
      this.studentsNumber = this.$route.params.stayOutNumber
    }
    const studentsList = this.$http.getWeekStudentList(this.userId,this.clockStatus,this.weekNumber)
    this.studentsList = studentsList.data
  },
  data(){
    return {
      userId:0,/*用户id*/
      clockStatus:0,/*查勤状态*/
      weekNumber:0,/*当前周数*/
      studentsNumber:0,/*人数*/
      studentsList:[],
      clockStatusText:'未归'
    }
  },
  methods:{
    studentDetailsFun:function (e) {
      const studentId = e.target.dataset.index
      const _this = this
      this.$router.push({
        name:'weekPersonalInformation',
        params:{
          studentId:studentId,
          weekNumber:_this.weekNumber
        }
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
}
.late-back-list-title{
  height: 120px;
  line-height: 120px;
  font-size:36px;
  font-family:PingFang-SC-Medium;
  color:rgba(153,153,153,1);
}
.late-back-list{
  height: 1000px;
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

<template>
  <div class="body-container background-primary">
    <div class="data-banner">
      <div class="data-information">
        <div class="data-left">
          <img class="sign-user-img" :src="profilePhoto">
          <div>
            <div class="data-name">
              <span class="data-name-text">{{studentName}}</span>
              <span class="data-information-text">{{classNames}}</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-school" src="../assets/school.png">
              <span>{{collegeName}}</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-professional" src="../assets/professional.png">
              <span>{{majorName}}</span>
            </div>
            <div class="data-information-text">
              <span class="data-information-teacher">辅导员:{{instructorName}}</span>
              <span>学号:{{studentCode}}</span>
            </div>
          </div>
        </div>
        <div class="data-right">
          {{bedCode}}
        </div>
      </div>
    </div>
    <div class="data-form-title">
      {{weekNumber}}
    </div>
    <div class="data-form">
      <history-list v-for="(item,index) in historyListData" v-bind:key="index" :data="item"></history-list>
    </div>
  </div>
</template>

<script>
  import historyList from "../components/StudentHistoryList"
  export default {
    components:{historyList},
    name: "week-personal-information",
    mounted:function(){
      /*接受路由传参*/
      this.studentId = this.$route.params.studentId
      this.weekNumber = this.$route.params.weekNumber
      /*获取学生信息*/
      this.getStudentsDetails()
      /*根据学生ID和日期查询全部历史*/
      this.getStudentsHistoryList()
    },
    data(){
      return {
        historyListData:[],
        studentId:0,/*学生ID*/
        weekNumber:1,/*当前周数*/
        profilePhoto:'',/*头像地址*/
        studentName:'',/*学生姓名*/
        classNames:'',/*班级*/
        collegeName:'',/*学院名称*/
        majorName:'',/*专业名称*/
        instructorName:'',/*辅导专员*/
        studentCode:'',/*学号*/
        dormitoryName:'',/*专业*/
        bedCode:'',/*床号*/
      }
    },
    methods:{
      /*获取学生信息*/
        getStudentsDetails:function () {
          const studentIformation = this.$http.getStudent(this.studentId)
          this.profilePhoto = studentIformation.data.profilePhoto
          this.studentName = studentIformation.data.studentName
          this.classNames = studentIformation.data.className
          this.majorName = studentIformation.data.majorName
          this.instructorName = studentIformation.data.instructorName
          this.studentCode = studentIformation.data.studentCode
          this.dormitoryName = studentIformation.data.dormitoryName
          this.bedCode = studentIformation.data.bedCode
        },
        /*根据当前周获取日期*/
        getHistoryDate:function(){

        },
        /*根据学生ID和日期查询全部历史*/
        getStudentsHistoryList:function () {
          this.getHistoryDate()
          const studentClockHistoryYM = this.$http.studentClockHistoryYM(this.year,this.month,this.studentId)
          this.historyListData = studentClockHistoryYM.data
        }
    }
  }
</script>

<style scoped>
  .data-banner{
    height: 300px;
    background: url("../assets/dataBanner.png") 100% 100% no-repeat;
    overflow: hidden;
  }
  .data-information{
    margin-top: 68px;
    display: flex;
    justify-content: space-between;
  }
  .data-left{
    display: flex;
    justify-content: flex-start;
    margin-left: 41px;
  }
  .data-name-text{
    font-size:34px;
    font-family:PingFang-SC-Bold;
    color:rgba(254,254,254,1);
    margin-right: 17px;
    font-weight: bold;
  }
  .data-information-text{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(254,254,254,.8);
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .align-middle{
    display: flex;
    align-items: center;
  }
  .data-professional{
    width: 24px;
    height: 22px;
    margin-right: 7px;
  }
  .data-school{
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
  .data-information-teacher{
    margin-right: 30px;
  }
  .sign-user-img{
    height: 114px;
    width: 114px;
    margin-right: 27px;
  }
  .data-right{
    width:154px;
    height:44px;
    background:rgba(255,192,1,1);
    border-top-left-radius: 44px;
    border-bottom-left-radius: 44px;
    line-height: 44px;
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    text-align: center;
  }
  .data-form-title{
    height: 90px;
    background:rgba(207,235,255,1);
    border-radius:30px 30px 0px 0px;
    line-height: 90px;
    font-size:32px;
    font-family:PingFang-SC-Bold;
    color:rgba(61,168,245,1);
    text-align: center;
  }
  .data-form{
    height:890px;
    background:rgba(255,255,255,1);
    padding: 0 32px;
    overflow-y: auto;
  }

</style>

<template>
  <div class="body-container">
   <div class="details-container">
     <div class="item-container">
       <div class="details-title color-sucess">到勤</div>
       <div class="details-user">
         <div class="details-content">
           <div class="details-name">
             <img src="../assets/details-user.png">
             <span>
               梁朝伟
             </span>
           </div>
           <div class="details-state">
             <img src="../assets/details-check.png">
           </div>
         </div>
         <div class="details-time">
           <img src="../assets/details-time.png">
           <span>
             2018年7月20日 23:23:23
           </span>
         </div>
       </div>
     </div>
     <div class="item-container">
       <div class="details-title color-warning">晚归</div>
       <div class="details-user">
         <div class="details-content">
           <div class="details-name">
             <img src="../assets/details-user.png">
             <span>
               梁朝伟
             </span>
           </div>
           <div class="details-state">
             <img src="../assets/details-clock.png">
           </div>
         </div>
         <div class="details-time">
           <img src="../assets/details-time.png">
           <span>
             2018年7月20日 23:23:23
           </span>
         </div>
       </div>
       <div class="details-user">
         <div class="details-content">
           <div class="details-name">
             <img src="../assets/details-user.png">
             <span>
               梁朝伟
             </span>
           </div>
           <div class="details-state">
             <img src="../assets/details-check.png">
           </div>
         </div>
         <div class="details-time">
           <img src="../assets/details-time.png">
           <span>
             2018年7月20日 23:23:23
           </span>
         </div>
       </div>
     </div>
     <div class="item-container">
       <div class="details-title color-danger">未归</div>
       <div class="details-user">
         <div class="details-content">
           <div class="details-name">
             <img src="../assets/details-user.png">
             <span>
               梁朝伟
             </span>
           </div>
           <div class="details-state">
             <img src="../assets/details-check.png">
           </div>
         </div>
         <div class="details-time">
           <img src="../assets/details-time.png">
           <span>
             2018年7月20日 23:23:23
           </span>
         </div>
       </div>
       <div class="details-user">
         <div class="details-content">
           <div class="details-name">
             <img src="../assets/details-user.png">
             <span>
               梁朝伟
             </span>
           </div>
           <div class="details-state">
             <img src="../assets/details-check.png">
           </div>
         </div>
         <div class="details-time">
           <img src="../assets/details-time.png">
           <span>
             2018年7月20日 23:23:23
           </span>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'clock-in-details',
  mounted:function () {
    this.data = this.$route.params.data
    this.studentId = this.$route.params.studentId
    this.getDayHistoryList()
  },
  activated:function(){
    this.data = this.$route.params.data
    this.studentId = this.$route.params.studentId
    this.getDayHistoryList()
  },
  data(){
    return {
      data:{},/*接受的参数*/
      date:'',/*日期参数*/
      studentId:'',/*学生ID*/
      dataList:[]/*当天全部日期*/
    }
  },
  methods:{
    getDayHistoryList(){
      this.$http.get('/api/student-clock-history',{
        params:{
          studentId:this.studentId,
          date:`${this.data.year}-${this.data.month}-${this.data.day}`
        }
      }).then(function (res) {
        if(res){
          this.dataList = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .details-container{
    background-color: #fff;
    overflow-y: auto;
  }
.item-container{
  padding: 70px 0 20px 127px;
}
  .details-title{
    font-size:60px;
    font-family:PingFang-SC-Regular;
  }
  .details-user{
    margin: 30px 0;
  }
  .details-content{
    display: flex;
    justify-content: flex-start;
  }
  .details-name{
    font-size:36px;
    font-family:PingFang-SC-Regular;
    color:rgba(153,153,153,1);
    overflow: hidden;
  }
  .details-name img{
    width: 28px;
    height: 28px;
  }
  .details-state img{
    height: 30px;
    width: 90px;
    margin-left: 17px;
    margin-top: 14px;
  }
  .details-time{
    font-size:24px;
    font-family:PingFang-SC-Regular;
    color:rgba(203,203,203,1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .details-time img{
    height: 24px;
    width: 25px;
    margin-right: 14px;
  }
</style>

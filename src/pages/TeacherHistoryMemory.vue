<template>
    <div class="body-container">
      <div class="date-select-container">
        <date-select v-on:selectDate="listenEvent" :padding="padding"></date-select>
      </div>
      <div class="memory-title">
        <span>打卡记录</span>
      </div>
      <div class="memory-content" v-for="(item,index) in dateDataList" v-bind:key="index">
        <div class="memory-item">
          <span class="memory-icon"></span>
          <span class="memory-item-time">{{item}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import dateSelect from '../components/DateSelect'
export default {
    components:{dateSelect},
    name: "history-memory",
    mounted:function () {
      this.instructorId = this.$route.params.instructorId
      this.year = this.$route.params.year
      this.month = this.$route.params.month
      this.getTeacherHistoryList()
    },
    data:function () {
      return {
        dateDataList:[],
        padding:"0.68rem 0.533333rem",
        instructorId:'',
        year:'',
        month:''
      }
    },
    methods: {
      listenEvent:function (data) {
        this.year = data.year
        this.month =data.month
        if(this.instructorId!==''){
          this.getTeacherHistoryList()
        }
      },
      /*查询辅导员历史签到*/
      getTeacherHistoryList(){
        this.$http.get('/api/instructor-clock/stat-by-year-month',{
          params:{
            instructorId:this.instructorId,
            year:this.year,
            month:this.month
          }
        }).then(function (res) {
          if(res){
            this.dateDataList = res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
    }
}
</script>

<style scoped>
  .memory-title{
    padding: 0 40px;
    font-weight: bold;
    font-size:30px;
    font-family:PingFang-SC-Bold;
    color:rgba(85,85,85,1);
  }
  .memory-item{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    padding: 29px 65px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .memory-item-time{
    margin-left: 10px;
  }
  .memory-icon{
    display: inline-block;
    width:16px;
    height:16px;
    background:rgba(172,172,172,1);
    box-shadow:0px 0px 9px rgba(172,172,172,0.65);
    margin-right: 4px;
    border-radius: 16px;
  }
</style>

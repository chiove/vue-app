<template>
  <div class="body-container">
    <div class="title-container">
      <div :class="{'tab-left':true,'tab-active':tabLeftActive}"  @click="leftActive">日统计</div>
      <div :class="{'tab-right':true,'tab-active':tabRightActive}" @click="rightActive">周统计</div>
    </div>
    <div class="content-container">
      <div class="left-container" v-if="tabLeftActive">
          <div class="daily-statistical">
            <!--<date-select v-on:selectDate="listenEvent" :fontSize="fontSize" :formate="format"></date-select>-->
          </div>
      </div>
      <div class="right-container" v-if="tabRightActive">
        222
      </div>
    </div>
    <teacher-check-tab :pageName="pageName"></teacher-check-tab>
  </div>
</template>

<script>
  import teacherCheckTab from '../components/TeacherCheckTab'
  import dateSelect from '../components/DateSelect'
  export default {
    components:{teacherCheckTab,dateSelect},
    name: "chart-statistical",
    created:function () {

    },
    data() {
      return {
        tabLeftActive:true,
        tabRightActive:false,
        pageName:"ChartStatistical",
        fontSize:'0.48rem',
        format:'year-month-day'
      }
    },
    methods:{
      leftActive:function () {
        if(this.tabLeftActive!==true){
          this.tabLeftActive=true
          this.tabRightActive=false
        }
      },
      rightActive:function () {
        if(this.tabRightActive!==true){
          this.tabLeftActive=false
          this.tabRightActive=true
        }
      },
      listenEvent:function (data) {

      }
    }
  }
</script>

<style scoped>
  .title-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:rgba(255,255,255,1);
  }
  .tab-left,.tab-right{
    height:127px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(51,51,51,1);
    line-height: 127px;
    box-sizing: border-box;
  }
  .tab-left{
    margin-left: 135px;
  }
  .tab-right{
    margin-right: 141px;
  }
  .tab-active{
    border-bottom: 2px solid rgba(61,168,245,1);
    color:rgba(61,168,245,1);
  }
  .content-container{
    height: 985px;
    overflow-y: auto;
  }
  .daily-statistical{
    margin-top: 50px;
    text-align: center;
    font-size: 36px;
  }

</style>

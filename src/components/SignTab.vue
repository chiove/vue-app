<template>
  <div class="sign-tab clearfix">
    <div class="sign-left-position"  @click="position">
      <img class="sign-position-img" :src='positionState.active?positionState.imgUrlActive:positionState.imgUrl'>
      <div class="sign-btn-text">
        打卡
      </div>
    </div>
    <div class="sign-right-all"  @click="dataView" >
      <img class="sign-all-img" :src='dataViewState.active?dataViewState.imgUrlActive:dataViewState.imgUrl'>
      <div class="sign-btn-text">
        统计
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-tab',
  props: ['pageName'],
  mounted(){
    if(this.$route.query.userid){
      this.userId = this.$route.query.userid
    }
    const componentName = this.$router.history.current.name
    if(componentName === 'DataStatistical'){
      this.dataViewState.active = true
      this.positionState.active = false
    }else if(componentName === 'StudentsClockIn'){
      this.dataViewState.active = false
      this.positionState.active = true
    }
  },
  activated: function () {
    const componentName = this.$router.history.current.name
    if(componentName === 'DataStatistical'){
      this.dataViewState.active = true
      this.positionState.active = false
    }else if(componentName === 'StudentsClockIn'){
      this.dataViewState.active = false
      this.positionState.active = true
    }
  },
  data: function () {
    return {
      userId:18500108150888,
      positionState: {
        active: true,
        imgUrlActive: require('../assets/positionActive.png'),
        imgUrl: require('../assets/position.png')
      },
      dataViewState: {
        active: false,
        imgUrlActive: require('../assets/allActive.png'),
        imgUrl: require('../assets/all.png')
      }
    }
  },
  methods: {
    position: function () {
      const flag = this.positionState.active
      if (flag !== true) {
        this.dataViewState.active = false
        this.positionState.active = true
        this.$router.push({
          path: '/studentsClockIn',
          query: {
            userid: this.userId
          }
        })
      }
    },
    dataView: function () {
      const flag = this.dataViewState.active
      if (flag !== true) {
        this.positionState.active = false
        this.dataViewState.active = true
        this.$router.push({
          path: '/dataStatistical',
          query: {
            userid: this.userId
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .sign-tab{
    max-width: 1125px;
    width: 100%;
    height: 98px;
    background-color: #fff;
    font-size: 22px;
    color: #555555;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sign-left-position{
    margin-left: 174px;
  }
  .sign-position-img{
    display: block;
    width: 36px;
    height: 40px;
    margin: 0 auto;
  }
  .sign-right-all{
    margin-right: 170px;
  }
  .sign-all-img{
    display: block;
    height: 40px;
    width: 40px;
    margin: 0 auto;
  }
</style>

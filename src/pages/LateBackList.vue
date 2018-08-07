<template>
  <div class="body-container">
    <div class="late-back-list-container">
      <div class="late-back-list-title">
        <span class="late-back-list-title-left">2018年7月23日</span>
        <span>晚归30人</span>
      </div>
      <div class="late-back-list">
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
        <div class="late-back-list-item">
          <div>梁朝伟</div>
          <img class="late-back-list-icon" src="../assets/selectRight.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LateBackList'
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

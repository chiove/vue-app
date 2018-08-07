<template>
    <div class="check-room-container">
      <div class="check-room-head">
        <div>
          <span class="check-room-number">104寝室</span>
          <span class="check-room-name">(宿舍名)</span>
        </div>
        <div>
          <span class="check-room-person">4人</span>
          <img class="check-room-icon" src="../assets/selectRight.png">
        </div>
      </div>
      <div class="check-room-line"></div>
      <div class="check-room-body">
        <div class="check-room-not-arrive">
          <div class="check-room-state-number color-danger">2</div>
          <div class="check-room-text">未归人数</div>
        </div>
        <div class="check-room-late">
          <div class="check-room-state-number color-warning">3</div>
          <div class="check-room-text">晚归人数</div>
        </div>
        <div class="check-room-state">未查寝</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "check-room-list"
    }
</script>

<style scoped>
.check-room-container{
  width:690px;
  height:273px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  box-shadow:6px 0 13px rgba(40,40,40,0.14);
  margin: 22px auto;
}
  .check-room-head{
    width:655px;
    height: 105px;
    line-height: 105px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }
  .check-room-name{
    width:122px;
    height:32px;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
  }
  .check-room-number{
    font-size:34px;
    font-family:PingFang-SC-Bold;
    color:rgba(85,85,85,1);
  }
  .check-room-person{
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
  }
  .check-room-icon {
    height: 31px;
    width: 17px;
  }
  .check-room-line{
    width:655px;
    height:2px;
    background:rgba(236,236,236,1);
    margin: 0 auto;
  }
  .check-room-body{
    width:655px;
    height: 166px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .check-room-not-arrive{
    margin-left: 56px;
  }
  .check-room-late{
    margin-left: 80px;
    margin-right: auto;
  }
  .check-room-state{
    width:162px;
    height:52px;
    background:rgba(211,37,37,1);
    /*background:rgba(149,149,149,1);*/
    border-radius:8px;
    text-align: center;
    line-height: 52px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
  }
.check-room-state-number{
  font-size:56px;
  font-family:PingFang-SC-Bold;
  text-align: center;
}
  .check-room-text{
    font-size: 26px;
    font-family:PingFang-SC-Medium;
    color: #999;
  }
</style>

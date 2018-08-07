<template>
    <div class="data-banner">
      <div class="data-information">
        <div class="data-left">
          <img class="sign-user-img" src="../assets/head.png">
          <div>
            <div class="data-name">
              <span class="data-name-text">刘震云</span>
              <span class="data-information-text">2018级5班</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-school" src="../assets/school.png">
              <span>重庆工业职业技术学院</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-professional" src="../assets/professional.png">
              <span>视觉与传达专业</span>
            </div>
            <div class="data-information-text">
              <span class="data-information-teacher">辅导员:王老师</span>
              <span>学号:2018130512</span>
            </div>
          </div>
        </div>
        <div class="data-right">
          608室4床
        </div>
      </div>
      <div class="data-line"></div>
      <div class="data-number">
        <div class="data-number-text data-late">
          <div>2</div>
          <div>累计晚归</div>
        </div>
        <div class="data-align"></div>
        <div class="data-number-text">
          <div>300</div>
          <div>累计到勤</div>
        </div>
        <div class="data-align"></div>
        <div class="data-number-text data-back">
          <div>1</div>
          <div>累计未归</div>
        </div>
      </div>
      <div class="background-img">
        <img src="../assets/historySelect.png">
      </div>
    </div>
</template>

<script>
export default {
    name: "data-banner"
}
</script>

<style scoped>
  .data-banner{
    height: 487px;
    max-width: 1125px;
    width: 100%;
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
    margin-top: 30px;
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
  .data-line{
    width:483px;
    height:1px;
    background:rgba(236,236,236,.3);
    margin: 31px auto;
  }
  .data-number{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .data-number-text{
    height:72px;
    font-size:26px;
    font-family:PingFang-SC-Bold;
    color:rgba(255,255,255,.8);
    text-align: center;
  }
  .data-late{
    margin-left: 103px;
  }
  .data-back{
    margin-right: 103px;
  }
  .data-align{
    width:2px;
    height:30px;
    background:rgba(255,255,255,.8);
  }
  .background-img{
    height: 52px;
  }
  .background-img img{
    width: 100%;
  }
</style>

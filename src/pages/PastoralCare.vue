<template>
  <div class="body-container">
    <div class="title-container">
      <div :class="{'tab-left':true,'tab-active':tabLeftActive}"  @click="leftActive">已关怀</div>
      <div :class="{'tab-right':true,'tab-active':tabRightActive}" @click="rightActive">未关怀</div>
    </div>
    <div class="content-container">
      <div class="left-container" v-if="tabLeftActive">
        <div class="care-item">
          <div class="care-item-left">
            <img class="care-item-img" src="../assets/head.png">
          </div>
          <div class="care-item-center">
            <div class="care-item-name">梁朝伟<span class="care-item-class">(132班)</span></div>
            <div class="care-item-number">
              学号：2018130212
            </div>
          </div>
          <div class="care-item-right">
            <div class="care-item-task">
              任务时间
            </div>
            <div class="care-item-date">
              2018年7月23日
            </div>
          </div>
        </div>
        <div class="care-item">
          <div class="care-item-left">
            <img class="care-item-img" src="../assets/head.png">
          </div>
          <div class="care-item-center">
            <div class="care-item-name">梁朝伟<span class="care-item-class">(132班)</span></div>
            <div class="care-item-number">
              学号：2018130212
            </div>
          </div>
          <div class="care-item-right">
            <div class="care-item-task">
              任务时间
            </div>
            <div class="care-item-date">
              2018年7月23日
            </div>
          </div>
        </div>
      </div>
      <div class="right-container" v-if="tabRightActive">
        <div class="care-item">
          <div class="care-item-left">
            <img class="care-item-img" src="../assets/head.png">
          </div>
          <div class="care-item-center">
            <div class="care-item-name">梁朝伟<span class="care-item-class">(132班)</span></div>
            <div class="care-item-number">
              学号：2018130212
            </div>
          </div>
          <div class="care-item-right">
            <div class="care-item-task">
              任务时间
            </div>
            <div class="care-item-date">
              2018年7月23日
            </div>
          </div>
        </div>
        <div class="care-item">
          <div class="care-item-left">
            <img class="care-item-img" src="../assets/head.png">
          </div>
          <div class="care-item-center">
            <div class="care-item-name">梁朝伟<span class="care-item-class">(132班)</span></div>
            <div class="care-item-number">
              学号：2018130212
            </div>
          </div>
          <div class="care-item-right">
            <div class="care-item-task">
              任务时间
            </div>
            <div class="care-item-date">
              2018年7月23日
            </div>
          </div>
        </div>
        <div class="care-item">
          <div class="care-item-left">
            <img class="care-item-img" src="../assets/head.png">
          </div>
          <div class="care-item-center">
            <div class="care-item-name">梁朝伟<span class="care-item-class">(132班)</span></div>
            <div class="care-item-number">
              学号：2018130212
            </div>
          </div>
          <div class="care-item-right">
            <div class="care-item-task">
              任务时间
            </div>
            <div class="care-item-date">
              2018年7月23日
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  name: 'pastoral-care',
  created: function () {

  },
  data () {
    return {
      tabLeftActive: true,
      tabRightActive: false
    }
  },
  methods: {
    leftActive: function () {
      if (this.tabLeftActive !== true) {
        this.tabLeftActive = true
        this.tabRightActive = false
      }
    },
    rightActive: function () {
      if (this.tabRightActive !== true) {
        this.tabLeftActive = false
        this.tabRightActive = true
      }
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
.left-container,.right-container{
  overflow: auto;
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
  height: 1083px;
  padding: 0 30px;
}
.care-item{
  height:162px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  box-shadow:6px 0px 10px rgba(181,181,181,0.31);
  margin: 9px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.care-item-left{
  height: 80px;
  width: 80px;
  margin-left: 13px;
}
.care-item-img{
 height: 80px;
 width: 80px;
 border-radius: 80px;
}
.care-item-center {
  margin-left: 27px;
  width: 300px;
  margin-right: 80px;
}
.care-item-name{
  font-size:34px;
  font-family:PingFang-SC-Medium;
  color:rgba(85,85,85,1);
}
.care-item-class{
  margin-left: 20px;
  font-size: 28px;
  color:rgba(153,153,153,1);
}
.care-item-number{
    font-size:22px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
}
.care-item-right{
  text-align: center;
  width: 190px;
  font-size:24px;
  font-family:PingFang-SC-Medium;
  color:rgba(85,85,85,1);
  margin-right: 22px;
}
</style>

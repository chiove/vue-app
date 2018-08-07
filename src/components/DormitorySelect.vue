<template>
    <div class="dormitory-select-container">
      <div class="dormitory-build" v-if="buildState" @click="getBuildValue">
        <div class="dormitory-build-item">
          1号楼
        </div>
        <div class="dormitory-build-item">
          2号楼
        </div>
        <div class="dormitory-build-item">
          3号楼
        </div>
      </div>
      <div class="dormitory-floor" v-if="floorState" @click="getFloorValue">
        <div class="dormitory-floor-item">
          全部楼层
        </div>
        <div class="dormitory-floor-item">
          一层
        </div>
        <div class="dormitory-floor-item">
          二层
        </div>
        <div class="dormitory-floor-item">
          三层
        </div>
      </div>
      <div class="dormitory-room" v-if="roomState" @click="getRoomValue">
        <div class="dormitory-room-item">
          1号宿舍
        </div>
        <div class="dormitory-room-item">
          2号宿舍
        </div>
        <div class="dormitory-room-item">
          3号宿舍
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "dormitory-select",
      data(){
          return {
            dormitoryParams:{},
            buildState:true,
            floorState:false,
            roomState:false
          }
      },
      methods:{
        getBuildValue:function () {
          this.floorState = true
        },
        getFloorValue(){
          this.roomState = true
        },
        getRoomValue(){
          this.buildState = false
          this.floorState = false
          this.roomState = false
        }
      }
    }
</script>

<style scoped>
.dormitory-select-container{
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  background-color: #fff;
}
.dormitory-build-item,.dormitory-floor-item,.dormitory-room-item{
  font-size:34px;
  font-family:PingFang-SC-Medium;
  background-color: #fff;
  color:rgba(85,85,85,1);
  width: 180px;
  padding: 29px 0 29px 70px;
}
.dormitory-build{
  height: inherit;
  background:rgba(241,248,254,1);
}
.dormitory-build-item{
  background:rgba(241,248,254,1);
}
.dormitory-build-active{
  background-color: #fff;
  color: rgba(62, 168, 245, 1);
  border-left: 10px solid rgba(62, 168, 245, 1);
}
.dormitory-text-active{
  color: rgba(62, 168, 245, 1);
}
</style>

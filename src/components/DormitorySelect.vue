<template>
    <div class="dormitory-select-container">
      <div class="dormitory-build" v-if="buildState" @click="getBuildValue">
        <div  :class="{'dormitory-build-item':true,'dormitory-text-active':buildingActive===item.buildingId}" v-for="(item ,index) in buildingList" v-bind:key="index" :data-index="JSON.stringify(item)">
          {{item.buildingName}}号楼
        </div>
      </div>
      <div class="dormitory-floor" v-if="floorState" @click="getFloorValue">
        <div :class="{'dormitory-floor-item':true,'dormitory-text-active':floorActive===''}" :data-index="floorAll">
          全部楼层
        </div>
        <div :class="{'dormitory-floor-item':true,'dormitory-text-active':floorActive===item}" v-for="(item,index) in floorList" v-bind:key="index" :data-index="item">
          {{item}}层
        </div>
      </div>
      <div class="dormitory-room" v-if="roomState" @click="getRoomValue">
        <div class="dormitory-room-item" :data-index="roomAll">
          全部房间
        </div>
        <div class="dormitory-room-item" v-for="(item,index) in roomList" v-bind:key="index" :data-index="JSON.stringify(item)">
          {{item.dormitoryName}}宿舍
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "dormitory-select",
      props:['data'],
      mounted:function(){
        this.buildingList = this.data
      },
      watch:{
        'data':function(val){
          this.buildingList = val
        }
      },
      data(){
        return {
          dormitoryParams:{},
          buildState:true,
          floorState:false,
          roomState:false,
          buildingActive:'',/*选择楼栋*/
          buildingName:'',/*楼栋名称*/
          floorActive:'',/*选择层数*/
          floorAll:'floorAll',/*全部楼层*/
          roomActive:'',/*选择宿舍*/
          roomAll:'roomAll',/*选择全部宿舍*/
          dormitoryName:'',/*宿舍名称*/
          userId:'',/*用户ID*/
          buildingList:[],/*楼栋列表*/
          floorList:[],/*楼层列表*/
          roomList:[]/*宿舍列表*/
        }
      },
      methods:{
        getBuildValue:function (e) {
          this.floorState = true
          /*获取层数*/
         if(e.target.dataset.index){
           const floorList  = []
           const data = JSON.parse(e.target.dataset.index)
           this.buildingActive = data.buildingId
           this.buildingName = data.buildingName
           for (let i=1;i<data.floorNumber+1;i++) {
             floorList.push(i)
           }
           this.floorList = floorList
         }
        },
        getFloorValue(e){
          this.roomState = true
          if(e.target.dataset.index==='floorAll'){
            this.floorActive = ''
          }else{
            this.floorActive = Number(e.target.dataset.index)
          }
          this.getRoomList()
        },
        getRoomValue(e){
          this.buildState = false
          this.floorState = false
          this.roomState = false
          if(e.target.dataset.index==='roomAll'){
            this.roomActive = ''
            this.dormitoryName = '全部宿舍'
          }else{
            const data = JSON.parse(e.target.dataset.index)
            this.roomActive = data.dormitoryId
            this.dormitoryName = data.dormitoryName
          }
          this.$emit('sendParams',{
            buildingId:this.buildingActive,
            floorNumber:this.floorActive,
            dormitoryId:this.roomActive,
            buildingName:`${this.buildingName}号楼`,
            dormitoryName:`${this.dormitoryName}宿舍`
          })
        },
        /*查询宿舍列表*/
        getRoomList(){
          this.$http.get(process.env.API_HOST+'dormitory/all',{
            params:{
              buildingId:this.buildingActive,
              floorNumber:this.floorActive,
            }
          }).then(function (res) {
            if(res){
              this.roomList = res.data.data
            }
          }).catch(function (error) {
            console.log(error)
          })
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
  height: 450px;
  background:rgba(241,248,254,1);
  overflow-y: auto;
}
.dormitory-floor{
  height: 450px;
  overflow-y: auto;
  flex: 1;
}
.dormitory-room{
  height: 450px;
  overflow-y: auto;
  flex: 1;
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

<template>
  <div class="body-container">
    <div class="search-bar">
      <div class="search-input" @click="inputContent">
        <div class="search-placeholder">
          <img src="../assets/search.png">
          <span class="search-placeholder-text">搜索学号/姓名</span>
        </div>
      </div>
      <div class="search-select">
        <div class="search-select-item-first" @click="dormitoryFun">
          <span :class="{'color-primary':dormitoryActive}">{{dormitoryTitle}}</span>
          <img :src="dormitoryActive?selectIconActive:selectIcon">
        </div>
        <div class="search-select-item" @click="checkFun">
          <span :class="{'color-primary':checkActive}">{{checkTitle}}</span>
          <img :src="checkActive?selectIconActive:selectIcon">
        </div>
        <div class="search-select-item" @click="sortFun">
          <span :class="{'color-primary':sortActive}">{{sortTitle}}</span>
          <img :src="sortActive?selectIconActive:selectIcon">
        </div>
        <div class="number-select-icon" @click="roomSortFun">
          <span :class="{'color-primary':roomSortActive}" style="width: 1.4rem">寝室号</span>
          <img :src="roomSortActive?numberIconActive:numberIcon">
        </div>
      </div>
    </div>
    <div class="search-container">
      <div class="search-select-container" v-if="checkActive" @click="getSearchValue($event,'check')">
        <div :class="{'list-item':true,'color-primary':colorState===item.text}" v-for="(item,index) in checkData" :data-index="JSON.stringify(item)" >{{item.text}}</div>
      </div>
      <div class="search-select-container" v-if="sortActive" @click="getSearchValue($event,'sort')">
        <div :class="{'list-item':true,'color-primary':colorState===item.text}"  v-for="(item,index) in sortData" :data-index="JSON.stringify(item)">{{item.text}}</div>
       </div>
      <div class="search-select-container" v-if="dormitoryActive">
        <dormitory-select :data="buildingList" @sendParams="listenParamsEvent"></dormitory-select>
      </div>
      <div class="search-result-list">
        <check-room-list v-for="(item,index) in roomListData" v-bind:key="index" :data="item" :userId="userId"></check-room-list>
      </div>
    </div>
    <teacher-check-tab></teacher-check-tab>
  </div>
</template>

<script>
import teacherCheckTab from '../components/TeacherCheckTab'
import dormitorySelect from '../components/DormitorySelect'
import checkRoomList from '../components/CheckRoomList'
export default {
  components: {teacherCheckTab, dormitorySelect, checkRoomList},
  name: 'check-dormitory',
  mounted:function(){
    if(this.$route.query.userid){
      this.userId = this.$route.query.userid
      localStorage.setItem('checkDormitoryUserId',this.$route.query.userid)
    }
    this.getBuildingList()/*查询楼栋*/
    this.getRoomListData()/*查询宿舍列表*/
  },
  activated:function () {
    this.getRoomListData()/*查询宿舍列表*/
  },
  data () {
    return {
      inputState: true,
      selectIcon: require('../assets/selectDown.png'),
      numberIcon: require('../assets/numberSelect.png'),
      selectIconActive: require('../assets/selectDownActive.png'),
      numberIconActive: require('../assets/numberSelectActive.png'),
      dormitoryTitle: '宿舍选择',
      checkTitle: '查寝状态',
      sortTitle: '考勤状态',
      dormitoryChildTitle: '寝室选择',
      dormitoryActive: false,
      sortActive: false,
      checkActive: false,
      roomSortActive:false,
      userId:100725,
      buildingId:1,/*楼栋ID*/
      floorNumber:'',/*楼层*/
      dormitoryId:'',/*宿舍ID*/
      orderBy:'',/*考勤状态查询*/
      descOrAsc:'',/*宿舍号升序降序 asc升序，desc降序*/
      checkStatus:null,
      colorState:'',
      checkData: [
        {
          id:'',
          text:'全部查寝状态'
        },
        {
          id: true,
          text: '已查寝'
        },
        {
          id: false,
          text: '未查寝'
        }
      ],
      sortData: [
        {
          id: '',
          key: '',
          text: '全部考勤状态'
        },
        {
          id: 'stayOutNum',
          key: 'desc',
          text: '未归人数由高到低'
        },
        {
          id: 'stayOutNum',
          key: 'asc',
          text: '未归人数由低到高'
        },
        {
          id: 'stayOutLateNum',
          key: 'desc',
          text: '晚归人数由高到低'
        },
        {
          id: 'stayOutLateNum',
          key: 'asc',
          text: '晚归人数由低到高'
        }
      ],
      buildingList:[],/*楼栋列表,传入子组件*/
      roomListData:[],/*查询出宿舍列表*/
    }
  },
  methods: {
    inputContent: function () {
      this.$router.push({
        name: 'SearchStudents',
        query: {
          userid: this.userId
        }
      })
    },
    /*查询楼栋*/
    dormitoryFun: function () {
      this.sortActive = false
      this.checkActive = false
      this.dormitoryActive ? this.dormitoryActive = false : this.dormitoryActive = true
    },
    checkFun: function () {
      this.sortActive = false
      this.dormitoryActive = false
      this.checkActive ? this.checkActive = false : this.checkActive = true
    },
    sortFun: function () {
      this.checkActive = false
      this.dormitoryActive = false
      this.sortActive ? this.sortActive = false : this.sortActive = true
    },
    getSearchValue: function (e, type) {
      if (e.target.dataset.index === undefined) {
        return
      } else {
        if (type === 'check') {
          const data = JSON.parse(e.target.dataset.index)
          this.colorState = e.target.innerText
          this.checkTitle = e.target.innerText
          this.checkStatus = data.id
        }else if (type === 'sort') {
          this.colorState = e.target.innerText
          this.sortTitle = e.target.innerText
          const data = JSON.parse(e.target.dataset.index)
          this.orderBy = data.id
          this.descOrAsc = data.key
        }
        this.getRoomListData()
      }
      this.sortActive = false
      this.checkActive = false
      this.dormitoryActive = false
    },
    roomSortFun(){
      this.sortActive = false
      this.checkActive = false
      this.dormitoryActive = false
      this.roomSortActive ? this.roomSortActive = false : this.roomSortActive = true
      if(this.roomSortActive){
        this.descOrAsc = 'asc'
      }else{
        this.descOrAsc = 'desc'
      }
      this.orderBy = 'dormitoryCode'
      this.getRoomListData()
    },
    /*根据Id查询楼栋*/
    getBuildingList() {
      this.$http.get(process.env.API_HOST+'dormitory-building/query-by-user', {
        params: {
          userId: this.userId
        }
      }).then(function (res) {
        if (res) {
          this.buildingList = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*监听查询参数*/
    listenParamsEvent(data) {
      this.buildingId = data.buildingId
      this.floorNumber = data.floorNumber
      this.dormitoryId = data.dormitoryId
      this.dormitoryTitle = data.buildingName
      this.dormitoryChildTitle = data.dormitoryName
      this.getRoomListData()
      this.dormitoryActive = false
    },
    getRoomListData(){
      this.$http.get(process.env.API_HOST+'dormitory-list-query',{
        params:{
          buildingId:this.buildingId,
          floorNumber:this.floorNumber,
          dormitoryId:this.dormitoryId,
          descOrAsc:this.descOrAsc,
          orderBy:this.orderBy,
          userId:this.userId,
          checkStatus:this.checkStatus
        }
      }).then(function (res) {
        if(res){
            this.roomListData = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>
  .search-bar{
    height: 211px;
    max-width: 1125px;
    width: 100%;
    background:rgba(255,255,255,1);
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #f7f7f7;
  }
  .search-input{
    position: relative;
    padding: 0 30px;
    height:80px;
    background:rgba(247,247,247,.07);
    border-radius:8px;
    margin: 32px 0 0 0;
    overflow: hidden;
  }
  .search-form{
    width:690px;
    height:80px;
    border: none;
    background:rgba(247,247,247,1);
    padding-left: 20px;
  }

  .search-placeholder{
    height:80px;
    position: absolute;
    width: calc(100% - 60px);
    top: 0;
    left: 30px;
    line-height: 80px;
    text-align: center;
    background:rgba(247,247,247,1);
  }
  .search-placeholder img{
    height: 25px;
    width: 25px;
    margin-right: 10px;
  }
  .search-placeholder-text{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
  }
  .search-select{
    height: 99px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
  .search-select-item,.number-select-icon{
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-select-item-first{
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-select-item span,.number-select-icon span,.search-select-item-first span{
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-select-item img,.search-select-item-first img{
    width: 14px;
    height: 9px;
  }
  .number-select-icon img{
    width: 19px;
    height: 22px;
  }
  .search-container{
    /*height: 901px;*/
    overflow-y: auto;
    position: relative;
    flex: 1;
  }
  .search-select-container{
    position: fixed;
    top: 211px;
    width: 100%;
    max-width: 1125px;
    height: 450px;
    overflow: auto;
  }
  .search-result-list{
    padding: 0 30px;
  }
  .list-item{
    padding: 40px 0 40px 40px;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    background-color: #fff;
  }
  .color-primary{
    color: rgba(62, 168, 245, 1)!important;
  }
  .item-active{
    padding: 40px 0 40px 40px;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color: rgba(62, 168, 245, 1);
    background-color: #fff;
  }
</style>

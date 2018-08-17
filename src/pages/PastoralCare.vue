<template>
  <div class="body-container">
    <div class="title-container">
      <div :class="{'tab-left':true,'tab-active':tabLeftActive}"  @click="leftActive">已关怀</div>
      <div :class="{'tab-right':true,'tab-active':tabRightActive}" @click="rightActive">未关怀</div>
    </div>
    <div class="content-container">
      <div class="left-container" v-if="tabLeftActive" @click="careItemFun">
        <pull-to :bottom-load-method="refreshLeft" class="file-lists">
          <div class="care-item" v-for="(item,index) in careListYes" v-bind:key="index" :data-index="item.studentId">
            <div class="care-item-left">
              <img class="care-item-img" :src="item.profilePhoto">
            </div>
            <div class="care-item-center">
              <div class="care-item-name">{{item.studentName}}<span class="care-item-class">({{item.className}}班)</span></div>
              <div class="care-item-number">
                学号：{{item.studentCode}}
              </div>
            </div>
            <div class="care-item-right">
              <div class="care-item-task">
                任务时间
              </div>
              <div class="care-item-date">
                {{item.taskDate}}
              </div>
            </div>
          </div>
        </pull-to>
      </div>
      <div class="right-container" v-if="tabRightActive"  @click="careItemFun">
        <pull-to :bottom-load-method="refreshRight" class="file-lists">
          <div class="care-item" v-for="(item,index) in careListNot" v-bind:key="index">
            <div class="care-item-left">
              <img class="care-item-img" :src="item.profilePhoto">
            </div>
            <div class="care-item-center">
              <div class="care-item-name">{{item.studentName}}<span class="care-item-class">({{item.className}}班)</span></div>
              <div class="care-item-number">
                学号：{{item.studentCode}}
              </div>
            </div>
            <div class="care-item-right">
              <div class="care-item-task">
                任务时间
              </div>
              <div class="care-item-date">
                {{item.taskDate}}
              </div>
            </div>
          </div>
        </pull-to>
      </div>

    </div>
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
  import axios from '../units/axios'
  export default {
    components: {PullTo},
    name: 'pastoral-care',
    mounted: function () {
      this.refreshLeft()
      this.refreshRight()
    },
    data () {
      return {
        tabLeftActive: true,
        tabRightActive: false,

        careStatus:1,
        instructorId:0,
        pageNoLeft:1,
        pageNoRight:1,
        pageSize:10,
        careListYes:[],
        careListNot:[]
      }
    },
    methods: {
      refreshLeft(loaded) {
        this.pageNoLeft++
        const params = {
          careStatus:1,
          instructorId:1,
          pageNo:this.pageNoLeft,
          pageSize:10
        }
        const _this = this
        axios.ajax.get('/api/care-instructor', {
          params:params
        })
          .then(function (response) {
            if(_this.pageNoLeft === response.data.totalPages){
              loaded('done')
            }
            _this.careListYes.push(...response.data.result)
            console.log(response)
            loaded('done')
          })
          .catch(function (error) {
            _this.pageNoLeft --
            console.log(error)
          })
      },
      refreshRight(loaded) {
        this.pageNoRight++
        const params = {
          careStatus:2,
          instructorId:1,
          pageNo:this.pageNoRight,
          pageSize:10
        }
        const _this = this
        axios.ajax.get('/api/care-instructor', {
          params:params
        })
          .then(function (response) {
            if(_this.pageNoRight === response.data.totalPages){
              loaded('done')
            }
            _this.careListNot.push(...response.data.result)
            console.log(response)
            loaded('done')
          })
          .catch(function (error) {
            _this.pageNoRight --
            console.log(error)
          })
      },
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
      },
      careItemFun:function (e) {
        this.$router.push({path:'/teacherSubmit',params: {
            studentId: e.target.dataset.index
          }
        })
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
  height: 100%;
  position: relative;
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
  .file-lists{
    height: 100%;
  }
</style>

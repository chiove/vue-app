<template>
    <div class="submit-container">
      <div class="submit-back" @click="submitAlert">
          提交反馈
      </div>
      <van-popup v-model="show" class="submit-alert-container">
        <div class="submit-alert">
          <div class="submit-title">反馈结果</div>
          <div class="submit-content">
            <textarea class="submit-textarea" ref="feedBackValue" placeholder="请输入关怀反馈结果..."></textarea>
          </div>
          <div class="submit-btn">
            <div class="submit-cancel" @click="cancel">取消</div>
            <div class="submit-confirm" @click="confirm">确认</div>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script>
import Vue from 'vue'
import { Popup ,Toast} from 'vant'
Vue.use(Popup)
  Vue.use(Toast)
export default {
  name: 'submit-btn',
  props:['data'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    submitAlert: function () {
      this.show = true
    },
    cancel: function () {
      this.show = false
      this.$refs.feedBackValue.value = ''
    },
    confirm: function () {
      const remark = this.$refs.feedBackValue.value
      this.$http.put(process.env.API_HOST+`care?careId=${this.data}&remark=${remark}`).then(function (res) {
        if(res){
          if(res.data.code==='000000'){
            Toast.success('提交成功');
            this.show = false
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .submit-container{
    height: 116px;
    padding: 0 30px;
  }
  .submit-back{
    height:84px;
    line-height: 84px;
    background:rgba(61,168,245,1);
    border-radius:8px;
    font-size:36px;
    font-family:PingFang-SC-Bold;
    color:rgba(254,255,255,1);
    text-align: center;
    margin: 20px auto 12px auto;
  }
  .submit-alert{
    width:600px;
    height:488px;
    background-color: #F0F2F5;
    border-radius:16px;

    box-shadow:2px 4px 4px rgba(90,90,90,0.04);
  }
  .submit-title{
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    line-height:111px;
    text-align: center;
  }
  .submit-textarea{
    height: 218px;
    width: 500px;
    border: none;
    background-color: #fff;
    display: block;
    margin: 0 auto;
    border-radius:12px;
    padding: 20px;
  }
  .submit-btn{
    height: 119px;
    display: flex;
    justify-content: space-between;
  }
  .submit-cancel,.submit-confirm{
    width:246px;
    height:80px;
    border-radius:8px;
    font-size:32px;
    font-family:PingFang-SC-Medium;
    text-align: center;
    line-height: 80px;
    margin-top: 23px;
  }
  .submit-cancel{
    color:rgba(85,85,85,1);
    background-color: #fff;
    margin-left: 30px;
  }
  .submit-confirm{
    background:rgba(61,168,245,1);
    color: #fff;
    margin-right: 30px;
  }
</style>

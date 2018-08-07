<template>
  <div class="body-container">
     <sign-banner :data="data"></sign-banner>
     <sign-content :data="data"></sign-content>
     <sign-user :data="data"></sign-user>
     <sign-tab :pageName = "pageName"></sign-tab>
  </div>
</template>

<script>
import signBanner from "../components/SignBanner"
import signContent from "../components/signContent"
import signTab from "../components/signTab"
import signUser from "../components/signUser"
const data = {
    state:"warning",
    name:"张晓强",
    times:23
  }

export default {
  components: {signBanner,signContent,signTab,signUser},
  name: 'students-clock-in',
  created:function () {

  },
  data() {
    return {
      pageName:"StudentsClockIn",
      data:data
    }
  },
    methods: {
    }
}
</script>

<style scoped>
</style>

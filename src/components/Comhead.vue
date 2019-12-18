<template>
 <div class='pagetop'>
   <div class='contain flex'>
     <div class='toplogo flex'>
        <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" class="logo"  @click="goto('/')">
        <input type="text" class="el-icon-search">
     </div>
     <div class='topnav flex'>
      <div @click="goto('/')" @mouseenter="goin(1)" @mouseleave="goout" :class="{fc:num===1}">首页</div>
      <div @click="goto('/')" @mouseenter="goin(2)" @mouseleave="goout" :class="{fc:num===2}">新手入门</div>
      <div @click="goto('/')" @mouseenter="goin(3)" @mouseleave="goout" :class="{fc:num===3}">API</div>
      <div @click="goto('/luandoupao')" @mouseenter="goin(4)" @mouseleave="goout" :class="{fc:num===4}">关于</div>
      <div @click="goto('/bujidao')" @mouseenter="goin(5)" @mouseleave="goout" :class="{fc:num===5}">注册</div>
      <div @click="goto('/login')" @mouseenter="goin(6)" @mouseleave="goout" :class="{fc:num===6}">登录</div>
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        num: -1,
     }
   },
   components: {

   },
   methods: {
    goto(path){
      this.$router.push(path)
    },
    goin(n){
      this.num = n
    },
    goout(){
      this.num = -1
    }
   },
   mounted() {

   },
   watch: {

   },
   computed: {
     
   }
 }
</script>

<style scoped lang='scss'>
  .pagetop {
    width: 100%;
    height: 60px;
    background: black;
    text-align: center;
  }
  .contain {
    width: 1400px;
    margin:  0 auto;
     height: 60px;
  }
  .toplogo {
    width: 285px;
  }
  .logo {
    width: 120px;
    height: 30px;
  }
  .topnav {
    width: 300px;
    color:rgb(226, 219, 219);
  }
  .fc {
    color: white;
  }
</style>
<template>
 <div>
    <!-- 内容 -->
    <div v-for='item in list' :key='item.id' class='listitem'>
      <!-- 用户头像 -->
      <img :src="item.author.avatar_url" class='userpic' :alt='item.author.loginname'>
      <!-- 点击量 -->
      <div class='hits'>{{item.reply_count}} / {{item.visit_count}}</div>
      <!-- 文章置顶分类 -->
      <div class='settop'>
        <div v-if='item.top===true'> <span class='good'>置顶</span></div>
        <div v-else-if='item.good===true'> <span class='good'>精华</span></div>
        <div v-else-if='item.tab==="share"'><span class='nomal'>分享</span></div>
        <div v-else-if='item.tab==="ask"'><span class='nomal'>问答</span></div>
      </div>
      <!-- 文章标题 -->
      <div class='itemtitle'>{{item.title}}</div>
      <!-- 评论者头像 -->
      <div class='observerimg'></div>
      <!-- 最后评论时间 -->
      <div class="lasttime"></div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
    getData(){
      this.$axios.req("/topics").then(res=>{
        this.list = res.data
        console.log(this.list);
      }).catch(err=>{
        console.log(err);
      })
    }
   },
   mounted() {
      this.getData()
   },
   watch: {
   },
   computed: {
   }
 }
</script>

<style scoped lang='scss'>

.listitem {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
}
.userpic {
  width: 30px;
  height: 30px;
  flex: 1;
  font-size: 12px;
}
.hits {
  flex: 3;
}
.settop {
  flex:1;
  font-size: 14px;
}
.good {
  padding: 0 3px;
   color: rgb(245, 245, 245);
  background: rgb(117, 168, 83);
}
.nomal {
  padding: 0 3px;
  color: gray;
  background: rgb(230, 230, 230);
}
.itemtitle {
  flex:18;
  background: rgb(243, 240, 240)
}
.observerimg {
  flex:1;
  background: rgb(189, 115, 115);
}
.lasttime {
  flex:2;
  background: rgb(218, 168, 168);
}
</style>
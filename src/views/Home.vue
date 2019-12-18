<template>
  <div>
    <el-card class="box-card">
      <!-- 头部分类 -->
      <div slot="header" class="boxtitle">
        <span @click="checkItem(1)" :class="{bg2:num===1}">全部</span>
        <span @click="checkItem(2)" :class="{bg2:num===2}">精华</span>
        <span @click="checkItem(3)" :class="{bg2:num===3}">分享</span>
        <span @click="checkItem(4)" :class="{bg2:num===4}">问答</span>
        <span @click="checkItem(5)" :class="{bg2:num===5}">招聘</span>
        <span @click="checkItem(6)" :class="{bg2:num===6}">客户端测试</span>
      </div>
      <!-- 内容 -->
      <!-- 根据分页 将分好页面的内容arr(list)展示 -->
      <div v-for="item in arr(list)" :key="item.id" class="listitem">
        <!-- 用户头像 -->
        <div class="userpic">
          <img :src="item.author.avatar_url" :alt="item.author.loginname" />
        </div>
        <!-- 点击量 -->
        <div class="hits">{{item.reply_count}} / {{item.visit_count}}</div>
        <!-- 文章置顶分类 -->
        <div class="settop">
          <div v-if="item.top===true">
            <span class="good">置顶</span>
          </div>
          <div v-else-if="item.good===true">
            <span class="good">精华</span>
          </div>
          <div v-else-if="item.tab==='share'">
            <span class="nomal">分享</span>
          </div>
          <div v-else-if="item.tab==='ask'">
            <span class="nomal">问答</span>
          </div>
        </div>
        <!-- 文章标题 点击跳转到指定内容页面 传参为文章id（与detail页面显示内容id一致） -->
        <div class="itemtitle" @click="jumpto(item.id)">
          <div class="article">{{item.title}}</div>
        </div>
        <!-- 评论者头像 -->
        <div class="observerimg">
          <img :src="item.avatar_url" />
        </div>
        <!-- 最后评论时间 -->
        <div class="lasttime">{{gettime(item.last_reply_at)}}</div>
      </div>
      <!-- 分页 -->
      <!-- @size-change事件 pageSize(每页显示条目个数，支持.sync修饰符) 改变时会触发 -->
      <!-- @current-change事件 currentPage(当前页数，支持.sync修饰符) 改变时会触发 -->
      <!-- :page-sizes="[10, 20, 30, 40]" 每页显示数量选择（10条/页 20条/页 30条/页 40条/页） -->
      <!-- :page-size="10" 当前每页显示条数 -->
      <!-- layout 组件布局，子组件名用逗号分隔 -->
      <!-- :total="list.length" 总条数 -->
        <el-pagination
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="list.length"
        ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { log } from 'util';

 export default {
   data () {
     return {
        list:[],
        num: 1,
        currentPage:1,
        pagesize:10, 
     }
   },
   components: {
   },
   methods: {
     handleSizeChange(val){            //@size-change事件
       this.pagesize=val              
     },
     handleCurrentChange(val){        //@current-change事件
       this.currentPage=val
     },
    arr(list) {                      // 使用时页面内容循环体应为 v-for(item in arr(list))
      return list.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      )
    },
     jumpto(pathid) {
      this.$router.push({name:'detail',query:{id:pathid}})
     },
    getData(){
      this.$axios.req("/topics").then(res=>{
        this.list = res.data
        res.data.map(item=>{
          this.$axios.req(`/topic/${item.id}`).then(res1=>{
            let avatar_url = res1.data.replies[res1.data.replies.length-1].author.avatar_url
            this.$set(item, 'avatar_url', avatar_url)
          }).catch(err=>{
          })
        })
        console.log(this.list);
      }).catch(err=>{
        console.log(err);
      })
    },
    checkItem(n) {
      this.num = n
    },
    gettime(time){
      let timestamp = (new Date()).valueOf();
      let T = new Date(time);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
      // console.log(T.getTime())  // 将转换后的标准日期转换为时间戳。
      let times = (timestamp-T)/1000/60
      if(Math.ceil(times) < 60){
        return Math.ceil(times)+'分钟前'
      }else if(Math.ceil(times/60) < 24){
        return Math.ceil(times/60) +'小时前'  
      }else if (Math.ceil(times/60/24) < 30){
        return Math.ceil(times/60/24) +'天前'
      }else if (Math.ceil(times/60/24/30) < 12){
        return Math.ceil(times/60/24/30) +'月前'
      }else{
        return '很久以前'
      }
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

<style lang='scss'>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.box-card {
  width: 89%;
  margin-left: 8vw;
}
.boxtitle > span {
  margin: 5px 10px;
  color: rgb(53, 82, 72);
  background: rgb(216, 216, 216);
}
.bg2 {
  margin: 5px 10px;
  color: blueviolet !important;
  background: rgb(89, 253, 13);
}
.listitem {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  border-bottom: 1px solid rgb(211, 211, 211);
}
.userpic {
  flex: 2;
  font-size: 12px;
}
.userpic img {
  width: 30px;
  height: 30px;
}
.hits {
  flex: 3;
}
.settop {
  flex: 2;
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
  flex: 18;
}
.article {
  width: 35vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.observerimg {
  flex: 1;
}
.observerimg img {
  width: 15px;
  height: 15px;
}
.lasttime {
  flex: 2;
  font-size: 14px;
}
</style>


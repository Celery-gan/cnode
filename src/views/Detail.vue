<template>
<div>
   <div v-if='list'>
   <el-card class="box-card">
     <!-- 文章大标题 -->
     <div class='articletitle'>{{list.title}}</div>
     <div class='articleinfo'>
       <!-- 发布时间 -->
        <div class='minuteinfo'>·发布于<span>{{gettime(list.create_at)}}</span></div>
        <!-- 作者信息 -->
        <div class='minuteinfo' v-if='list.author'>·作者{{list.author.loginname}}</div>
        <!-- 浏览次数 -->
        <div class='minuteinfo'><span>·{{list.visit_count}}</span>次浏览</div>
        <!-- 最近评论时间 -->
        <div class='minuteinfo'>·最后一次编辑是<span>{{gettime(list.last_reply_at)}}</span></div>
        <!-- 文章类型 -->
        <div class='minuteinfo'>·来自<span v-if='list.tab==="share"'>分享</span><span v-if='list.tab==="ask"'>问答</span></div>
     </div>
     <!-- 发布的主要内容 -->
      <div v-html='list.content' class='mainbody'></div>
    </el-card>
    <!-- 回复统计 -->
    <el-card class="box-card">  
        <div slot="header">
          <span>回复</span>
        </div>
      <!-- 每一层楼的答复相关信息 -->
       <div v-for='(item,index) in list.replies' :key='item.id' class='discuss'>
          <div class="flex">
            <div class='replier'>
              <!-- 楼层答复人头像 -->
              <div> <img :src="item.author.avatar_url" class='textpic'></div> 
               <!-- 楼层答复人name -->
              <div class='textuser'>{{item.author.loginname}}</div>   
               <!-- 楼层信息 -->       
              <div class='textlevel'>{{index+1}}楼·</div>
              <!-- 楼层答复时间 -->              
              <div class='textlevel'>{{gettime(item.create_at)}}</div>   
              <!-- 楼层答复时间 -->  
              <div class='textuser' v-if='item.id === list.author_id'>{{item.author.loginname}}</div>
            </div>
              <!-- 楼层回答点赞次数-->
            <div class="el-icon-ice-drink" v-if='item.ups.length > 0'>{{item.ups.length}}</div> 
          </div>
          <!-- 每层楼的回复的内容 -->
          <div v-html="item.content" class='criticism'></div>
       </div>
    </el-card>
 </div>
</div>
</template>

<script>
import { get } from 'http'
 export default {
   data () {
     return {
      articleid:'',
      list:{},
     }
   },
   components: {
    
   },
   methods: {
    getData(){      //根据传送过来的id 获取相应内容
      this.$axios.req(`/topic/${this.articleid}`).then(res=>{
        this.list = res.data
      }).catch(err=>{
      })
     },
    gettime(time){
       // 获取当前时间的时间撮
      let timestamp = (new Date()).valueOf();   
       // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)   
      var T = new Date(time);     
      // 将转换后的标准日期转换为时间戳。                 
      // console.log(T.getTime())       
      //当前时间和指定时间的时间差转化为多少分钟            
      let times = (timestamp-T)/1000/60  
       // 如果时间差的分钟数小于一个小时，直接打印多少分钟          
      if(Math.ceil(times) < 60){                   
        return Math.ceil(times)+'分钟前'
      }
       // 如果时间差的分钟数大于一个小时并且小于一天，打印多少小时
      else if(Math.ceil(times/60) < 24){          
        return Math.ceil(times/60) +'小时前'  
      }else if (Math.ceil(times/60/24) < 30){       // 如果时间差大于一个天并且小于一月，打印多少天
        return Math.ceil(times/60/24) +'天前'
      }else if (Math.ceil(times/60/24/30) < 12){    // 如果时间差大于一个月并且小于一年，打印多少月
        return Math.ceil(times/60/24/30) +'月前'
      }else{
         return '很久以前'                          // 如果时间差大于一年，打印很久以前
      }
    }
   },
   mounted() {
      this.articleid = this.$route.query.id         //开局就接受来自主页点击时间传送过来的id
      this.getData()                                //初始化data
   },
   watch: {

   },
   computed: {
      
   }
 }
</script>
<style scoped lang='scss'>
.box-card {
  width: 88%;
  margin-left: 8vw;
  margin-bottom: 15px;
}
.articletitle {
  font-size: 22px;
  line-height: 40px;
  font-weight: 700;
}
.articleinfo {
  font-size: 12px;
  line-height: 20px;
  display: flex;
 border-bottom: 1px solid rgb(211, 211, 211);
}
.textpic {
  width: 30px;
  height:30px;
}
.minuteinfo {
  margin-right: 5px;
}
.discuss {
  margin: 5px;
  border-bottom: 1px solid rgb(211, 211, 211);
}
.replier {
  height: 30px;
  line-height: 30px;
  display: flex;
}
.textuser {
  font-size: 14px;
  font-weight: 600;
  margin: 0 8px;
}
.textlevel {
  font-size: 14px;
  color: rgb(50, 50, 192);
}
.criticism {
 line-height: 30px;
 margin-left: 30px;
 margin-bottom: 10px;
}
.mainbody {
  line-height: 30px;
}
</style>
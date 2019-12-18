<template>
  <div>
    <!-- 如果在detail页面 第一个卡片显示 -->
    <div v-if="$route.path !== '/'">
      <el-card class="box-card">作者</el-card>
      <!-- {{$router.path}} -->
    </div>
    <!-- 已登录 第一个卡片显示 -->
    <div v-else-if="(name.trim()) !== ''">
      <el-card class="box-card">
        <div class="welcome">欢迎来到cNode社区</div>
        <div class="flex">
          <div>{{name}}</div>
          <el-button type="warning" plain size="mini" @click="exitLogin">退出登录</el-button>
        </div>
      </el-card>
    </div>
    <!-- 未登录 第一个卡片显示 -->
    <div v-else class="box-card">
      <el-card>
        <div class="welcome">欢迎来到cNode社区</div>
        <div class="tologin">
          你可以
          <el-button plain size="mini" @click="goto('/login')">登录</el-button>，也可以
          <el-button plain size="mini" @click="goto('/login')">注册</el-button>
        </div>
      </el-card>
    </div>
    <!-- 广告图片 -->
    <el-card class="box-card">
      <img src="../assets/img/aside-ad1.jpg" class="asidimg" />
      <img src="../assets/img/aside-ad2.jpg" class="asidimg" />
      <img src="../assets/img/aside-ad3.jpg" class="asidimg" />
    </el-card>
    <!-- 无人回复的话题 -->
    <div v-if="$route.path !== '/'">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>无人回复的话题</span>
        </div>没得人回答，所以提出来大家看下
      </el-card>
    </div>

    <!-- 积分榜 -->
    <div v-if="$route.path === '/'">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>积分榜</span>
        </div>
        <div v-for="item in 2" :key="item" class="text item">{{item + '列表内容 '}}</div>
      </el-card>
    </div>
    <!-- 友情社区 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>友情社区</span>
      </div>
      <img src="../assets/img/friend1.png" class="friendimg" />
      <img src="../assets/img/friend2.png" class="friendimg" />
      <img src="../assets/img/friend3.png" class="friendimg" />
      <img src="../assets/img/friend4.png" class="friendimg" />
    </el-card>
    <!-- 客服端二维码 -->
    <el-card class="box-card">
      <div slot="header">
        <span>客服端二维码</span>
      </div>
      <img src="../assets/img/rcode.jpg" class="erimg" />
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  components: {},
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    exitLogin() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录!"
          });
          localStorage.removeItem("name"), (this.name = "");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.getItem("name");
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box-card {
  margin: 5px;
  width: 75%;
}
.asidimg {
  width: 80%;
  height: 56px;
  margin: 2px auto;
}
.welcome {
  margin: 5px 5px 10px;
}
.tologin {
  margin: 5px;
  font-size: 14px;
  color: rgb(39, 37, 37);
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.friendimg {
  width: 70%;
  height: 50px;
  margin: 2px auto;
}
.erimg {
  width: 60%;
  height: 60%;
}
.flex {
  justify-content: space-evenly;
}
</style>
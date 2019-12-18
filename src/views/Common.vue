<template>
  <div class="pagedetail">
    <backtop>
      <el-container>
        <el-header>
          <comhead></comhead>
        </el-header>
        <el-container style="display: flex;">
          <el-main style="flex:5;">
            <router-view />
          </el-main>
          <el-aside style="flex:2">
            <comasid></comasid>
          </el-aside>
        </el-container>
        <el-footer>
          <combottom></combottom>
        </el-footer>
      </el-container>
    </backtop>
  </div>
</template>

<script>
import backtop from "../components/Backtop";
import comhead from "../components/Comhead";
import comasid from "../components/Comasid";
import combottom from "../components/Combottom";
export default {
  data() {
    return {};
  },
  components: {
    comhead,
    comasid,
    combottom,
    backtop
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
.el-header {
  padding: 0 !important;
}
.el-footer {
  padding: 0 !important;
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  background-color: #d3dce6;
  padding-top: 5px;
  padding-left: 8%;
}
body > .el-container {
  margin-bottom: 40px;
}
.pagedetail {
  position: relative;
}
</style>
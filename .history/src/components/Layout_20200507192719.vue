<template>
  <el-container>
    <el-header>
      <Navbar></Navbar>
    </el-header>
    <el-container>
      <el-aside style="width:auto">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from '@/components/LeftMenu.vue';
import Navbar from '@/components/Navbar.vue';
export default{
    components:{
        LeftMenu,
        Navbar,
    }
}
</script>

<style lang="less">
 .el-header, .el-footer {
    background-color: #31404E;
    color: white;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #334E66;
    color: #333;
    text-align: left;
    min-height: 100vh;
    .el-menu{
      border-right: 0;
    }
  }
  
  .el-main {
    background-color: white;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
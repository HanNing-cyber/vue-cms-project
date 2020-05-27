<template>
  <div class="nav-bar">
    <div class="left">
      <div class="name">
        <img src="../assets/img/logo.png" alt="" width="150px">
      </div>
      <el-button type="text" class="icon-toggle" icon="el-icon-s-fold"></el-button>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span class="nickname">黄小米</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu size="medium" slot="dropdown">
          <el-dropdown-item>消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  line-height: 0;

  .left {
    display: flex;
    align-items: center;

    .icon-toggle {
      font-size: 24px;
      margin-left: 20px;
      color: white;
    }
  }
  .right {
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
    .nickname {
      color: white;
      margin: 0 8px;
    }
  }
}
.el-dropdown-menu {
  width: 200px;
  background-color: #31404E;
}
</style>
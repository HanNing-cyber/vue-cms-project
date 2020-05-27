<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span>发布新商品</span>
      </div>
      <el-form :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="60px">
        <el-form-item label="账户" required prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名！"></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input type="password" v-model="form.password" prefix-icon="el-icon-key" placeholder="请输入密码！"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div>
          <router-link to="/register">注册账户</router-link>
        </div>
        <div>忘记密码？</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less">
    
</style>
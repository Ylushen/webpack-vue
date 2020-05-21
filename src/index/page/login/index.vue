<template>
  <div class="ls-login">
    <div class="login-left">
    </div>
    <div class="login-right ls-display_center">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        class="login-form"
      >
        <el-form-item style="text-align: center">
          <h1>ylushenUI</h1>
          <p style="color: #999">一款极简的后端管理系统模板系统</p>
        </el-form-item>
        <el-form-item prop="username">
          <ls-input v-model.trim="loginForm.username" size="medium" placeholder="账号" prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item prop="password">
          <ls-input
            v-model="loginForm.password"
            type="password"
            size="medium"
            placeholder="密码"
            prefix-icon="el-icon-s-cooperation"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item label="" prop="codeToken">
          <div style="position: relative;display: flex">
            <ls-input
              v-model="loginForm.codeToken"
              style="flex: 1;"
              placeholder="验证码"
              @keyup.enter.native="handleLogin" />
            <img
              :src="codeUrl"
              title="点击更换验证码"
              alt="验证码"
              height="33px"
              width="66px"
              style="cursor: pointer;"
            >
          </div>
        </el-form-item>
        <el-form-item>
          <ls-button
            type="primary"
            size="medium"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            登录
          </ls-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bean from '@/assets/loginCode/bean.jpg'
import AccountApi from '@/Api/login'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        codeToken: ''
      },
      loginFormRules: {
        username: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
        codeToken: [{ required: true, message: '验证码不能为空' }]
      },
      codeUrl: bean
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await AccountApi.login(this.loginForm)
          this.$store.commit('SET_USER_INFO', res.data)
          this.$router.push('/')
          this.$notify({
            title: '成功',
            message: '欢迎使用！',
            type: 'success'
          })
        } else {
          console.error('校验没有通过!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .ls-login {
    width: 100%;
    height: 100%;

    .login-form {
      width: 400px;
      max-width: 100%;
      padding: 0 40px;
      margin: 0 auto;
      border-radius: 10px;
      transform: translateY(-100px);
    }
  }

  @loginLeftWidth: 0;
  .login-left {
    height: 100%;
    background-color: #67cdcc;
    position: fixed;
    width: @loginLeftWidth;
  }

  .login-right {
    height: 100%;
    position: relative;
    margin-left: @loginLeftWidth;
    background-color: #f2f2f2;
  }
</style>


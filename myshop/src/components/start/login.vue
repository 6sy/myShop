<template>
  <div>
    <div class='loginTitle'>账号登录</div>
    <div class='input'><input type="text"
             v-model="loginForm.user_account"
             placeholder="用户名" /></div>
    <div class='input'><input type="password"
             v-model="loginForm.user_password"
             placeholder="密码" /></div>
    <confirm ref='confirm'></confirm>
    <div class='button'
         @click="login">登录</div>
    <div class='goRegister'
         @click='goRegister'>点击注册</div>
    <!-- <loading :isShow='isLoading'
             :radius='30'
             :lineWidth='10'></loading> -->

  </div>
</template>
<script>
import confirm from '../common/confirm/confirm'
// import loading from '@/components/common/loading/loading.vue'
export default {
  components: {
    confirm,
    // loading
  },
  data () {
    return {
      loginForm: {
        user_account: '',
        user_password: ''
      }
    }
  },
  methods: {
    async login () {
      if (!this.$refs.confirm.confirm()) {
        this.$alert.error('验证码错误', 1000)
        return
      }
      if (this.loginForm.user_account && this.loginForm.user_password) {
        this.$refs.confirm.isLoading = true
        const result = await this.$http({
          method: 'post',
          url: 'api/users/login',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify(this.loginForm)
        })
        if (result.data.success) {
          this.$alert.success('登陆成功', 1000)
          this.$refs.confirm.isLoading = false
          this.$router.push('/enter')
          console.log(result.headers["my-token"])
          let token = result.headers["my-token"]
          localStorage.setItem('my-token', token)
          this.loginForm.user_account = ''
          this.loginForm.user_password = ''
        } else {
          this.$alert.error('账号密码错误，请重新输入', 1000)
          this.$refs.confirm.isLoading = false
        }
      } else {
        this.$alert.error('账号密码不能为空', 1000)
      }
    },
    goRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
input {
  outline-style: none;
  padding: 8px 0px;
  font-size: 20px;
  border: 0;
  border-bottom: 1px solid #eaeaea;
  width: 325px;
  margin-left: 25px;
}
.input {
  margin: 20px auto;
}
input::-webkit-input-placeholder {
  padding-left: 30px;
  opacity: 0.5;
}
.loginTitle {
  height: 44px;
  color: #5e5e5e;
  font: 400 18px Arial, sans-serif;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
  line-height: 44px;
}
.button {
  width: 325px;
  height: 50px;
  margin-left: 25px;
  margin-top: 40px;
  line-height: 50px;
  text-align: center;
  background: #ff5777;
  border-radius: 25px;
  color: white;
}
.goRegister {
  margin-left: 290px;
  margin-top: 10px;
  font-size: 5px;
  color: #999999;
}
</style>

<template>
  <div>
    <Navbar class='nav-bar'>
      <div slot='left'
           class='left'
           @click='goLogin'><span class='iconfont icon-tubiaozhizuo--'></span></div>
      <div slot='center'>注册</div>
    </Navbar>

    <div class='input'><input type="text"
             placeholder="请输入账号"
             @blur="blurAccount"
             v-model='msg.user_account'>
      <p :class='{isOk:isAccount}'>{{Account}}</p>
    </div>

    <div class='input'><input type="password"
             placeholder="请输入密码"
             v-model='msg.user_password'
             @blur='blurPassword'>
      <p :class='{isOk:isPassword}'>{{Password}}</p>
    </div>
    <div class='finalGister'
         @click='goRegister'>注册</div>
  </div>
</template>
<script>
import Navbar from '@/components/common/NavBar/NavBar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      isAccount: false,
      Account: '',
      isPassword: false,
      Password: '',
      msg: {
        user_account: '',
        user_password: '',
      }
    }
  },
  methods: {
    // 账号离开检查重复性
    async blurAccount () {
      if (this.msg.user_account) {
        const result = await this.$http({
          method: 'post',
          url: 'api/users/account',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({ user_account: this.msg.user_account })
        })
        // 没有重复
        if (result.data.success) {
          this.isAccount = true
          this.Account = '账号通过'
        } else {
          this.isAccount = false,
            this.Account = '账号重复，请重新输入'
        }
      } else {
        this.isAccount = false,
          this.Account = '请输入账号'
      }
    },
    // 验证密码
    blurPassword () {
      if (!this.msg.user_password) {
        this.isPassword = false,
          this.Password = '请输入密码'
      } else {
        this.isPassword = true,
          this.Password = '密码通过'
      }
    },
    // 注册账号
    async goRegister () {
      if (this.isAccount && this.isPassword) {
        const result = await this.$http({
          method: 'post',
          url: 'api/users/register',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify(this.msg)
        })
        console.log(result.data.success)
        if (result.data.success) {
          this.$alert.success('注册成功', 1000)
          this.$router.push('/login')
        }
      } else {
        this.$alert.error('注册失败,请重新输入', 1000)
      }
    },
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
.left {
  font-size: 18px;
}
p {
  color: red;
}
.isOk {
  color: green;
}
input {
  outline-style: none;
  padding: 8px 0px;
  font-size: 20px;
  border: 0;
  border-bottom: 1px solid #eaeaea;
  width: 325px;
  margin-left: 10px;
}
input::-webkit-input-placeholder {
  padding-left: 30px;
  opacity: 0.5;
}
.input {
  margin: 20px 20px;
}

.nar-bar {
  border-bottom: 1px solid #eaeaea;
}
.finalGister {
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
.iconfont {
  font-size: 30px;
}
</style>

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
    <loading :isShow='isLoading'
             :radius='30'
             :lineWidth='10'></loading>
  </div>
</template>
<script>
import Navbar from '@/components/common/NavBar/NavBar.vue'
import loading from '@/components/common/loading/loading.vue'

export default {
  components: {
    Navbar,
    loading
  },
  data () {
    return {
      // 检验账号
      isAccount: false,
      //账号提示信息
      Account: '',
      // 检验密码
      isPassword: false,
      // 密码提示信息
      Password: '',
      // 账号密码信息
      msg: {
        user_account: '',
        user_password: '',
      },
      //是否点击注册了
      isClick: false,
      isLoading: false
    }
  },
  activated () {
  },
  deactivated () {
    this.Account = '',
      this.Password = '',
      this.msg.user_account = '',
      this.msg.user_password = ''
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
          // 判断是否网络慢 重新发送请求
          if (this.isClick) {
            this.goRegister()
            this.isClick = false
          }
        } else {
          this.isAccount = false,
            this.Account = '账号重复，请重新输入'
          this.isLoading = false
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
      // 由于网络请求太慢，账号重复性请求没有验证成功，导致条件不足
      if (this.msg.user_account !== '' && this.Account !== '账号重复，请重新输入' && this.Account !== '账号通过') {
        // 
        this.isClick = true
        this.isLoading = true
      }
      // 正常请求 
      else {
        if (this.isAccount && this.isPassword) {
          if (!this.isLoading) {
            this.isLoading = true
          }
          try {
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
              this.isLoading = false
              this.$router.push('/login')
            }
          } catch (e) {
            new Error(e)

          }
        }
        // 判断账号密码情况给予警告
        else {
          if (this.msg.user_account === '' && this.msg.user_password === '') {
            this.Account = '请输入账号'
            this.Password = '请输入密码'
            this.$alert.error('账号密码不能为空', 1000)
            this.isLoading = false
          } else if (this.msg.user_account === '' && this.msg.user_password) {
            this.Account = '请输入账号'
            this.$alert.error('账号不能为空', 1000)
          } else if (this.msg.user_password === '' && this.msg.user_account) {
            this.Password = '请输入密码'
            this.$alert.error('密码不能为空', 1000)
          } else if (!this.isAccount && this.msg.user_account && this.msg.user_account !== '') {
            this.$alert.error('账号已重复，请重新输入', 1000)
          }
        }
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
  font-size: 12px;
  letter-spacing: 0.5px;
  padding-top: 5px;
  padding-left: 6px;
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

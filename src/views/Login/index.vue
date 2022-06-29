<template>
  <div>
    <!--  -->
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />

    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block native-type="submit">登 录</van-button>
      </div>
    </van-form>
    <div class="registe">
      <a href="#/registe">还没有账号，去注册~</a>
    </div>
  </div>
</template>

<script>

import { getLogin } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      username: 'zdy4210',
      password: '741852963'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async onSubmit (values) {
      if (this.username && this.password) {
        if (!this.username.match(/^[a-zA-Z0-9_-]{5,7}$/)) {
          return this.$toast('用户名格式5-8位字母和数字')
        }
        if (!this.password.match(/^\d{5,12}$/)) {
          return this.$toast('密码为5-12位字母和数字')
        }
        try {
          const res = await getLogin(values)
          this.$toast.success('账号登录成功')
          this.$store.commit('setUser', res)
          this.$router.push({
            name: 'my'
          })
        } catch (err) {
          console.log(err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      } else {
        this.$toast('用户名和密码不能为空')
      }
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__content {
  margin-bottom: 21px;
}
/deep/.van-field__control {
  height: 100px;
  padding: 2px 0;
  line-height: 1.15;
  font-size: 34px;
}
.van-button {
  height: 100px;
  line-height: 100px;
  font-size: 36px;
  background-color: #1cb676;
}
.registe {
  margin: 0 auto;
  text-align: center;
  margin-top: 65px;
  a {
    color: #666;
    font-size: 28px;
  }
}
</style>

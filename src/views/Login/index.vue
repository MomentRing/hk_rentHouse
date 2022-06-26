<template>
  <div>
    <!--  -->
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '用户名和密码不能为空' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '用户名和密码不能为空' },
          { pattern: /^\d{6}$/, message: '密码格式5-12位的字母和数字' },
        ]"
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
export default {
  created () { },
  data () {
    return {
      username: '',
      password: '',
      pattern: /\d{6}/
    }
  },
  methods: {
    onClickLeft () { },
    async onSubmit (values) {
      console.log('submit', values)
      await this.$refs.form.validate(['username', 'password'])
    }
  },
  computed: {},
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

<template>
  <div>
    <!-- 顶部未登录S -->
    <div class="my_title" v-if="flag">
      <img src="@/assets/bg.png" alt="" />
      <div class="my_info">
        <div class="my_icon">
          <div class="my_avatar">
            <img src="@/assets/avatar.png" alt="" />
          </div>
        </div>
        <div class="my_user">
          <div class="my_name">游客</div>
          <div class="my_editor">
            <van-button
              type="primary"
              class="btn"
              @click="$router.push('/login')"
              >去登录</van-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部未登录E -->
    <!-- 顶部已登录S -->
    <div class="my_title" v-else>
      <img src="@/assets/avatar (1).png" alt="" />
      <div class="my_info">
        <div class="my_icon">
          <div class="my_avatar">
            <img :src="'http://liufusong.top:8080' + list.avatar" alt="" />
          </div>
        </div>
        <div class="my_user">
          <div class="my_name">{{ list.nickname }}</div>
          <div class="my_editor">
            <van-button type="primary" class="btn1" @click="tuichu"
              >退出</van-button
            >
          </div>
          <p class="my_edit2"><a href="javascript:;">编辑个人资料 &gt;</a></p>
        </div>
      </div>
    </div>
    <!-- 顶部已登录E -->
    <!-- 列表导航S -->
    <div class="my_grid">
      <van-grid :column-num="3" :clickable="true">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="underway-o" text="看房记录" />
        <van-grid-item icon="credit-pay" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <!-- 列表导航E -->
    <!-- 广告S -->
    <div class="my_ad">
      <img src="@/assets/join.png" alt="" />
    </div>
    <!-- 广告E -->
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getUserMsg } from '@/api/user'
import { mapState } from 'vuex'
export default {
  async created () {
    try {
      // 获取用户信息
      const res = await getUserMsg(this.user.token)
      this.list = res.data.body
      this.flag = false
      console.log(res)
    } catch (err) {
      console.log(err.message)
    }
  },
  data () {
    return {
      list: {},
      flag: true
    }
  },
  methods: {
    async tuichu () {
      try {
        await Dialog.confirm({
          title: '提示',
          message: '是否确认退出?',
          showCancelButton: true,
          confirmButtonColor: '#108ee9',
          cancelButtonColor: 'black',
          width: '300px'
        })
        this.$store.commit('clearToken')
        window.localStorage.removeItem('vuex')
        this.flag = true
      } catch (err) {
      }
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my_title {
  position: relative;
  min-height: 600px;
  width: 100%;
  img {
    width: 100%;
  }
  .my_info {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 40px;
    margin: 100px auto 0;
    text-align: center;
    font-size: 26px;
    width: 75%;
    height: 55%;
    // background-color: pink;
    background: #fff;
    box-shadow: 0 0 20px 6px #ddd;
    .my_icon {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      border: 10px solid #f5f5f5;
      box-shadow: 0 4px 4px #bdbdbd;
    }
  }
  .my_user {
    padding-top: 30px;
    margin-top: 130px;
    .my_name {
      margin-top: -60px;
      margin-bottom: 40px;
    }
    .my_editor {
      .btn {
        border-radius: 10px;
        background-color: #21b97a;
        width: 140px;
        height: 60px;
        font-size: 13px;
      }
    }
  }
}

.my_grid {
  min-height: 380px;
  // background-color: skyblue;
  .van-grid {
    margin-top: 10px;
  }
}

.my_ad {
  text-align: center;
  margin-top: 10px;
  img {
    width: 92%;
  }
}
.btn1 {
  border-radius: 50px;
  background-color: #21b97a;
  width: 135px;
  height: 50px;
  font-size: 12px;
  zoom: 0.9;
}
.my_edit2 {
  font-size: 12px;
  margin-top: 40px;
  a {
    color: #999;
  }
}
</style>

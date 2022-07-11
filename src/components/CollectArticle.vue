<template>
  <div @click="onClick">
    <van-icon name="star-o" v-if="isStarShow" />
    <van-icon name="star" color="red" v-else />收藏
  </div>
</template>

<script>
import { addCollet, delCollet } from '@/api/user'
export default {
  created () { },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isStarShow: true
    }
  },
  methods: {

    async onClick () {
      this.isStarShow = !this.isStarShow
      if (this.isStarShow) {
        try {
          await addCollet(this.id)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await delCollet(this.id)
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

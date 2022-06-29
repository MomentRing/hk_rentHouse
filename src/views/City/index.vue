<template>
  <div>
    <van-nav-bar
      title="城市列表"
      fixed
      left-arrow
      @click-left="$router.back()"
    />

    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell title="文本" />

      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <div v-for="(item, name) in allCity" :key="name">
        <van-index-anchor :index="name">{{ name }}</van-index-anchor>
        <van-cell
          v-for="(item1, index) in item"
          :key="index"
          :title="item1.label"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getAllCity, getHotCity } from '@/api/city'
export default {
  async created () {
    try {
      const res = await getAllCity()
      const res1 = await getHotCity()
      console.log(res1)
      console.log(res)
      // 对城市进行首字母分类
      const citys = {}
      this.cityList.forEach(item => {
        citys[item] = []
        res.data.body.forEach(el => {
          const first = el.pinyin.substring(0, 1).toUpperCase()
          if (first === item) {
            citys[item].push(el)
          }
        })
      })

      this.allCity = citys
      console.log(citys)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      indexList: ['#', '热', 'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      cityList: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      allCity: {}
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar {
  background-color: #1cb676;
}
.van-index-bar {
  padding-top: 92px;
}
</style>

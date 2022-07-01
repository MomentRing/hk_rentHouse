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
      <van-cell :title="chosenName" @click="chooseCity(chosenName)" />

      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        v-for="(item, index) in hotCity"
        :key="index"
        :title="item.label"
        @click="chooseCity(item.label)"
      />

      <div v-for="(item, name) in allCity" :key="name">
        <van-index-anchor :index="name">{{ name }}</van-index-anchor>
        <van-cell
          v-for="(item1, index) in item"
          :key="index"
          :title="item1.label"
          @click="$toast('该城市暂无房源')"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getAllCity, getHotCity, getCityCode } from '@/api/city'

export default {
  async created () {
    try {
      const res = await getAllCity()
      const res1 = await getHotCity()
      // console.log(res1)
      this.hotCity = res1.data.body
      // console.log(res)
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
      allCity: {},
      hotCity: [],
      chosenName: '北京'
    }
  },
  methods: {
    async chooseCity (name) {
      try {
        this.chosenName = name
        this.$store.commit('setCityName', this.chosenName)
        // 获取城市对应代码
        const res = await getCityCode(name)
        this.$store.commit('setCityCode', res.data.body.value)
        this.$router.back()
      } catch (err) {
        console.log(err)
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
/deep/.van-nav-bar {
  background-color: #1cb676;
}
/deep/.van-index-bar {
  padding-top: 100px;
}
/deep/.van-index-bar__index {
  color: black;
  border-radius: 50%;
  font-size: 24px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 10px;
  padding: 0;
  box-sizing: border-box;
}
/deep/.van-index-bar__index--active {
  background-color: #21b97a;
  color: #fff;
}
/deep/.van-index-anchor {
  font-size: 28px;
  padding: 20px 30px;
  color: #999;
}
</style>

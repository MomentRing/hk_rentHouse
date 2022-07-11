<template>
  <div>
    <van-cell-group>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in houseList"
          :key="index"
          @click="
            $router.push({
              name: 'detail',
              params: {
                id: item.houseCode,
              },
            })
          "
        >
          <div class="pic">
            <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
          </div>
          <div class="txt">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="tags">
              <div class="hb" v-for="(item1, index) in item.tags" :key="index">
                {{ item1 }}
              </div>
            </div>

            <div class="price">
              <span>{{ item.price }}</span
              >元/月
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-cell-group>
  </div>
</template>

<script>
import { getHouse } from '@/api/house'
export default {
  name: 'ArticleList',

  created () {
    this.getHouse()
    this.start = 1
    this.end = 20
  },
  data () {
    return {
      houseList: [],
      loading: false,
      finished: false,
      start: 1,
      end: 20
    }
  },
  methods: {
    async getHouse () {
      try {
        const res = await getHouse({
          cityId: this.$store.state.cityCode,
          start: this.start,
          end: this.end
        })
        console.log(res)
        if (res.data.body.list.length === 0) {
          this.finished = true
          return
        }
        this.houseList.push(...res.data.body.list)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.start = this.end + 1
      this.end = this.start + 19
      this.getHouse()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
/deep/.van-cell__value {
  display: flex;
  padding-top: 36px;
  padding-left: 36px;
  .pic {
    width: 212px;
    height: 160px;
    // background-color: pink;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .txt {
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    h3 {
      font-size: 30px;
      color: #394043;
    }
    p {
      font-size: 24px;
      color: #afb2b3;
      margin-top: -10px;
    }
    .tags {
      display: flex;
      .hb {
        width: 80px;
        height: 35px;
        color: #39becd;
        text-align: center;
        background: #e1f5f8;
        font-size: 24px;
        border-radius: 6px;
        line-height: 35px;
        margin-right: 10px;
      }
    }

    .price {
      font-size: 24px;
      color: #fa5741;
      span {
        font-size: 32px;
        font-weight: 700;
      }
    }
  }
}
</style>

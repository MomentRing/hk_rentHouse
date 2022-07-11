<template>
  <div>
    <!-- 标题搜索S -->
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <!-- 搜索栏S -->
        <van-search placeholder="请输入小区或地址">
          <template #label>
            <span @click="$router.push('/city')">
              {{ $store.state.cityNameNow }}
            </span>
          </template>
        </van-search>
        <!-- 搜索栏E -->
      </template>
      <template #right>
        <van-icon name="location-o" />
      </template>
    </van-nav-bar>
    <!-- 标题搜索E -->
    <van-dropdown-menu active-color="#21b97a">
      <van-dropdown-item title="区域">
        <van-picker
          show-toolbar
          title="标题"
          :columns="columns_quyu"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-dropdown-item>

      <van-dropdown-item title="方式">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns_ways"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-dropdown-item>
      <van-dropdown-item title="租金">
        <van-picker
          show-toolbar
          title="标题"
          :columns="columns_zujin"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-dropdown-item>

      <van-dropdown-item>
        <template #title>
          <div class="tit" @click="show = true">
            <p>筛选</p>
          </div>
        </template>
      </van-dropdown-item>

      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '100%', width: '80%' }"
        get-container="body"
        duration="0"
      >
        <div class="huxing">
          <h3>户型</h3>
          <div class="filter">
            <van-row type="flex">
              <van-col span="12" v-for="(item, index) in roomType" :key="index"
                ><div class="choice">{{ item.label }}</div></van-col
              >
            </van-row>
          </div>
        </div>
        <div class="chaoxiang">
          <h3>朝向</h3>
          <div class="filter">
            <van-row type="flex">
              <van-col span="12" v-for="(item, index) in oriented" :key="index"
                ><div class="choice">{{ item.label }}</div></van-col
              >
            </van-row>
          </div>
        </div>
        <div class="louceng">
          <h3>楼层</h3>
          <div class="filter">
            <van-row type="flex">
              <van-col span="12" v-for="(item, index) in floor" :key="index"
                ><div class="choice">{{ item.label }}</div></van-col
              >
            </van-row>
          </div>
        </div>
        <div class="liangdian">
          <h3>亮点</h3>
          <div class="filter">
            <van-row type="flex">
              <van-col
                span="12"
                v-for="(item, index) in characteristic"
                :key="index"
                ><div class="choice">{{ item.label }}</div></van-col
              >
            </van-row>
          </div>
        </div>
      </van-popup>
    </van-dropdown-menu>

    <ArticleList></ArticleList>
  </div>
</template>

<script>
import { getChildCity } from '@/api/find'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'Find',
  async created () {
    try {
      const res = await getChildCity(this.$store.state.cityCode)
      const result = res.data.body
      console.log(result)
      // 区域
      this.columns_quyu[0].text = result.area.label
      result.area.children.forEach((item, index) => {
        this.columns_quyu[0].children.push({ text: item.label, children: [] })

        // 二级级联
        item.children && item.children.forEach((item1) => {
          this.columns_quyu[0].children[index].children.push({ text: item1.label })
        })
      })
      // 地铁
      this.columns_quyu[1].text = result.subway.label
      result.subway.children.forEach((item, index) => {
        this.columns_quyu[1].children.push({ text: item.label, children: [] })
        // 二级级联
        item.children && item.children.forEach((item1) => {
          this.columns_quyu[1].children[index].children.push({ text: item1.label })
        })
      })

      // 租赁方式
      result.rentType.forEach(item => {
        this.columns_ways.push(item.label)
      })
      // 租金价格区间
      result.price.forEach(item => {
        this.columns_zujin.push(item.label)
      })
      // 筛选
      // 户型
      this.roomType = result.roomType
      // 朝向
      this.oriented = result.oriented
      // 楼层
      this.floor = result.floor
      // 亮点
      this.characteristic = result.characteristic
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      columns_quyu: [
        {
          text: '',
          children: []
        },
        {
          text: '',
          children: []
        }
      ],
      columns_ways: [],
      columns_zujin: [],
      show: false,
      roomType: [],
      oriented: [],
      floor: [],
      characteristic: []
    }
  },
  methods: {
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },

    onCancel () {
      this.$toast('取消')
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleList }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__title {
  max-width: unset;
}
.van-search {
  padding: unset;
  border-radius: 10px;
  .van-search__content {
    padding-left: 0;
  }
  .van-search__label {
    padding: 0 30px;
  }
  .van-field {
    padding-left: 20px;
  }
}
/deep/.van-icon-search {
  color: #ccc;
  border-left: 1px solid #ccc;
  padding-left: 20px;
}
.van-icon-location-o {
  font-size: 50px;
}
.choice {
  display: inline-block;
  height: 60px;
  width: 140px;
  margin: 0 36px 30px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  color: #888;
}
h3 {
  margin: 40px 0;
  font-size: 30px;
  font-weight: normal;
}
.van-popup {
  padding: 0 30px;
}
.filter {
  border-bottom: 2px solid #e5e5e5;
  padding-bottom: 28px;
  padding-right: 136px;
  margin-left: 80px;
}
</style>

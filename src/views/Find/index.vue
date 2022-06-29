<template>
  <div>
    <!-- 标题搜索S -->
    <van-nav-bar left-arrow>
      <template #title>
        <!-- 搜索栏S -->
        <van-search label="北京" placeholder="请输入小区或地址"> </van-search>
        <!-- 搜索栏E -->
      </template>
      <template #right>
        <van-icon name="location-o" />
      </template>
    </van-nav-bar>
    <!-- 标题搜索E -->
    <van-dropdown-menu>
      <van-dropdown-item title="区域">
        <van-picker show-toolbar title="标题" :columns="columns_quyu" />
      </van-dropdown-item>
      <van-dropdown-item title="方式">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns_ways"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
        />
      </van-dropdown-item>
      <van-dropdown-item title="租金">
        <van-picker show-toolbar title="标题" :columns="columns" />
      </van-dropdown-item>
      <van-dropdown-item title="筛选">
        <van-picker show-toolbar title="标题" :columns="columns" />
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      columns_ways: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      columns_quyu: [
        {
          text: '区域',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ]

    }
  },
  methods: {
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      this.$toast('取消')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
</style>

<template>
  <div class="detail_container">
    <van-nav-bar
      :title="houseDataList.community"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 轮播图S -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in houseDataList.houseImg"
        :key="index"
      >
        <img :src="'http://liufusong.top:8080' + item" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图E -->
    <div class="HouseDetail_info">
      <h3 class="title">{{ houseDataList.title }}</h3>
      <div class="tags">
        <div
          class="hb"
          v-for="(item, index) in houseDataList.tags"
          :key="index"
        >
          {{ item }}
        </div>
      </div>

      <van-divider :style="{ color: '#ccc', borderColor: '#ccc' }" />
      <van-row type="flex" justify="space-around">
        <van-col span="8">
          <p>{{ houseDataList.price }} <span>/月</span></p>
          <p>租金</p>
        </van-col>
        <van-col span="8">
          <p>{{ houseDataList.roomType }}</p>
          <p>房型</p>
        </van-col>
        <van-col span="8">
          <p>{{ houseDataList.size }}平米</p>
          <p>面积</p>
        </van-col>
      </van-row>
      <van-divider :style="{ color: '#ccc', borderColor: '#ccc' }" />

      <div class="HouseDetail_infoBasic">
        <div><span>装修：</span>精装</div>
        <div>
          <span>朝向：</span
          ><i v-for="(item, index) in houseDataList.oriented" :key="index">{{
            item
          }}</i>
        </div>
        <div><span>楼层：</span>{{ houseDataList.floor }}</div>
        <div><span>类型：</span>普通住宅</div>
      </div>
    </div>

    <div class="HouseDetail_map">地图</div>

    <div class="HousePackage">
      <div class="package_title">
        <h4>房屋配套</h4>
      </div>
      <van-divider :style="{ color: '#ccc', borderColor: '#ccc' }" />
      <div class="package_list">
        <van-grid :column-num="5">
          <van-grid-item
            v-for="(item, index) in supporting_list"
            :key="index"
            icon="photo-o"
            :text="item"
          />
        </van-grid>
      </div>
    </div>

    <div class="layout">
      <!-- <div @click="isStarShow = !isStarShow">
        <van-icon name="star-o" v-if="isStarShow" />
        <van-icon name="star" color="red" v-else />收藏
      </div> -->
      <CollectArticle :id="id"></CollectArticle>
      <div>在线咨询</div>
      <div>电话预约</div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/house'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getDetail()
  },
  data () {
    return {
      houseDataList: [],
      isStarShow: true,
      supporting_list: [],
      allSupporting: ['衣柜', '洗衣机', '空调', '天然气', '冰箱', '暖气', '电视', '热水器', '宽带', '床']

    }
  },
  methods: {
    async getDetail () {
      try {
        const res = await getDetail(this.id)
        console.log(res)
        this.houseDataList = res.data.body
        this.supporting_list = res.data.body.supporting
      } catch (err) {
        console.log(err)
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
* {
  margin: 0;
  padding: 0;
}
.my-swipe .van-swipe-item {
  width: 100%;
  // height: 500px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #ccc;
  img {
    width: 100%;
  }
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

.HouseDetail_info {
  overflow: hidden;
  background-color: #fff;
  padding-top: 60px;
  padding: 0 30px;
  margin-bottom: 20px;
  .title {
    font-weight: 400;
    font-size: 32px;
    color: #333;
    margin: 32px 0;
  }
  .van-divider {
    margin: 30px 0;
  }
  /deep/.van-col {
    text-align: center;
    p {
      &:first-child {
        color: #fa5741;
        font-size: 36px;
        font-weight: bolder;
        margin-bottom: 10px;
        span {
          font-size: 24px;
        }
      }
      &:last-child {
        color: #999;
        font-size: 26px;
      }
    }
  }
  .HouseDetail_infoBasic {
    display: flex;
    flex-wrap: wrap;
    div {
      flex: 50%;
      font-size: 26px;
      margin-bottom: 30px;
      span {
        color: #999;
        padding-right: 10px;
      }
    }
  }
}
.detail_container {
  background-color: #f6f5f6;
  padding-bottom: 110px;
}
.HouseDetail_map {
  width: 100%;
  height: 380px;
  background-color: pink;
}
.HousePackage {
  height: 400px;
  width: 100%;
  // background-color: yellow;
  .package_title {
    h4 {
      font-weight: 600;
      font-size: 30px;
      margin-bottom: 10px;
      padding: 15px 0;
      padding-left: 15px;
    }
  }
  .package_list {
    width: 100%;
  }
  .van-divider {
    margin: 0 0.4rem;
  }
}
.layout {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  div {
    flex: 1;
    background-color: #fff;
    color: #999;
    border: 1px solid #cecece;
    font-size: 34px;
    &:last-child {
      background-color: #21b97a;
      color: white;
    }
  }
}
</style>

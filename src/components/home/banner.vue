<template>
  <div id="banner">
    <!--轮播图区域-->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img :src="item.picUrl" />
      </van-swipe-item>
    </van-swipe>
    <!--四个小按钮-->
    <nav>
      <ul>
        <li>
          <van-icon name="like" size="50" color="#FF0000" />
          <p>签到</p>
        </li>
        <li>
          <van-icon name="bag" size="50" color="#FF0000" />
          <p>礼券</p>
        </li>
        <router-link tag="li" to="/cutList">
          <van-icon name="coupon" size="50" color="#FF0000" />
          <p>砍价</p>
        </router-link>
        <router-link tag="li" to="/article/special">
          <van-icon name="gift" size="50" color="#FF0000" />
          <p>专栏</p>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["bannerList"],
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#banner {
  width: 100%;
  margin-bottom: 0.2rem;
  position: relative;

  nav {
    width: 100%;
    padding: 0.3rem 0.12rem;
    box-sizing: border-box;
    position: absolute;
    bottom: 0px;
    background-color: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        width: 25%;
        text-align: center;
        p {
          margin-top: 0.12rem;
          font-size: 0.35rem;
        }
      }
    }
  }
}
</style>

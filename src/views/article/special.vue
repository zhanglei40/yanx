<template>
  <div>
    <van-nav-bar title="严选专栏" left-arrow @click-left="goBack"/>
    <!-- 文章列表 -->
    <div class="article">
      <router-link
        tag="div"
        :to="'/article/detail/'+item.id"
        class="article-item"
        v-for="(item,index) in articleList"
        :key="index"
      >
        <img :src="item.pic" />
        <p v-html="item.title"></p>
        <p v-html="item.descript"></p>
        <p>
          <van-button round style="background:none;color: #FFF;">查看详情</van-button>
        </p>
      </router-link>
      <!-- <div class="article-item" v-for="(item,index) in articleList" :key="index"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getSpecial();
  },
  data() {
    return {
      articleList: []
    };
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //精选专题
    getSpecial() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        console.log(res.data);
        this.articleList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;

  .article-item {
    width: 100%;
    position: relative;
    margin-bottom: 0.2rem;
    img {
      width: 100%;
      height: 4.2rem;
    }
    p {
      width: 90%;
      line-height: 0.6rem;
      text-align: center;
      position: absolute;
      left: 5%;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(1) {
      top: 0.4rem;
      font-size: 0.35rem;
    }
    p:nth-of-type(2) {
      top: 1.2rem;
    }
    p:nth-of-type(3) {
      top: 2.6rem;
    }
  }
}
</style>

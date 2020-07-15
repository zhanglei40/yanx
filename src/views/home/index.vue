<template>
  <div class="box">
    <!-- 轮播图组件 -->
    <Banner :bannerList="bannerList" />

    <div class="cut">
      <router-link tag="p" to="/cutList" class="cut-head">砍价列表</router-link>
       <Cut :cutList="cutList" />
    </div>

    <Article :articleList="articleList"/>

    <div class="goods">
      <router-link tag="p" to="/recommand" class="goods-head">推荐列表</router-link>
      <Goods  :goodsList="goodsList"/>
    </div>
  </div>
</template>
<script>
import Banner from "@/components/home/banner";
import Cut from "@/components/home/cut";
import Article from "@/components/home/article";
import Goods from "@/components/home/goods";
export default {
  name: "",
  mounted() {
    this.getBanner();
    this.getCutList();
    this.getSpecial();
    this.getGoodList();
  },
  data() {
    return {
      bannerList: [],
      cutList: [],
      articleList: [],
      goodsList: []
    };
  },
  components:{
    Banner,
    Cut,
    Article,
    Goods,
  },
  methods: {
    getBanner() {
      //获取首页轮播图的区域的接口数据
      this.$axios({
        url: "https://api.it120.cc/small4/banner/list"
      }).then(res => {
        //判断数据是否为空
        if (res.code == 0) {
          this.bannerList = res.data;
        }
      });
    },
    //砍价列表
    getCutList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        //取出对象中key只，并且截取
        let ids = Object.keys(res.data.goodsMap).splice(-3);
        let arr = [];
        //通过key获取对象的value值，添加到数组中去
        ids.forEach(item => {
          arr.push(res.data.goodsMap[item]);
        });

        this.cutList = arr;
      });
    },

    //精选专题
    getSpecial() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        this.articleList = res.data;
      });
    },
    //获取商品列表
    getGoodList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        let arr = res.data.filter(item => {
          return item.name.indexOf("测试") == -1;
        });
        arr.sort(() => {
          return Math.random() - 0.5;
        });

        this.goodsList = arr.splice(-6);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #f0f0f0;
  padding-bottom: 0.88rem;
  

  .cut {
    width: 100%;
    background-color: #fff;
    // 头部信息
    .cut-head {
      line-height: 0.88rem;
      width: 100%;
      font-size: 0.35rem;
      text-align: center;
      border-bottom: #dddddd 1px solid;
    }
    .cut-head::after {
      content: ">";
      font-size: 0.35rem;
      margin-left: 0.15rem;
    }
    
  }

  //人气推荐商品
  .goods {
    width: 100%;
    margin-top: 0.15rem;
    background-color: #fff;
    padding: 0.2rem;
    box-sizing: border-box;
    border-bottom: #dddddd 1px solid;
    .goods-head{
        line-height: .88rem;
        font-size: .35rem;
        width: 100%;
        text-align: center;
    }
    .goods-head::after{
        content:">";
        margin-left: .3rem;
    }
  }
}
</style>

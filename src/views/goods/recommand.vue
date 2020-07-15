<template>
  <div>
    <van-nav-bar title="人气推荐" left-arrow @click-left="goHome"/>
    <Goods :goodsList="goodsList"/>
  </div>
</template>

<script>
import Goods from "@/components/home/goods";
export default {
  name: '',
  mounted() {
    this.getGoodsList();
  },
  data() {
    return {
      goodsList: [],
    };
  },
  components:{
    Goods,
  },
  methods: {
    getGoodsList(){
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        this.goodsList = res.data;
      });
    },
    //回到首页
    goHome(){
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>

</style>

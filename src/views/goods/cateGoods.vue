<template>
  <div>
    <van-nav-bar title="分类商品" left-arrow @click-left="goBack"/>
    <Goods :goodsList="goodsList" v-if="goodsList.length>0"/>
    <van-empty description="还没有商品呢" v-else/>
  </div>
</template>

<script>
import Goods from "@/components/home/goods";
export default {
  name: "",
  mounted() {
    this.cId = this.$route.params.id; //接受分类的Id
    this.getGoodsList();
  },
  data() {
    return {
      cId: 0, //分类ID
      cateGoods: [],
    };
  },
  components:{
    Goods,
  },
  computed: {
    goodsList(){
      return this.cateGoods.filter(item=>{
        return item.categoryId == this.cId;
      })
    }
  },
  methods: {
    //获取所有的商品列表
    getGoodsList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        console.log(res.data);
        this.cateGoods = res.data;
      });
    },
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>

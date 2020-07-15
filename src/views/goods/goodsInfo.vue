<template>
  <div class="box">
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in banners" :key="index">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>

    <!-- 选项卡操作 -->
    <div class="tab-item">
      <van-tabs v-model="active">
        <van-tab title="商品详情">
          <p v-html="content"></p>
        </van-tab>
        <van-tab title="商品评价">
          <p>商品评价</p>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 底部商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" :badge="this.$store.state.nums" text="购物车" />
      <van-goods-action-icon icon="star-o" text="收藏" />
      <van-goods-action-button type="warning" text="立即购买" />
      <van-goods-action-button type="danger" text="加入购物车" @click="skuShow = true" />
    </van-goods-action>

    <van-sku
      v-model="skuShow"
      :sku="sku"
      :goods="goods"
      :custom-stepper-config="customStepperConfig"
      @add-cart="addCart"
    />

    <!-- 返回按钮 -->
    <div class="arrow" @click="goBack">
      <van-icon name="arrow-left" size="30" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.gId = this.$route.params.id;
    this.getGoodsInfo();
    //计算商品的总数量
    this.$store.commit("countCarts");
  },
  data() {
    return {
      active: 0,
      gId: 0, //商品的id
      banners: [], //商品轮播图
      content: null,
      goodsInfo: [],

      //sku的商品数据
      skuShow: false,
      sku: {
        //sku的规格类目，比如商品的颜色，尺寸
        tree: [
          {
            k: "颜色",
            k_s: "c1",
            v: [
              { id: 1, name: "白色" },
              { id: 2, name: "红色" },
              { id: 3, name: "蓝色" }
            ]
          }
        ],
        list: [
          { id: 1000, c1: 1, price: 2000, stock_num: 12 },
          { id: 1000, c1: 2, price: 30000, stock_num: 15 },
          { id: 1000, c1: 3, price: 50000, stock_num: 18 }
        ],
        price: 1000,
        stock_num: 100
      },
      //商品的图片信息
      goods: {
        picture: ""
      },
      //自定义步进器
      customStepperConfig: {
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(currentValue);
          //吧点击步进器的值，给nums，记录数量
          this.nums = currentValue;
        }
      },
      nums: 0
      //sku的商品数据
    };
  },
  computed: {},
  methods: {
    //获取商品详情信息
    getGoodsInfo() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.gId
        }
      }).then(res => {
        console.log(res);
        this.banners = res.data.pics;
        this.content = res.data.content;
        //设置商品的基本信息
        this.goodsInfo = res.data.basicInfo;
        //设置sku的信息
        this.setSku(res.data.properties);
        this.goods.picture = this.banners[0].pic;
      });
    },
    //设置sku的信息
    setSku(property) {
      //定义sku属性不存在
      if (property == undefined) {
        return false;
      }

      let tree = []; //商品sku的规格信息
      let list = []; //商品sku的组装信息
      //遍历属性
      property.forEach(element => {
        //格式化sku的规格信息
        let object = new Object();
        object.k = element.name;
        object.k_s = `c_${element.id}`;
        object.v = element.childsCurGoods;

        tree.push(object); //处理对象的方式
      });

      console.log(tree);
      //组装sku组合的数据，push到list中
      tree.forEach(item => {
        item.v.forEach(element => {
          console.log(element);

          let obj = new Object();
          obj.id = item.k_s.split("_")[1]; //截取数据，提取sku的ID信息
          obj[item.k_s] = element.id;
          obj.price = 1000;
          obj.stock_num = 120;

          list.push(obj);
        });
      });
      console.log(list);
      this.sku.tree = tree;
      this.sku.list = list;
    },
    //加入购物车
    addCart() {
      let data = localStorage.getItem("09A_user");
      //用户未登录 跳转到登陆页面
      if (data == null) {
        this.$toast.fail("请先登录");
        this.$router.push("/shop/login");
        return false;
      }

      //用户已经登陆的信息,添加购物车信息，
      let cartList = this.$store.state.cartList; //购物车的列表数据

      //找出
      let index = cartList.findIndex(item => {
        //判断当前商品的ID是否重复
        return item.goods_id == this.gId;
      });

      console.log(index);
      // return false;

      if (index == -1) {
        //添加购物车对象信息
        let object = new Object();
        object.goods_id = this.gId; //
        object.name = this.goodsInfo.name;
        object.price = this.goodsInfo.originalPrice;
        object.nums = this.nums;
        object.properties = "";
        object.checked = true;
        object.pic = this.goods.picture;

        cartList.push(object);
      }else{
        cartList[index].nums += this.nums;//数量自增的操作
      }

      this.skuShow = false; //控制控制底部弹窗的隐藏
      this.$toast.success("添加购物车成功");
      this.$store.commit("addCart", cartList);
      this.$store.commit("countCarts");
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.box {
  width: 100%;
  background: #f0f0f0;
  padding-bottom: 0.88rem;
  .tab-item {
    width: 100%;
    background: #fff;
    margin-top: 0.2rem;
    p {
      padding: 0.15rem;
      width: 100% !important;
      box-sizing: border-box;
      img {
        width: 100% !important;
      }
    }
  }
  .arrow {
    padding: 0.1rem;
    box-sizing: border-box;
    background: #f0f0f0;
    border-radius: 50%;
    position: fixed;
    top: 0.5rem;
    left: 0.3rem;
  }
}
</style>

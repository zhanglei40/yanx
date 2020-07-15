<template>
  <div>
    <!--砍价列表信息-->
    <div class="item" v-for="(item,index) in cutList" :key="index">
      <div class="item-left">
        <img :src="item.pic" />
      </div>
      <div class="item-right">
        <p v-html="item.name"></p>
        <p v-html="item.characteristic"></p>
        <ol>
          <li>
            <p>￥{{item.minPrice}}</p>
            <p>低价</p>
          </li>
          <li>
            <p>￥{{item.originalPrice}}</p>
            <p>原价</p>
          </li>
          <li>
            <p>{{item.stores}}</p>
            <p>限量</p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ['cutList'],
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
//砍价列表信息
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem;
  box-sizing: border-box;
  .item-left {
    width: 30%;
    padding: 0.1rem;
    box-sizing: border-box;
    img {
      width: 100%;
      border-radius: 0.1rem;
    }
  }
  .item-right {
    width: 70%;
    padding-left: 0.2rem;
    box-sizing: border-box;
    p {
      line-height: 0.6rem;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-child(2) {
      color: #808080;
    }
    ol {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 30%;
        text-align: center;
      }
    }
  }
}
</style>

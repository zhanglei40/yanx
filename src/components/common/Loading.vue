<template>
  <div>
    <van-overlay :show="true">
      <div class="wrapper">
        <van-loading size="50px" color="#FFF" vertical>
          <span style=""></span>
        </van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #FFF;
}
</style>

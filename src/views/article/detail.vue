<template>
  <div>
      <van-nav-bar title="专栏详情" left-arrow @click-left="goBack"/>

      <div class="info">
          <p v-html="aInfo.title"></p>
          <p><img :src="aInfo.pic" /></p>
          <p v-html="aInfo.content"></p>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
      console.log(this.$route.params.id);
      this.aid = this.$route.params.id;
      this.getInfo();
  },
  data() {
    return {
        aid: 0,
        aInfo:{},
    };
  },
  computed:{
      
  },
  methods: {
      goBack(){
          this.$router.go(-1);
      },
      getInfo(){
          this.$axios({
              url:"https://api.it120.cc/small4/cms/news/detail",
              methods: "post",
              params:{
                  id: this.aid
              }
          }).then(res=>{
              console.log(res);
              this.aInfo = res.data;
          })
      }
  },
};
</script>

<style lang="scss" scoped>
.info{
    width: 100%;
    padding: .2rem;
    box-sizing: border-box;

    p{  
        width: 100%;
        margin-bottom: .2rem;
        img{
            width: 100%;
            height: 4.2rem;
        }
    }
    p:nth-of-type(1){
        font-size: .45rem;
        text-align: center;
        margin-bottom: .5rem;
    }
    p:nth-of-type(3){
        line-height: .6rem;
        text-indent: 1rem;
    }
}
</style>

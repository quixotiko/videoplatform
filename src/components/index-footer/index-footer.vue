<template>
  <div class="index-footer-container">
    <img src="./zju.jpg" alt="">
    <div> 浙江大学毕业设计项目</div>
    <div> 基于Vue.js的线上视频平台设计</div>
    <div> 答辩人：覃小康</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-footer-container {
  height: 150px;
  margin-top: 40px;
  /* background-color: black; */
  border-top: 1px solid black;
  background: url('./dark-grey-terrazzo.png') repeat-x;
}
img{
  width:100px;
  height: 100px;
  float: left;
  margin-left: 300px;
  margin-top: 20px;
  border-radius: 50%;
}
.index-footer-container div{
  margin-top: 10px;
  margin-left: 420px;
  color:white;
  font-size: 24px;
}
</style>

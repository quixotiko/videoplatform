<template>
  <div class="icon-list-container">
      <img v-for="(item,index) in iconList" :src="item" alt="">
  </div>
</template>

<script>
export default {
  props: {
    iconList:{
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-list-container {
  flex: 1;
}
.icon-list-container img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-right: 20px;
  margin-top: 20px;
}
</style>

<template>
  <div class="video-cover-container">
    <div class="cover" :style="background">
      <!-- <img :src="vcwc[0].data.header.cover" alt=""> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vcwc:{
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    background() {
      return {
        background: `url(${this.vcwc[0].data.header.cover}) no-repeat`,
        'background-size': 'contain'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-cover-container {
  flex: 1;
  height: 200px;
}
.cover {
  height: 100%;
  width: 100%
}
</style>

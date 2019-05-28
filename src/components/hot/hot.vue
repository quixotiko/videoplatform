<template>
  <div class="container">
    <div class="text-header">
      <span class="icon-fire"></span>
      <span>近期热门</span>
    </div>
    <transition-group tag="div" class="hot-video-area">
      <div class="hot-video-box" v-for="item in hotVideo" :key="item.data.id">
        <component :is="videoItemComponent" :video="item" :key="item.data.id"></component>
        <!-- <video-item :video="item" :key="item.data.id"></video-item> -->
      </div>
    </transition-group>
    <div class="next-page">
      <div class="next-page-box">
        <span @click="nextPage">下一页<span class="icon-circle-right"></span></span>
      </div>
    </div>
    <loading v-if="hotIsLoading"></loading>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VideoItem from '../../base/video-item/video-item'
import Loading from '../../base/loading/loading'
export default {
  data () {
    return {
      videoItemComponent: 'VideoItem'
    }
  },
  components: {
    VideoItem,
    Loading
  },
  computed: {
    ...mapGetters('hot',{
      hotVideo: 'hotVideo',
      nextPageUrl: 'nextPageUrl',
      hotIsLoading: 'hotIsLoading'
    })
  },
  methods: {
    fetchData() {
      this.$store.dispatch('hot/fetchData')
    },
    nextPage() {
      const url = this.nextPageUrl
      window.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
      })
      this.$store.dispatch('hot/fetchNextPage',{url})
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 1080px;
  min-width: 1080px;
  margin: auto;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 30px;
  position: relative;
}
.text-header {
  margin-top: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-size: 26px;
  color: #F4651D;
  border-bottom: 2px solid #504253;
}
.hot-video-area {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
}
.hot-vidoe-box {
  flex: 1;
}
.next-page {
  text-align: center;
  padding-top: 40px;
  font-size: 24px;
  position: relative;
  height: 80px;
}
.next-page-box {
  position: absolute;
  width: 150px;
  height: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  padding-top: 10px;
  border-radius: 10px;
  border: 2px solid #364652;
}
.icon-circle-right:before {
  content: "\ea42";
  vertical-align: bottom;
}
.next-page-box:hover {
  box-shadow: 0 0 10px #364652;
  background-color: #86ADCB;
}
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-enter,.v-leave-to {
  opacity: 0;
  transform: scale(0.1);
}
</style>

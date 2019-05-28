<template>
  <div class="container">
    <div class="text-header">
      搜索结果
    </div>
    <div class="video-area">
      <div class="video-box" v-for="item in videoObject.videoList">
        <video-item :video="item" :key="item.data.id"></video-item>
      </div>
    </div>
    <div class="next-page">
      <div class="next-page-box">
        <span @click="nextPage">下一页<span class="icon-circle-right"></span></span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VideoItem from '../../base/video-item/video-item'
export default {
  data () {
    return {

    }
  },
  components: {
    VideoItem
  },
  computed: {
    ...mapGetters('search',{
      searchResult: 'searchResult',
      nextPageUrl: 'nextPageUrl'
    }),
    videoObject() {
      const _v = this.searchResult
      return {
        videoList: _v.itemList
      }
    },
    query() {
      return this.$route.params.q
    }
  },
  methods: {
    fetchData() {
      const q = this.query
      if(!q)
      {
        this.$router.go('/')
      }else {
        this.$store.dispatch('search/fetchData',{q})
      }
    },
    nextPage() {
      const url = this.nextPageUrl
      this.$store.dispatch('search/fetchNextPage',{url})
    }
  },
  watch: {
    '$route'() {
      this.fetchData()
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
  max-width: 80%;
  min-width: 1080px;
  margin: auto;
  padding-top: 30px;
  margin: auto;
  display: flex;
  flex-flow: column;
}
.video-area {
  display: flex;
  flex-flow: wrap;
  align-items: center;
  padding-bottom: 30px;
  padding-left: 6%;
}
.video-box {
  margin-right: 24px;
}
.text-header {
  font-size: 28px;
  color: #364652;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #364652;
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
</style>

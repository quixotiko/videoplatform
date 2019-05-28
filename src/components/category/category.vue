<template>
  <div class="container">
    <div class="page-container" v-for="item in pages">
      <div class="category-box" v-for="i in item.itemList" :style="item.styleObject" >
        <div class="text-header" >
          <span class="title">
            {{i.data.header.title}}
          </span>
          <span class="subTitle">
            {{i.data.header.subTitle}}
          </span>
        </div>
        <div class="video-area" v-for="v in i.data.itemList">
          <video-item :video="v" :key="v.data.id"></video-item>
        </div>
      </div>
    </div>
    <loading v-if="categoriesIsLoading"></loading>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VideoItem from '../../base/video-item/video-item'
import Loading from '../../base/loading/loading'
export default {
  data () {
    return {

    }
  },
  components: {
    VideoItem,
    Loading
  },
  computed: {
    ...mapGetters('category',{
      pages: 'pages',
      categoriesIsLoading: 'categoriesIsLoading'
    })
  },
  methods: {
    fetchData() {
      this.$store.dispatch('category/fetchPageOne')
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
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
}
.page-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.category-box {
  flex: 1;
  display: flex;
  justify-content: center;
}
.text-header {
  width: 100px;
  padding-top: 20px;
  padding-right: 10px;
}
.text-header span {
  display: block;
}
span.title {
  font-size: 26px;
}
span.subTitle {
  font-size: 16px;
  color: #29343D;
}
.video-area {
  flex: 5;
  color: black;
}
</style>

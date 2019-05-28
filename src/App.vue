<template>
  <div id="app">
    <index-header></index-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <scroll-up></scroll-up>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexHeader from './components/index-header/index-header'
import IndexFooter from './components/index-footer/index-footer'
import ScrollUp from './base/scroll-up/scroll-up'
export default {
  components:{
    IndexHeader,
    IndexFooter,
    ScrollUp
  }
}
</script>

<style>
@import "./common/css/base.css";
</style>

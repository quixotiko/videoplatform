<template>
  <div class="container">
  <span class="icon-rocket" @click="scrollToTop"></span>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: fixed;
  bottom: 40px;
  right: 4%;
}
.icon-rocket:before {
  content: "\e9a5";
  font-size: 36px;
}
</style>

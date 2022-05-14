<template>
  <div class="app">
    <TheHeader />

    <div class="container-body">
      <router-view></router-view>
    </div>
      

  </div>
</template>

<script>
import TheHeader from '@/components/The-Header.vue'

export default {
  components: {TheHeader},
      mounted() {
        this.$store.dispatch('GET_DATA')
    }
}
</script>

<style lang="scss">
.container-body {
  width: 1040px;
  margin: 100px auto 20px auto;
  box-sizing: border-box;
  
}
</style>
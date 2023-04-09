<script setup>
  import HomeNavBar from "./cpns/home-nav-bar.vue"
  import HomeSerchBox from "./cpns/home-serch-box.vue"

  import useHomeStore from "@/stores/modules/home"

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
</script>

<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-serch-box />
  </div>
</template>

<style lang="less" scoped>
  .banner {
    img {
      width: 100%;
    }
  }
</style>

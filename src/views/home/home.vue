<script>
export default {
  name: "home",
}
</script>
<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSerchBox from "./cpns/home-serch-box.vue"
import HomeCategories from "./cpns/home-categories.vue"
import HomeContent from "./cpns/home-content.vue"
import SearchBar from "@/components/search-bar/search-bar.vue"

import useHomeStore from "@/stores/modules/home"
import useScroll from "@/hooks/useScroll"
import { computed, watch, ref, onActivated } from "vue"

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// 监听滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})

// 跳转回home时, 保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  })
})
</script>

<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-serch-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <home-content />
  </div>
</template>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>

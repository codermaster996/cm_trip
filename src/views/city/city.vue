<script setup>
  import { ref, computed } from "vue"
  import { useRouter } from "vue-router"
  import useCityStores from "@/stores/modules/city"
  import { storeToRefs } from "pinia"

  import CityGroup from "./cpns/city-group.vue"

  const router = useRouter()

  // 搜索框功能
  const searchValue = ref("")
  const cancelClick = () => {
    router.back()
  }

  // tab的切换
  const tabActive = ref()

  // 从Store中获取数据
  const cityStore = useCityStores()
  cityStore.fetchAllCitiesData()
  const { allCities } = storeToRefs(cityStore)

  // 目的: 获取选中标签后的数据
  // 1.获取正确的key: 将tabs中绑定的tabAction正确绑定
  // 2.根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
  // const currentGroup = computed(() => allCities?.value[tabActive?.value])
</script>

<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- 2.tab的切换 -->
      <!-- tabActive默认索引 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="index">
        <city-group v-show="tabActive == key" :group-data="value"></city-group>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped></style>

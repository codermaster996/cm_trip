<script setup>
import { storeToRefs } from "pinia"
import useHomeStore from "@/stores/modules/home"

import HouseItemType9 from "@/components/house-item-type9/house-item-type9.vue"
import HouseItemType3 from "@/components/house-item-type3/house-item-type3.vue"

const homeStroe = useHomeStore()
const { houselist } = storeToRefs(homeStroe)
</script>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houselist" :key="item?.data?.houseId">
        <house-item-type9 v-if="item?.discoveryContentType === 9" :item-data="item.data"></house-item-type9>
        <house-item-type3 v-if="item?.discoveryContentType === 3" :item-data="item.data"></house-item-type3>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

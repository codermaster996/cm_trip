<script setup>
import { storeToRefs } from "pinia"
import useHomeStore from "@/stores/modules/home"

import HouseItemType9 from "@/components/house-item-type9/house-item-type9.vue"
import HouseItemType3 from "@/components/house-item-type3/house-item-type3.vue"
import { useRouter } from "vue-router"
import useMainStore from "@/stores/modules/main"

const homeStroe = useHomeStore()
const { houselist } = storeToRefs(homeStroe)

// 跳转到Detail页面
const router = useRouter()
const itemClick = (item) => {
  router.push("/detail/" + item.houseId)
}

// 是否显示提示
const mainStroe = useMainStore()
const { isLoading } = storeToRefs(mainStroe)
</script>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houselist" :key="item?.data?.houseId">
        <house-item-type9
          v-if="item?.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data)"
        ></house-item-type9>
        <house-item-type3
          v-if="item?.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data)"
        ></house-item-type3>
      </template>
    </div>
    <div class="bottom" v-show="!isLoading">没数据了,别滚了!!!</div>
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

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
}
</style>

<script setup>
  import { ref } from "vue"

  import tabbarData from "@/assets/data/tabbar"
  import { getAssetURL } from "@/utils/load_assets"

  const currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
  .tab-bar {
    // 局部定义一个变量: 只针对.tab-bar子元素才生效
    // --van-tabbar-item-icon-size: 30px !important;

    // 找到类, 对类中的CSS属性重写
    // :deep(.class)找到子组件的类, 让子组件的类也可以生效
    :deep(.van-tabbar-item__icon) {
      font-size: 50px;
    }

    img {
      height: 28px;
    }
  }
</style>

<script setup>
import useCityStores from "@/stores/modules/city"
import { storeToRefs } from "pinia"
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

import { formatMonthDay, getDiffDays } from "@/utils/formate_date"
import useHomeStore from "@/stores/modules/home"
import useMainStore from "@/stores/modules/main"

const router = useRouter()
// 位置/城市
// 跳转到城市页面
const cityClick = () => {
  router.push("/city")
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("位置获取成功:", res)
    },
    (err) => {
      console.log("位置获取失败:", err)
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  )
}

// 选择的城市
const cityStore = useCityStores()
const { currentCity } = storeToRefs(cityStore)

// 日期范围的处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayCount = ref(getDiffDays(startDate.value, endDate.value))

// 日期的显示/隐藏
const showCalendar = ref(false)
// 日期区间
const onConfirm = (value) => {
  // 1.设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  startDate.value = selectStartDate
  endDate.value = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)

  // 2.隐藏日历
  showCalendar.value = false
}

// 日期选择文案
const formatter = (day) => {
  if (day.type === "start") {
    day.bottomInfo = "入住"
  } else if (day.type === "end") {
    day.bottomInfo = "离店"
  }

  return day
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 搜索按钮 跳转
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  })
}
</script>

<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position">
        <span class="text" @click="positionClick"> 我的位置 </span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <div class="tip">入住</div>
          <div class="time">{{ startDateStr }}</div>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <div class="tip">离店</div>
          <div class="time">{{ endDateStr }}</div>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" :show-confirm="false" @confirm="onConfirm" :formatter="formatter" />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item?.tagText?.color,
            background: item?.tagText?.background.color,
          }"
        >
          {{ item?.tagText?.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
  }

  .position {
    display: flex;
    align-items: center;
    width: 74px;

    .text {
      color: #666;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    align-items: center;
    height: 44px;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>

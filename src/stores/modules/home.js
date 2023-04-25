import { defineStore } from "pinia"
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/services"

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houselist: [],
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouselistData() {
      const res = await getHomeHouselist(this.currentPage)
      this.houselist = [...this.houselist, ...res.data]
      // this.houselist.push(...res.data)
      // console.log(this.houselist)
      if (res.data.length < 20 || res.data == "") return
      this.currentPage++
    },
  },
})

export default useHomeStore

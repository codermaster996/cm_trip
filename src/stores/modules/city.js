import { getCityAll } from "@/services";
import { defineStore } from "pinia";

const useCityStores = defineStore('city', {
  state: () => ({
    allCities: {},

    currentCity: {
      cityName: '江苏'
    }
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStores
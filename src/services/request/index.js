import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config"

class DSRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })
  }

  request(confing) {
    return new Promise((resolve, reject) => {
      this.instance.request(confing).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new DSRequest(BASE_URL, TIMEOUT)
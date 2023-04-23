import DSRequest from "../request"

export function getHomeHotSuggests() {
  return DSRequest.get({
    url: "/home/hotSuggests",
  })
}

export function getHomeCategories() {
  return DSRequest.get({
    url: "/home/categories",
  })
}

export function getHomeHouselist(currentPage = 1) {
  return DSRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  })
}

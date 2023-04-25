import DSRequest from "../request"

export function getDetailInfos(houseId) {
  return DSRequest.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  })
}

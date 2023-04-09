import DSRequest from '../request'

export function getCityAll() {
  return DSRequest.get({
    url: '/city/all'
  })
}
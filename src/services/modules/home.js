import DSRequest from '../request'

export function getHomeHotSuggests() {
  return DSRequest.get({
    url: '/home/hotSuggests'
  })
}
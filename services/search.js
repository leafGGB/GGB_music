import { anRequest } from "./index"

export function getHotList() {
  return anRequest.get({
    url: '/search/hot/detail'
  })
}

export function getSuggestion(keywords) {
  return anRequest.get({
    url: `/search/suggest??keywords=${keywords}`,
    data: {
      keywords
    }
  })
}
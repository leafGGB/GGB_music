import { anRequest } from "./index"

export function getSongDetail(ids) {
  return anRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return anRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}
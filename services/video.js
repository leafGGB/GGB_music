import { anRequest } from "/index"

export function getTopMV(offset = 0, limit = 20) {
  return anRequest.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })
}

export function getMVUrl(id) {
  return anRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}

export function getMVInfo(mvid) {
  return anRequest.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getMVRelated(id) {
  return anRequest.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}
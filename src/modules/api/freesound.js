import axios, { CancelToken } from 'axios'

import config from '../../config'

const API = axios.create({
  baseURL: config.api.freesoundUrl
})

let CANCEL_TOKEN

export const searchSounds = ({ query, maxDuration, sort }) => {
  if (CANCEL_TOKEN) {
    CANCEL_TOKEN.cancel()
  }

  CANCEL_TOKEN = CancelToken.source()

  return API.get(`/`, {
    params: {
      query,
      maxDuration,
      sort
    },
    cancelToken: CANCEL_TOKEN.token
  })
    .then(res => res.data)
    .catch(thrown => {
      if (axios.isCancel(thrown)) return
      throw thrown
    })
}

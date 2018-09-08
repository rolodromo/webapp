import axios, { CancelToken } from 'axios'
import { capitalize } from 'lodash'

import config from '../../config'

const API = axios.create({
  baseURL: config.api.freesoundUrl
})

let CANCEL_TOKEN

const cleanName = sound => ({
  ...sound,
  name: capitalize(
    sound.name
      .toLowerCase()
      .replace(/(_|\s)+/g, ' ')
      .replace(/\.(aif|mp3|wav|flacc|ogg)$/, '')
      .trim()
  )
})

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
    .then(res => {
      return {
        ...res,
        results: res.results.map(cleanName)
      }
    })
    .catch(thrown => {
      if (axios.isCancel(thrown)) return
      throw thrown
    })
}

import axios from 'axios'
import { unset } from 'lodash'

import config from '../../config'

const ME = axios.create({
  baseURL: `${config.api.baseUrl}/api/me`
})

export const loadOwnGenerators = () => ME.get(`/tables`).then(res => res.data)

export const loadFavoriteGenerators = () => ME.get(`/tables/favorites`).then(res => res.data)

export const setAuthToken = authToken => {
  if (!authToken) {
    unset(ME.defaults.headers.common, 'Authorization')
    return
  }
  ME.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
}

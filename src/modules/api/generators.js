import axios from 'axios'
import { unset } from 'lodash'

import config from '../config'

const HTTP = axios.create({
  baseURL: `${config.api.baseUrl}/api/generators`
})

export const setAuthToken = authToken => {
  if (!authToken) {
    unset(HTTP.defaults.headers.common, 'Authorization')
    return
  }
  HTTP.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
}

export const loadAll = () => HTTP.get(`/tables`).then(res => res.data)

export const loadNames = () => HTTP.get(`/tables/names`).then(res => res.data)

export const loadFeatured = () => HTTP.get(`/tables/featured`).then(res => res.data)

export const loadGenerator = generatorId => HTTP.get(`/table/${generatorId}`).then(res => res.data)

export const deleteGenerator = generatorId => HTTP.delete(`/table/${generatorId}`).then(res => res.data)

export const createGenerator = data => {
  return HTTP.post(`/tables`, data).then(res => res.data)
}

export const updateGenerator = (generatorId, data) => {
  return HTTP.put(`/table/${generatorId}`, data).then(res => res.data)
}

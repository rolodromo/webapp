import axios from 'axios'
import { unset } from 'lodash'

import config from '../../config'

const COLLECTION = axios.create({
  baseURL: `${config.api.baseUrl}/api/collections`
})

export const listByType = type => COLLECTION.get(`/${type}`).then(res => res.data)

export const loadCollection = id => COLLECTION.get(`/${id}`).then(res => res.data)

export const createCollection = ({ name, desc, type, items }) => COLLECTION.post(`/${type}`, { name, desc, items }).then(res => res.data)

export const renameCollection = ({ id, name, desc }) => COLLECTION.put(`/${id}`, { name, desc }).then(res => res.data)

export const deleteCollection = id => COLLECTION.delete(`/${id}`).then(res => res.data)

export const setAuthToken = authToken => {
  if (!authToken) {
    unset(COLLECTION.defaults.headers.common, 'Authorization')
    return
  }
  COLLECTION.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
}

import axios from 'axios'

import config from '../../config'

const AUTH = axios.create({
  baseURL: `${config.api.baseUrl}`
})

export const login = authToken => {
  return AUTH({
    method: 'POST',
    url: '/auth/login',
    json: true,
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.data)
}

export const refresh = refreshToken => {
  return AUTH({
    method: 'POST',
    url: '/auth/token/refresh',
    json: true,
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  }).then(res => res.data)
}

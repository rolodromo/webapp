import axios from 'axios'

import config from '../config'

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

import localforage from 'localforage'
import decode from 'jwt-decode'
import moment from 'moment'

export const getUserInfo = async () => {
  const token = await localforage.getItem('token')
  const profile = await localforage.getItem('profile')
  return { token, profile }
}

export const getReturnUrl = async () => {
  return localforage.getItem('returnUrl')
}

export const saveReturnUrl = async url => {
  return localforage.setItem('returnUrl', url)
}

export const saveProfile = async response => {
  await localforage.setItem('token', {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    expiresIn: response.expiresIn
  })
  return localforage.setItem('profile', response.profile)
}

export const logout = async () => {
  return Promise.all([localforage.removeItem('token'), localforage.removeItem('profile')])
}

export const isTokenExpired = token => {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < moment().add(1, 'day')
}

const getTokenExpirationDate = encodedToken => {
  const token = decode(encodedToken)
  if (!token.exp) {
    return null
  }
  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

import localforage from 'localforage'

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

export const saveIdToken = async idToken => {
  await localforage.setItem('id_token', idToken)
}

export const logout = async () => {
  return Promise.all([
    localforage.removeItem('id_token'),
    localforage.removeItem('token'),
    localforage.removeItem('profile')
  ])
}

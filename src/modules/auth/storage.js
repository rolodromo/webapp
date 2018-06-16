import localforage from 'localforage'

export const getUserInfo = async () => {
  const token = await localforage.getItem('token')
  const profile = await localforage.getItem('profile')
  return { token, profile }
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
  await localforage.removeItem('id_token')
  await localforage.removeItem('token')
  await localforage.removeItem('profile')
}

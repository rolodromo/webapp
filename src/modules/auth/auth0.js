import * as auth0 from 'auth0-js'

import config from '../../config'

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, CALLBACK_URL } = config.auth0

const webAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: CALLBACK_URL,
  scope: 'openid profile email',
  responseType: 'token id_token'
})

export function startLogin() {
  webAuth.authorize()
}

export async function parseCredentials() {
  return new Promise((resolve, reject) => {
    webAuth.parseHash({ hash: window.location.hash }, async (err, authResult) => {
      if (err) {
        return reject(err)
      }
      return resolve(authResult)
    })
  })
}

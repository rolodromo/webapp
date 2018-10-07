const { VUE_APP_API_URL, VUE_APP_FREESOUND_URL, VUE_APP_AUTH_CALLBACK_URL } = process.env // eslint-disable-line no-process-env

const config = {
  api: {
    baseUrl: VUE_APP_API_URL || 'https://api.rolodromo.com',
    freesoundUrl: VUE_APP_FREESOUND_URL || 'https://api.rolodromo.com/api/search/freesound'
  },
  auth0: {
    AUTH0_DOMAIN: 'guumaster.eu.auth0.com',
    AUTH0_CLIENT_ID: '24uuxZcdeQ7I4Pq1w6LVtK4l6jSbnBFd',
    CALLBACK_URL: VUE_APP_AUTH_CALLBACK_URL || 'https://rolodromo.com/callback'
  }
}

export default config

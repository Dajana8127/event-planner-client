let apiUrl
const apiUrls = {
  production: 'https://aqueous-atoll-85096.herokuapp.com',
  development: 'https://project-event-planner.herokuapp.com/'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl

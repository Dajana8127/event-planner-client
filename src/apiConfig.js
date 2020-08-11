let apiUrl
const apiUrls = {
  production: 'https://aqueous-atoll-85096.herokuapp.com',
<<<<<<< HEAD
  development: 'https://project-event-planner.herokuapp.com/'
=======
  development: 'http://localhost:8000'
>>>>>>> rsvp
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl

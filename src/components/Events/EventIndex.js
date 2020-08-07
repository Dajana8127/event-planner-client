import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class EventIndex extends Component {
  constructor () {
    super()

    this.state = {
      events: null
    }
  }

  componentDidMount () {
    const { user } = this.props
    console.log(user.token)
    axios({
      method: 'GET',
      url: `${apiUrl}/events/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        console.log(response)
        // handle success
        this.setState({
          events: response.data
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.events === null) {
      jsx = <p>Loading...</p>
    } else if (this.state.events.length === 0) {
      jsx = <p>No events created so far</p>
    } else {
      jsx = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5 event-index">
            <ul>
              {this.state.events.map(event1 => {
                return (
                  <li key={event1.id}>
                    <h3>{event1.name}</h3>
                    <h4>{event1.description}</h4>
                    <h4>{event1.date}</h4>
                    <h4>{event1.time}</h4>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }
    return (
      <div>
        <h1>Events</h1>
        {jsx}
      </div>
    )
  }
}

export default EventIndex
//
// // <Link to={`/events/${event.id}/rsvp`}>
// //   <button className="btn">RSVP</button>
// // </Link>
//
// // <h3><Link to={`/events/${event1.id}`}>{event1.name}</Link></h3>
// <Link to={`/events/${event1.id}/`}>
//   <button className="btn">RSVP</button>
// </Link>

import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class EventIndex extends Component {
  constructor () {
    super()

    this.state = {
      myEvents: null
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
        console.log('this is the user', user)
        const events = response.data
        const filteredEvents = events.filter(event1 => event1.owner === user.id)
        // handle success
        this.setState({
          myEvents: filteredEvents
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.myEvents === null) {
      jsx = <p>Loading...</p>
    } else if (this.state.myEvents.length === 0) {
      jsx = <p>You have not created any events so far. Go to create event page to create a new event.</p>
    } else {
      jsx = (
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5 event-index">
            <ul>
              {this.state.myEvents.map(event1 => {
                return (
                  <li key={event1.id}>
                    <h3>{event1.name}</h3>
                    <h4>{event1.description}</h4>
                    <h4>{event1.place}</h4>
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
        <h1>My Events</h1>
        {jsx}
      </div>
    )
  }
}

export default EventIndex

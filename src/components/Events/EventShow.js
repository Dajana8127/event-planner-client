import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class EventIndex extends Component {
  constructor () {
    super()

    this.state = {
      event1: ''
    }
  }
  componentDidMount () {
    console.log(this.props)
    const { user } = this.props
    const id = this.props.match.params.id
    axios({
      method: 'GET',
      url: apiUrl + `/events/${id}`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        // handle success
        this.setState({
          event1: response.data
        })
        this.setState(response.data)
      })
      .catch(console.error)
  }
  render () {
    let jsx
    // if the API has not responded yet
    if (this.state.event1 === null) {
      jsx = <p>Loading...</p>
    // after API responds
    } else {
      jsx = (
        <div className="row event-show">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <section>
              <h3>{this.state.event1.name}</h3>
              <h4>{this.state.event1.place}</h4>
              <h4>{this.state.event1.description}</h4>
            </section>
          </div>
        </div>
      )
    }
    return (
      <div className="event1-show">
        <h2>Your event</h2>
        {jsx}
      </div>
    )
  }
}

export default EventIndex

import React, { Component } from 'react'
import axios from 'axios'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

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
        const reversedFilteredEvents = filteredEvents.slice(0).reverse()
        // handle success
        this.setState({
          myEvents: reversedFilteredEvents
        })
      })
      .catch(console.error)
  }

  render () {
    let jsx
    if (this.state.myEvents === null) {
      jsx = <p>Loading...</p>
    } else if (this.state.myEvents !== null && this.state.myEvents.length === 0) {
      jsx = <p>You have not created any events so far. Go to create event page to create a new event.</p>
    } else {
      jsx = (
        <Container fluid>
          <Row className="justify-content-md-center" style={{ color: 'white', width: '100wv' }}>
            {this.state.myEvents.map(event1 => {
              return (
                <Col xs={6} md={4} lg={3} xl={3} style={{ margin: '30px 20px', padding: '5px', width: '400px', textAlign: 'center', color: '#4C603A', border: 'solid 2px #A6817B' }} key={event1.id}>
                  <h3><Link style={{ color: '#A6817B', '&:hover': { textDecoration: 'underline' } }} to={`events/${event1.id}`}>{event1.name}</Link></h3>
                  <h4>{event1.description}</h4>
                  <h4>{event1.place}</h4>
                  <h4>{event1.date}</h4>
                  <h4>{event1.time}</h4>
                </Col>
              )
            })}
          </Row>
        </Container>
      )
    }
    return (
      <div style={{ width: '100vw' }}>
        <h1>My Events</h1>
        {jsx}
      </div>
    )
  }
}

export default EventIndex

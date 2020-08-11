import React, { Component } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class EventIndex extends Component {
  constructor () {
    super()

    this.state = {
      events: null,
      rsvp: ''
    }
  }

  componentDidMount () {
    const { user } = this.props
    console.log('component did mount', user)
    if (user !== null) {
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
  }

  content = 'RSVP'

  handleChange = event1 => {
    console.log('this is the event1', event1)
    console.log('rsvp has been clicked')
    const { user, msgAlert } = this.props
    axios({
      method: 'POST',
      url: `${apiUrl}/rsvps/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        rsvp: {
          event: event1.id
        }
      }
    })
      .then(response => {
        console.log(response)
        this.content = 'Cancel RSVP'
        this.setState({
          rsvp: response.data
        })
      })
      .then(() => msgAlert({
        heading: 'RSVP',
        message: `You successfully RSVPed to ${event1.name}`,
        variant: 'success'
      }))
      .catch(console.error)
  }

  handleCancel = event1 => {
    const { msgAlert, user } = this.props
    if (this.content === 'Cancel RSVP') {
      axios({
        method: 'DELETE',
        url: `${apiUrl}/rsvps/${this.state.rsvp.id}`,
        headers: {
          'Authorization': `Token ${user.token}`
        }
      })
        .then(() => {
          this.content = 'RSVP'
        })
        .then(() => msgAlert({
          heading: 'RSVP Cancelation',
          message: 'You successfully canceled your RSVP',
          variant: 'success'
        }))
        .catch(console.error)
    }
  }
  render () {
    let jsx
    const { user } = this.props
    jsx = <p style={{ fontSize: '75px', color: 'white', fontWeight: '150', textAlign: 'left', width: '100%', marginTop: '15px' }}>Sign in now to see<br/> all upcoming events!</p>
    if (user) {
      if (this.state.events === null) {
        jsx = <p style={{ fontSize: '4.6vw', color: 'white' }}>Loading...</p>
      } else if (this.state.events.length === 0) {
        jsx = <p style={{ fontSize: '4.6vw', color: 'white' }}>No events created so far</p>
      } else {
        jsx = (
          <Container fluid>
            <Row className="justify-content-md-center" style={{ color: 'white' }}>
              {this.state.events.map(event1 => {
                return (
                  <Col xs={6} md={4} lg={3} xl={3} style={{ margin: '30px 20px', padding: '5px', width: '400px', textAlign: 'center', color: '#4C603A', border: 'solid 2px #A6817B' }} key={event1.id}>
                    <h3 style={{ fontSize: '33px', fontWeight: '700' }}>{event1.name}</h3>
                    <h4>{event1.description}</h4>
                    <h4>{event1.place}</h4>
                    <h4>{event1.date}</h4>
                    <h4>{event1.time}</h4>
                    <h4>{event1.rsvps}</h4>
                    <Button onClick={(() => {
                      if (this.content === 'RSVP') {
                        this.handleChange(event1)
                      } else {
                        this.handleCancel(event1)
                      }
                    })}>{this.content}</Button>
                  </Col>
                )
              })}
            </Row>
          </Container>
        )
      }
    }
    return (
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', width: '100vw' }}>
        <h1 style={{ color: '#A6817B', fontSize: '40px', marginTop: '15px' }}>Events Page</h1>
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

// this.state.events.rsvps.push(this.state.rsvp.id)

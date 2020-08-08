import React, { Component } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

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
  render () {
    let jsx
    const { user } = this.props
    jsx = <p style={{ fontSize: '75px', color: 'white', fontWeight: '150', textAlign: 'left', width: '100%', marginTop: '15px' }}>Sign in now to see<br/> all upcoming events!</p>
    if (user) {
      if (this.state.events === null) {
        jsx = <p>Loading...</p>
      } else if (this.state.events.length === 0) {
        jsx = <p>No events created so far</p>
      } else {
        jsx = (
          <Container fluid>
            <Row className="justify-content-md-center" style={{ color: 'white' }}>
              {this.state.events.map(event1 => {
                return (
                  <Col xs={6} md={4} lg={3} xl={3} style={{ border: '3px solid black', margin: '30px 20px', padding: '5px', width: '400px' }} key={event1.id}>
                    <h3>{event1.name}</h3>
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
    }
    return (
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', width: '100vw' }}>
        <h1 style={{ color: 'white', fontSize: '40px', marginTop: '15px' }}>Events Page</h1>
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

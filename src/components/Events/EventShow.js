import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

import apiUrl from '../../apiConfig'

class EventIndex extends Component {
  constructor () {
    super()

    this.state = {
      event1: '',
      updated: false,
      deleted: false
    }
  }
  componentDidMount () {
    console.log(this.props)
    const { user } = this.props
    const id = this.props.match.params.id
    axios({
      method: 'GET',
      url: apiUrl + `/events/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(response => {
        // handle success
        this.setState({
          event1: response.data
        })
      })
      .catch(console.error)
  }

  handleChange = event => {
    event.preventDefault()
    console.log('clicked', event)
    // get the key from the input name field
    const event1Key = event.target.name
    // get the input value that the user typed in
    const value = event.target.value
    // make a copy of the current state
    const event1Copy = Object.assign({}, this.state.event1)
    // update the copy with the new user input
    event1Copy[event1Key] = value
    // update the state with the updated copy
    this.setState({ event1: event1Copy })
  }

  handleSubmit = event => {
    event.preventDefault()
    const id = this.props.match.params.id
    console.log(id)
    const { msgAlert, user } = this.props
    axios({
      method: 'PATCH',
      url: `${apiUrl}/events/${id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: {
        event1: this.state.event1
      }
    })
      .then(response => {
        this.setState({
          updated: true,
          event1: response.data
        })
      })
      .then(() => msgAlert({
        heading: 'Event Update Success',
        message: 'You updated event successfully',
        variant: 'success'
      }))
      .catch(console.error)
  }

  deleteEvent = event => {
    const id = this.props.match.params.id
    const { msgAlert, user } = this.props
    console.log('clicked', event)
    axios({
      method: 'DELETE',
      url: `${apiUrl}/events/${id}`,
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => {
        this.setState({
          deleted: true
        })
      })
      .then(() => msgAlert({
        heading: 'Event Deleted Successfully',
        message: 'The event is deleted',
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    // const id = this.props.match.params.id
    if (this.state.updated === true || this.state.deleted === true) {
      return <Redirect to={'/my-events'}></Redirect>
    }
    let jsx
    // if the API has not responded yet
    if (this.state.event1 === null) {
      jsx = <p>Loading...</p>
    // after API responds
    } else {
      jsx = (
        <div className="row event-show">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1>Update Event</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={this.state.event1.name}
                  placeholder="Enter event name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="place">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="place"
                  value={this.state.event1.place}
                  placeholder="Location"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="description"
                  value={this.state.event1.description}
                  placeholder="What are you doing?"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                  value={this.state.event1.date}
                  placeholder="Enter event date"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="time">
                <Form.Label>Event Time</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="time"
                  value={this.state.event1.time}
                  placeholder="Enter event time"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                className="btn"
                variant="primary"
                type="submit"
              >
                Update
              </Button>
            </Form>
            <Form onSubmit={this.deleteEvent}>
              <Button
                className="btn"
                variant="primary"
                type="submit"
              >
                Delete
              </Button>
            </Form>
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

// <h3>{this.state.event1.name}</h3>
// <h4>{this.state.event1.place}</h4>
// <h4>{this.state.event1.description}</h4>

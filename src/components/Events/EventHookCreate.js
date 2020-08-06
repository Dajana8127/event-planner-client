import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Event1Create = (props) => {
  const [event1, setEvent1] = useState({ name: '', description: '', place: '' })
  const [createdEvent1Id, setCreatedEvent1Id] = useState(null)

  const handleChange = event => {
    event.persist()
    console.log('this is the event', event)
    console.log('this is event.target', event.target)
    console.log('this is event.target.name', event.target.name)
    setEvent1((prevEvent1) => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedEvent1 = Object.assign({}, prevEvent1, updatedField)
      return editedEvent1
    // setevent1(editedevent1)
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    const { msgAlert, user } = props
    console.log(user.token)
    axios({
      url: `${apiUrl}/events/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      method: 'POST',
      data: {
        event1: {
          name: event1.name,
          place: event1.place,
          description: event1.description,
          owner: user.id
        }
      }
    })
      .then(response => {
        console.log('this is response', response)
        setCreatedEvent1Id(response.data.id)
      })
      .then(() => msgAlert({
        heading: 'Event Create Succes',
        message: 'You created an event successfully',
        variant: 'success'
      }))
      .catch(console.error)
  }
  if (createdEvent1Id) {
    return <Redirect to='/' />
    // {`/events/${createdEvent1Id}`}
  }

  return (
    <div className="row event-create">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h1>Create Event</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="eventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={event1.name}
              placeholder="Enter event name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="place">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              name="place"
              value={event1.place}
              placeholder="Location"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={event1.description}
              placeholder="What are you doing?"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            className="btn"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Event1Create

// <Form.Group controlId="date">
//   <Form.Label>Date</Form.Label>
//   <Form.Control
//     required
//     type="date"
//     name="date"
//     value={event1.date}
//     placeholder="Date"
//     onChange={handleChange}
//   />
// </Form.Group>
// <Form.Group controlId="time">
//   <Form.Label>Time</Form.Label>
//   <Form.Control
//     required
//     type="time"
//     name="time"
//     value={event1.time}
//     placeholder="Time"
//     onChange={handleChange}
//   />
// </Form.Group>

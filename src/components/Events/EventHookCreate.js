import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Event1Create = (props) => {
  console.log('props are this', props)
  const [event1, setEvent1] = useState({ name: '', description: '', place: '' })
  const [createdEvent1Id, setCreatedEvent1Id] = useState(null)

  const handleChange = event => {
    event.persist()
    // console.log('this is the event', event)
    // console.log('this is event.target', event.target)
    // console.log('this is event.target.name', event.target.name)
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
        console.log('this is created id', createdEvent1Id)
      })
      .then(() => msgAlert({
        heading: 'Event Created Successfully',
        message: 'You created an event successfully',
        variant: 'success'
      }))
      .catch(console.error)
  }
  console.log('this is the created id', createdEvent1Id)
  if (createdEvent1Id) {
    const jsx =
    <div id='created-event'>
      <h1>{event1.name}</h1>
      <h2>{event1.description}</h2>
      <h2>{event1.place}</h2>
      <h2>See my events</h2>
      <button><Link to='/my-events'>My events</Link></button>
      <h2>Create a new event</h2>
      <button onClick={''}>Create</button>
    </div>
    return jsx
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

// import React from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import Row from 'react-bootstrap/Row'
// import Container from 'react-bootstrap/Container'
// import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
//
// const Rsvp = (props) => {
//   console.log('props', this.props)
//   const handleChange = (event) => {
//     console.log('rsvp has been clicked')
//     const { user } = this.props
//     axios({
//       method: 'POST',
//       url: `${apiUrl}/rsvps/`,
//       headers: {
//         'Authorization': `Token ${user.token}`
//       },
//       data: {
//         rsvp: {
//           going: 'True'
//         }
//       }
//     })
//       .then(response => {
//         console.log(response)
//         // handle success
//         this.setState({
//           rsvp: response.data
//         })
//       })
//       .catch(console.error)
//     axios({
//       method: 'POST',
//       url: `${apiUrl}/connections/`,
//       headers: {
//         'Authorization': `Token ${user.token}`
//       },
//       data: {
//         connection: {
//           rsvp_id: `${this.state.rsvp.id}`,
//           event_id: `${this.props.event1.id}`
//         }
//       }
//     })
//       .then(response => {
//         console.log(response)
//         // handle success
//         this.setState({
//           connection: response.data
//         })
//       })
//       .catch(console.error)
//     this.state.events.rsvps.push(this.state.rsvp.id)
//
//     axios({
//       method: 'PATCH',
//       url: `${apiUrl}/events/${this.props.event1.id}`,
//       headers: {
//         'Authorization': `Token ${user.token}`
//       },
//       data: {
//         event1: {
//           rsvps: this.state.events.rsvps
//         }
//       }
//     })
//   }
//   return (
//     <Container fluid>
//       <Row className="justify-content-md-center" style={{ color: 'white' }}>
//         <Col xs={6} md={4} lg={3} xl={3} style={{ border: '3px solid black', margin: '30px 20px', padding: '5px', width: '400px' }}>
//           <Button onClick={handleChange}>RSVP</Button>
//         </Col>
//       </Row>
//     </Container>
//   )
// }
//
// export default Rsvp
//
// // <h2>{this.props.event1.name}</h2>
// // <h4>{this.props.event1.description}</h4>
// // <h4>{this.props.event1.place}</h4>
// // <h4>{this.props.event1.date}</h4>
// // <h4>{this.props.event1.time}</h4>
// // <h4>Placeholder for emails of the users{this.props.event1.rsvps}</h4>

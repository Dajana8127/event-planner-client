import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Event1Create from '../Events/EventHookCreate'
import EventIndex from '../Events/EventIndex'
import EventShow from '../Events/EventShow'
import MyEvents from '../Events/MyEvents'

class App extends Component {
  constructor () {
    super()

    this.state = {
      events: [],
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setEvents = events => this.setState({ events: events })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up/' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in/' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/events/' render={() => (
            <EventIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-event/' render={() => (
            <Event1Create msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password/' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out/' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/events/:id' render={({ match }) => {
            this.state.events.find(event1 => event1.id === match.params.id)
            return <EventShow msgAlert={this.msgAlert} match={match} user={user} />
          }} />
          <AuthenticatedRoute user={user} path='/my-events/' render={() => (
            <MyEvents msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.scss'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Cities from './components/routes/Cities'
import Home from './components/routes/Home'
import City from './components/routes/City'
import CityCreate from './components/routes/CityCreate'
import CityEdit from './components/routes/CityEdit'

import Alert from 'react-bootstrap/Alert'
import WeatherHome from './components/WeatherHome'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path="/" component={Home}/>
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-city' render={() => (
            <CityCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/cities' render={({ match }) => (
            <Cities alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/cities/:id' render={({ match }) => (
            <City alert={this.alert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/cities/:id/edit' render={({ match }) => (
            <CityEdit alert={this.alert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/weather-home' render={({ match }) => (
            <WeatherHome alert={this.alert} user={user} match={match}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default withRouter(App)

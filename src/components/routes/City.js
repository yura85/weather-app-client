
import React, { Component } from 'react'
// import Layout from '../shared/Layout'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../../auth/messages'
import Weather from '../Weather'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const API_KEY = 'dd608606ad10e8cae06fbf4203ff1570'

class City extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: null,
      deleted: false,
      temperature: '',
      country: '',
      humidity: '',
      description: '',
      pressure: '',
      date: '',
      icon: '',
      error: '',
      isWeatherLoaded: false
    }
  }

  async componentDidMount () {
    const response = await axios({
      method: 'GET',
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    this.setState({ city: response.data.city })
  }

  getWeather = async (city, country) => {
    event.preventDefault()
    const apicall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`)
    const data = await apicall.json()
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        pressure: data.main.pressure,
        icon: data.weather[0].icon,
        date: data.dt,
        error: '',
        isClear: true,
        isWeatherLoaded: true
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        pressure: undefined,
        icon: undefined,
        date: undefined,
        error: 'Please enter the values.',
        isWeatherLoaded: false
      })
    }
  }

deleteCity = async (id) => {
  const { alert } = this.props
  await axios({
    method: 'DELETE',
    url: `${apiUrl}/cities/${this.props.match.params.id}`,
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    }
  })
  alert(messages.deleteSuccess, 'success')
  this.setState({ deleted: true })
}

render () {
  const { city, deleted } = this.state

  if (!city) {
    return <p>Loading ...</p>
  }

  if (deleted) {
    return (<Redirect to={
      { pathname: '/cities', state: { msg: 'City successfully deleted!' } }
    } />)
  }
  if (!this.state.isWeatherLoaded) {
    this.getWeather(city.name, city.country)
  }
  return (
    <Card bg="info" text="white" style={{ width: '60rem' }}>
      <Card.Body>
        <Card.Title>
          <p className="location">Location:  <span className="weather__value">{city.name ? city.name : 'Unknown'}</span>, <span className="weather__value">{city.country ? city.country : 'Unknown'}</span> </p>
        </Card.Title>
        <Weather
          temperature={this.state.temperature}
          humidity={this.state.humidity}
          city={this.state.city}
          country={this.state.country}
          description={this.state.description}
          pressure={this.state.pressure}
          icon={this.state.icon}
          error={this.state.error}
        />
        <Link to='/cities'>
          <Button variant="primary" size="sm">Back to list</Button>
        </Link>
        <Link to={'/cities/' + city._id + '/edit'}>
          <Button variant="primary" size="sm" >Edit</Button>
        </Link>
        <Button variant="danger" size="sm" onClick={() =>
          this.deleteCity(city._id)}>Remove</Button>

      </Card.Body>
    </Card>
  )
}
}

export default City

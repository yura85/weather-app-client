
import React, { Component } from 'react'
import Layout from '../shared/Layout'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../../auth/messages'
import Weather from '../Weather'

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
      error: ''
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
        error: '',
        isClear: true
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the values.'
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

  return (
    <Layout>
      <div className="weather__info">
        <p className="weather__key">City: <span className="weather__value">{city.name ? city.name : 'Unknown'}</span></p>
        <p className="weather__key">Country: <span className="weather__value">{city.country ? city.country : 'Unknown'}</span></p>
      </div>
      <Weather
        temperature={this.state.temperature}
        humidity={this.state.humidity}
        city={this.state.city}
        country={this.state.country}
        description={this.state.description}
        error={this.state.error}
      />
      <button onClick={() =>
        this.deleteCity(city._id)}>Delete City</button>
      <button onClick={() =>
        this.getWeather(city.name, city.country)}>Get Weather</button>
      <Link to={'/cities/' + city._id + '/edit'}>
        <button>Edit</button>
      </Link>
      <Link to='/cities'>Back to list</Link>
    </Layout>

  )
}
}

export default City

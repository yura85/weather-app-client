import React from 'react'

import Titles from './Titles'
// import Form from './Form'
import Weather from './Weather'

const API_KEY = 'dd608606ad10e8cae06fbf4203ff1570'

class WeatherHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      temperature: '',
      city: '',
      country: '',
      humidity: '',
      description: '',
      error: '',
      isClear: false
    }
  }
  getWeather = async (event) => {
    event.preventDefault()
    const city = event.target.elements.city.value
    const country = event.target.elements.country.value
    const apicall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`)
    const data = await apicall.json()
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
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
    if (this.state.isClear === true) {
      document.getElementById('myForm').reset()
    }
  }

  render () {
    return (
      <div>
        <div>
          <Titles />
        </div>
        <div>
          <form onSubmit={this.getWeather} id="myForm">
            <input type="text" name="city" placeholder="City..."/>
            <input type="text" name="country" placeholder="Country..."/>
            <button >Get Weather</button>
          </form>
          <Weather
            temperature={this.state.temperature}
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    )
  }
}

export default WeatherHome

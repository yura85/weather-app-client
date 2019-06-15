import React from 'react'

import Titles from './Titles'
import Card from 'react-bootstrap/Card'
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
      pressure: '',
      icon: '',
      date: '',
      wind: '',
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
        pressure: data.main.pressure,
        icon: data.weather[0].icon,
        date: data.dt,
        wind: data.wind.speed,
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
        pressure: undefined,
        icon: undefined,
        date: undefined,
        wind: undefined,
        error: 'Please enter the values.',
        isClear: false
      })
    }
    if (this.state.isClear === true) {
      document.getElementById('myForm').reset()
    }
  }

  render () {
    return (
      <div>
        <Card bg="info" text="white" style={{ width: '58rem', display: 'flex' }}>
          <Titles />
          <div className="getweather_form">
            <form onSubmit={this.getWeather} id="myForm">
              <input type="text" name="city" placeholder="City..."/>
              <input type="text" name="country" placeholder="Country..."/>
              <button >Get Weather</button>
            </form>
            <Weather
              date={this.state.date}
              temperature={this.state.temperature}
              humidity={this.state.humidity}
              city={this.state.city}
              country={this.state.country}
              description={this.state.description}
              pressure={this.state.pressure}
              icon={this.state.icon}
              wind={this.state.wind}
              error={this.state.error}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default WeatherHome

import React from 'react'

import TitlesBoston from './TitlesBoston'
// import Form from './Form'
import Weather from './Weather'

const API_KEY = '1ab49347a97cd4c9d16396b82fab91b5'

class WeatherHomeFront extends React.Component {
      state = {
        temperature: undefined,
        city: '',
        country: '',
        humidity: undefined,
        description: undefined,
        error: undefined,
        isWeatherLoaded: false
      }

  getWeather = async () => {
    const city = 'Boston'
    const country = 'USA'
    const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await apicall.json()
    console.log(data)
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: '',
      isWeatherLoaded: true
    })
  }
  render () {
    if (!this.state.isWeatherLoaded) {
      this.getWeather()
    }
    return (
      <div>
        <div>
          <TitlesBoston />
        </div>
        <div>
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

export default WeatherHomeFront

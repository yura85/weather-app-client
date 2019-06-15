import React from 'react'

import TitlesBoston from './TitlesBoston'
import Card from 'react-bootstrap/Card'
import Weather from './Weather'

const API_KEY = 'dd608606ad10e8cae06fbf4203ff1570'

class WeatherHomeFront extends React.Component {
      state = {
        temperature: undefined,
        city: '',
        country: '',
        humidity: undefined,
        description: undefined,
        pressure: undefined,
        icon: '',
        date: '',
        wind: '',
        error: undefined,
        isWeatherLoaded: false
      }

  getWeather = async () => {
    const city = 'Boston'
    const country = 'USA'
    const apicall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`)
    const data = await apicall.json()
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
      isWeatherLoaded: true
    })
  }
  render () {
    if (!this.state.isWeatherLoaded) {
      this.getWeather()
    }
    return (
      <div>
        <Card bg="info" text="white" style={{ width: '58rem', display: 'flex' }}>
          <TitlesBoston />
          <div>
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

export default WeatherHomeFront

import React from 'react'

import Titles from './Titles'
// import Form from './Form'
import Weather from './Weather'

const API_KEY = '291a933f5fe705b63ea6513ea22fa1a3'

class WeatherHomeFront extends React.Component {
  state = {
    temperature: undefined,
    city: '',
    country: '',
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (event) => {
    console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
    const city = 'Boston'
    const country = 'USA'
    const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await apicall.json()
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
      console.log('***', data.temperature)
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
  render () {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Weather getWeather={this.getWeather}
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city='Boston'
                    country='USA'
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherHomeFront


import React from 'react'
import Card from 'react-bootstrap/Card'

const Weather = props => (
  <Card bg="info" style={{ width: '58rem' }} className="weather">
    <div className="weather__info">
      {props.city && props.country && <p className="weather__key"> Location:
        <span className="weather__value"> { props.city }, { props.country }</span>
      </p>
      }
      {props.temperature && <p className="weather__key"> Temperature:
        <span className="weather__value"> { props.temperature }</span>
      </p>
      }
      {props.humidity && <p className="weather__key"> Humidity:
        <span className="weather__value"> { props.humidity } </span>
      </p>
      }
      {props.description && <p className="weather__key"> Conditions:
        <span className="weather__value"> { props.description } </span>
      </p>
      }
      {props.error && <p className="weather__error">{ props.error }</p>
      }
    </div>
  </Card>
)

export default Weather

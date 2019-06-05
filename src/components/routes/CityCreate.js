import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Form from './Form'

import axios from 'axios'
import apiUrl from '../../apiConfig'

class CityCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: {
        name: '',
        country: ''
      },
      createdCityId: null
    }
  }

  handleSubmit = async (event) => {
    // make axios reuest, handle success, etc
    event.preventDefault()
    console.log('submited', event)
    const response = await axios.post(`${apiUrl}/cities`, {
      city: this.state.city
    })
    this.setState({ createdCityId: response.data.city.id })
  }

  handleChange = (event) => {
    // access and update state
    console.log('change staff', event)
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedCity = Object.assign(this.state.city, updatedField)

    this.setState({ city: editedCity })
  }
  render () {
    const { createdCityId, city } = this.state

    if (createdCityId) {
      return <Redirect to={`/cities/${createdCityId}`}/>
    }
    return (
      <Form
        city={city}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        cancelPath='/'
      />
    )
  }
}
export default CityCreate

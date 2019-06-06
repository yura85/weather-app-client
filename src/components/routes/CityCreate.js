import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Layout from '../shared/Layout'
import CityForm from '../shared/CityForm'

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
    const response = await axios({
      method: 'POST',
      url: `${apiUrl}/cities`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        city: {
          name: this.state.city.name,
          country: this.state.city.country
        }
      }
    })
    this.setState({ createdCityId: response.data.city._id })
  }

  handleChange = (event) => {
    // access and update state
    console.log('change staff', event)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    console.log('+++++++++++', updatedField)

    const editedCity = Object.assign(this.state.city, updatedField)

    this.setState({ city: editedCity })
  }
  render () {
    const { createdCityId, city, country } = this.state
    console.log('*********', createdCityId, city, country)

    if (createdCityId) {
      return (<Redirect to={ { pathname: '/cities' } } />)
    }
    return (
      <Layout>
        <CityForm
          city={city}
          country={country}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath='/cities'
        />
      </Layout>
    )
  }
}
export default CityCreate

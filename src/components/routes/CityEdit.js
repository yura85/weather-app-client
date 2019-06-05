import React, { Component } from 'react'
import Layout from '../shared/Layout'
import CityForm from '../shared/CityForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class CityEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: {
        name: '',
        country: ''
      },
      updated: false
    }
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/cities/${this.props.match.params.id}`)
    this.setState({ city: response.data.city })
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

  handleSubmit = async (event) => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      method: 'PATCH',
      data: {
        city: this.state.city
      }
    })
    this.setState({ updated: true })
  }

  render () {
    const { updated, city } = this.state
    if (updated) {
      return <Redirect to={`/cities/${this.props.match.params.id}`}/>
    }
    return (
      <Layout>
        <CityForm
          city={city}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath={`/cities/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default CityEdit

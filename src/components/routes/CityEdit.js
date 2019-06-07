import React, { Component } from 'react'
import Layout from '../shared/Layout'
import CityForm from '../shared/CityForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import messages from '../../auth/messages'

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
    const response = await axios({
      method: 'GET',
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    this.setState({ city: response.data.city })
  }

  handleChange = (event) => {
    // access and update state
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedCity = Object.assign(this.state.city, updatedField)

    this.setState({ city: editedCity })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { alert } = this.props
    await axios({
      method: 'PATCH',
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        city: this.state.city
      }
    })
    alert(messages.editSuccess, 'success')
    this.setState({ updated: true })
  }

  render () {
    const { updated, city, country } = this.state
    if (updated) {
      return <Redirect to={`/cities/${this.props.match.params.id}`}/>
    }
    return (
      <Layout>
        <CityForm
          city={city}
          country={country}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath={`/cities/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default CityEdit

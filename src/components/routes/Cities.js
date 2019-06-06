import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import { Link } from 'react-router-dom'

class Cities extends Component {
  constructor () {
    super()

    this.state = {
      cities: []
    }
  }

  async componentDidMount () {
    console.log(this.props)
    const response = await axios({
      method: 'GET',
      url: `${apiUrl}/cities`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    this.setState({ cities: response.data.cities })
  }

  render () {
    const cities = this.state.cities.map(city => (
      <li key={city._id}>
        <Link to={'/cities/' + city._id}>{city.name ? city.name : 'Unknown citty name'}</Link>
      </li>
    ))

    return (
      <Layout>
        <Link to={'create-city/'}>Add City</Link>
        <p>All the cities</p>
        <ul>
          {cities}
        </ul>
      </Layout>
    )
  }
}

export default Cities

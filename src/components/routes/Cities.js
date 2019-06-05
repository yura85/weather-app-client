import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import { Link } from 'react-router-dom'

class Cities extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cities: []
    }
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/cities`)
    this.setState({ cities: response.data.cities })
  }

  render () {
    const cities = this.state.cities.map(city => (
      <li key={city.id}>
        <Link to={'/cities/' + city.id}>{city.name ? city.name : 'Unknown citty name'}</Link>
      </li>
    ))

    return (
      <Layout>
        <p>All the cities</p>
        <ul>
          {cities}
        </ul>
      </Layout>
    )
  }
}

export default Cities

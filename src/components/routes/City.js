import React, { Component } from 'react'
import Layout from '../shared/Layout'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class City extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: null,
      deleted: false
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

  deleteCity = async (id) => {
    await axios({
      method: 'DELETE',
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    this.setState({ deleted: true })
  }

  render () {
    const { city, deleted } = this.state

    if (!city) {
      return <p>Loading ...</p>
    }

    if (deleted) {
      return (<Redirect to={
        { pathname: '/cities', state: { msg: 'City successfully deleted!' } }
      } />)
    }

    return (
      <Layout>
        <p>city: {city.name ? city.name : 'Unknown'}</p>
        <p>country: {city.country ? city.country : 'Unknown'}</p>
        <button onClick={() =>
          this.deleteCity(city._id)}>Delete City</button>
        <Link to={'/cities/' + city._id + '/edit'}>
          <button>Edit</button>
        </Link>
        <Link to='/cities'>Back to all cities</Link>
      </Layout>

    )
  }
}

export default City

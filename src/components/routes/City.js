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
    const response = await axios(`${apiUrl}/cities/${this.props.match.params.id}`)
    this.setState({ city: response.data.city })
  }

  deleteCity = async (id) => {
    await axios.delete(`${apiUrl}/cities/${id}`)
    this.setState({ deleted: true })
  }

  render () {
    const { city, deleted } = this.state

    if (!city) {
      return <p>Loading ...</p>
    }

    if (deleted) {
      return (<Redirect to={
        { pathname: '/', state: { msg: 'City successfully deleted!' } }
      } />)
    }

    return (
      <Layout>
        <p>{city.name}</p>
        <p>country: {city.country ? city.country : 'Unknown'}</p>
        <button onClick={() =>
          this.deleteCity(city.id)}>Delete City</button>
        <Link to={'/cities/' + city.id + '/edit'}>
          <button>Edit</button>
        </Link>
        <Link to='/cities'>Back to all cities</Link>
      </Layout>

    )
  }
}

export default City

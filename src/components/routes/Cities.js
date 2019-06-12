import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

class Cities extends Component {
  constructor () {
    super()

    this.state = {
      cities: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    axios({
      method: 'GET',
      url: `${apiUrl}/cities`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then((response) => {
        const cities = response.data.cities
        const filterCities = cities.filter(city => user._id === city.owner)
        this.setState({ cities: filterCities })
      })
      .catch((error) => console.error(error))
  }

  render () {
    const cities = this.state.cities.map(city => (
      <ListGroup.Item key={city._id}>
        <Link to={'/cities/' + city._id}>{city.name ? city.name : 'Unknown citty name'}</Link>
      </ListGroup.Item>
    ))

    return (
      <Layout>
        <Card bg="info" text="white" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Your Favorite Cities</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {cities}
              </ListGroup.Item>
            </ListGroup>
            <Link to={'create-city/'}><Button variant="success">Add New City</Button></Link>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default Cities

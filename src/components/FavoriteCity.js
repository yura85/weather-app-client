import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

class FavoriteCity extends Component {
  constructor () {
    super()

    this.state = {
      cities: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/cities`)
      .then(res => {
        this.setState({ cities: res.data.cities })
      })
      .catch(console.error)
  }

  componentDidUpdate () {
    axios(`${apiUrl}/cities`)
      .then(res => {
        this.setState({ cities: res.data.cities })
      })
      .catch(console.error)
  }

  destroy = id => {
    axios.delete(`${apiUrl}/cities/${id}`)
      .then(() => this.props.alert('You deleted a city!', 'success'))
      .catch(console.error)
  }

  render () {
    const { user } = this.props
    const { cities } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Check a weather in your favorite city</h3>
          {!user && <p className="m-0">Sign in to edit list</p>}
          {user && <Button variant="success" href="#add-city">Add A City</Button>}
        </div>
        <ListGroup>
          { user && cities.map(city => (
            <ListGroup.Item key={city.id} action>
              <span className="h5 d-block">{city.title}</span>
              <Button variant="danger" onClick={() => this.destroy(city.id)}>Delete City</Button>
            </ListGroup.Item>
          )) }
          { !user && cities.map(city => (
            <ListGroup.Item key={city.id}>
              <span className="h5 d-block">{city.title}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default FavoriteCity

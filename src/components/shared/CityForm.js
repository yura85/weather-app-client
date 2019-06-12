import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CityForm = ({ city, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>City</Form.Label>
      <Form.Control
        name="name"
        placeholder="City ..."
        value={city.name}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlInput2">
      <Form.Label>Country</Form.Label>
      <Form.Control
        name="country"
        placeholder="Country ..."
        value={city.country}
        onChange={handleChange}
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
    <Link to={cancelPath}> <Button>Cancel</Button></Link>
  </Form>

)

export default CityForm

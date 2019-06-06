import React from 'react'
import { Link } from 'react-router-dom'

const CityForm = ({ city, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>City</label>
    <input
      name="name"
      placeholder="City ..."
      value={city.name}
      onChange={handleChange}
    />
    <label>Country</label>
    <input
      name="country"
      placeholder="Country ..."
      value={city.country}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
    <Link to={cancelPath}> <button>Cancel</button></Link>
  </form>

)

export default CityForm

import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/cities'>Cities</NavLink>
    <NavLink to='/create-city'>Add City</NavLink>
  </nav>
)
export default Nav

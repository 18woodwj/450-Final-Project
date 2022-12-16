import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
<<<<<<< HEAD
      <Navbar type="light" theme="primary" expand="sm">
        <NavbarBrand href="/songs"><b>Spotify Helper</b></NavbarBrand>
=======
      <Navbar type="dark" theme="primary" expand="md">
>>>>>>> b4b4ac2681c90477be5a3a8a62eae432ca57c0f6
          <Nav navbar>
          <NavbarBrand href="/songs"><b>Spotify Helper</b></NavbarBrand>
          <NavItem>
            <NavLink active href="/songs">
              Songs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/saved" >
              Saved
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/charts">
              Charts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/wrapped">
              Wrapped
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/friends">
              Friends
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
        )
    }
}

export default MenuBar

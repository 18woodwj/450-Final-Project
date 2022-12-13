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
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">Spotify Helper</NavbarBrand>
          <Nav navbar>
          <NavItem>
            <NavLink active href="/songs">
              Songs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href="/saved" >
              Matches
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/charts">
              Songs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/wrapped">
              Songs
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
        )
    }
}

export default MenuBar

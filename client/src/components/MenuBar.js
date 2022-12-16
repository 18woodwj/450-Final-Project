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
      <Navbar type="light" theme="primary" expand="sm">
        <NavbarBrand href="/songs"><b>Spotify Helper</b></NavbarBrand>
          <Nav navbar>
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

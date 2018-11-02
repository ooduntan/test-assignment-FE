import React, { Component } from "react";
import { MenuItem, Navbar, NavItem, NavDropdown, Nav } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Assignment FrontEnd</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            Home
          </NavItem>
          <NavItem eventKey={2} href="#">
            Our Services
          </NavItem>
          <NavDropdown eventKey={3} title="More" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>About</MenuItem>
            <MenuItem eventKey={3.2}>Mission</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Contact Us</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
export default Header;

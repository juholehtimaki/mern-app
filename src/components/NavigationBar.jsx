import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;
    padding: 10px;
    &:hover {
      color: white;
    }
  }
`;

export const NavigationBar = props => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">MERN react app</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/">Exercises</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/create">Create exercise</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/user">Create user</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

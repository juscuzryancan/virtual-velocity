import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import Login from './Login';

const NavBar = () => {
  useEffect(() => {
    console.log("useEffect activated");
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Virtual Velocity</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="#login">Login</Nav.Link>
        <Nav.Link href="#register">Register</Nav.Link>
        <Nav.Link href="#logout">Logout</Nav.Link>
      </Nav>
      <Login />
    </Navbar>
  );
};

export default NavBar;
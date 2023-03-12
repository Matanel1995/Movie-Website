import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


const Header = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Welcome</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="register">Register</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  };

export default Header
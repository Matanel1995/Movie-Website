import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


const isLogedIn = () => {
  if (sessionStorage.length === 0) {
    return false;
  } else {
    return true;
  }
}

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Welcome {isLogedIn() ? JSON.parse(sessionStorage.getItem('userInfo')).userName : "guest!"}</Navbar.Brand>
        <Nav className="mr-auto">
          {!isLogedIn() ? (
            <>
              <Nav.Link href="register">Register</Nav.Link>
              <Nav.Link href="login">Login</Nav.Link>
            </>
          ):(
            <Nav.Link onClick={() => sessionStorage.removeItem('userInfo')} href="/" >Logout</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header
import React from "react";
import {
  Navbar,
  Nav,
  Row,
  Col,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown
} from "react-bootstrap";
import logo from "../logo.svg";
function Header() {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <img src={logo} alt="cdek Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/News">News</Nav.Link>
              <Nav.Link href="/fee">Service fee</Nav.Link>
              <Nav.Link href="/contact">contact</Nav.Link>
            </Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <Nav className="inline">
              <Nav.Link href="/country"><i className="fas fa-location-arrow"></i>Country</Nav.Link>
              <Nav.Link href="/language">En</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item >ACCOUNT NUMBER #51463 </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/mypage">
                <i className="fas fa-id-badge m-2"></i>My Page
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile">
                <i className="fas fa-id-badge m-2"></i> Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/recipients">
                <i className="fas fa-receipt m-2"></i>Recipients
                </NavDropdown.Item>
                <NavDropdown.Item href="/address">
                <i className="fas fa-address-book m-2"></i>Delivery Address
                </NavDropdown.Item>
                <NavDropdown.Item href="/setting">
                <i className="fas fa-unlock m-2"></i> Change Password
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container className="text-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="/mypage">My Page</Nav.Link>
              <Nav.Link href="/incoming">Incoming Package</Nav.Link>
              <Nav.Link href="/outgoing">OutGoing Package</Nav.Link>
            </Nav>
            <Nav className="inline ml-3">
              <Nav.Link href="/balance"><i className="fas fa-wallet"></i>Balance $75.0</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          </Navbar>
    </header>
  );
}

export default Header;

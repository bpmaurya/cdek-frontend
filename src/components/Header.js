import React from "react";
import { useSelector,useDispatch } from 'react-redux'
import {
  Navbar,
  Nav,
  Row,
  Col,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { logout } from '../actions/userActions'
function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = ()=>{
    console.log('logout');
    dispatch(logout())

  }




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
              <Nav.Link>
                <Link to="/contact">Contact</Link>
              </Nav.Link>
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
              <Nav.Link href="/country">
                <i className="fas fa-location-arrow"></i>Country
              </Nav.Link>
              <Nav.Link href="/language">En</Nav.Link>

             

              {userInfo ? (

              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item >{userInfo.name} #51463 </NavDropdown.Item>
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
                <NavDropdown.Item onClick={logoutHandler} >
                <i className="fas fa-unlock m-2"></i> Log out
                </NavDropdown.Item>
              </NavDropdown>
              ):(
                <Nav.Link>
                <Link to="/login"><Button variant="success">Login</Button>{' '}</Link>
              </Nav.Link>

              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id= 'adminmenue'>
                  <LinkContainer to='/admin/userlist' >
                    <NavDropdown.Item>Users </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/package' >
                    <NavDropdown.Item>incoming package </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/outgoing' >
                    <NavDropdown.Item>OutGoing package </NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              ) }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       
       {userInfo && 
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
              <Nav.Link href="/balance">
                <i className="fas fa-wallet"></i>Balance $75.0
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      }
    </header>
  );
}

export default Header;

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome, FaMapMarkedAlt, FaLandmark, FaCloudSun, FaStar } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
  
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Time and Date on the left */}
          <Navbar.Text className="mr-auto">
            {`Current Time: ${currentTime} | Current Date: ${currentDate}`}
          </Navbar.Text>
  
          {/* Icons on the right */}
          <Nav>
            <LinkContainer to="/home">
              <Nav.Link>
                <FaHome />
              </Nav.Link>
            </LinkContainer>
  
            <LinkContainer to="/map">
              <Nav.Link>
                <FaMapMarkedAlt />
              </Nav.Link>
            </LinkContainer>
  
            <LinkContainer to="/tourism">
              <Nav.Link>
                <FaLandmark />
              </Nav.Link>
            </LinkContainer>
  
            <LinkContainer to="/weather">
              <Nav.Link>
                <FaCloudSun />
              </Nav.Link>
            </LinkContainer>
  
            <LinkContainer to="/review">
              <Nav.Link>
                <FaStar />
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default NavBar;
    

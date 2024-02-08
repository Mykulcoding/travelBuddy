import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome, FaMapMarkedAlt, FaLandmark, FaCloudSun, FaStar, FaClock } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import dayjs from 'dayjs';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));
  const [currentDate, setCurrentDate] = useState(dayjs().format('MMMM DD, YYYY'));

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(dayjs().format('HH:mm'));
      setCurrentDate(dayjs().format('MMMM DD, YYYY'));
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
      <Navbar.Collapse id="basic-navbar-nav" className={`justify-content-between ${expanded ? 'show' : ''}`}>
        {/* Time and Date on the left */}
        <Navbar.Text className="mr-auto">
          <FaClock className="mr-1" />
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

    

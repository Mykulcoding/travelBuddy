import { Navbar, Nav } from 'react-bootstrap';
import { FaClock, FaHome, FaMapMarkedAlt, FaLandmark, FaCloudSun, FaStar } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import '../assets/components.css'
import '../assets/Navbar.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded(!expanded);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Update time and date every second
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm'));
      setCurrentDate(dayjs().format('MMMM DD, YYYY'));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means it runs once on mount

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

export default Header;
    

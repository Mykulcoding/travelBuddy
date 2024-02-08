import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        {/* Images on the left */}
        <Col xs={12} md={6}>
          <img
            src="" // add image URL
            alt="Left Image"
            className="img-fluid"
          />
        </Col>

        {/* Travel Buddy and Text on the right */}
        <Col xs={12} md={6}>
          <div className="text-center">
            <h1>Travel Buddy</h1>
            <p>
              Welcome to Travel Buddy! Your go-to companion for planning and exploring
              amazing destinations around the world.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

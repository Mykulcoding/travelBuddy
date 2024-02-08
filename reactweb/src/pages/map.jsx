import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Container, Row, Col } from 'react-bootstrap';

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const [center, setCenter] = useState(null);

  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setCenter({ lat: lat(), lng: lng() });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <LoadScript
            googleMapsApiKey="" //add Google-maps API
            libraries={['places']}
          >
            <Autocomplete
              onLoad={(autocomplete) => {
                // Set the bounds to restrict the search
                autocomplete.setBounds({ east: -122.375, west: -123.375, north: 37.875, south: 37.375 });
              }}
              onPlaceChanged={() => handlePlaceSelect(autocomplete.getPlace())}
            >
              <input
                type="text"
                placeholder="Search for a location..."
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid transparent',
                  width: '240px',
                  height: '32px',
                  padding: '0 12px',
                  borderRadius: '3px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px',
                  outline: 'none',
                  textOverflow: 'ellipses',
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-120px',
                }}
              />
            </Autocomplete>
            {center && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
              >
                {/* Marker for the selected location */}
                <Marker position={center} />
              </GoogleMap>
            )}
          </LoadScript>
        </Col>
      </Row>
    </Container>
  );
};

export default Map;

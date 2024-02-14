import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from '@react-google-maps/api';
import './Map.css'
import '../../assets/maps.jpg'

// Component to display directions list
const DirectionsList = ({ directions }) => {
  return (
    <div style={{ position: 'absolute', left: 10, top: 180, width: '250px',  color: 'red'}}>
      <div>
        <h2>Directions</h2>
        <div className=''>
        <ol>
          {directions &&
            directions.routes[0].legs[0].steps.map((step, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: step.instructions }} />
            ))}
        </ol>
        </div>
      </div>
    </div>
  );
};

const Map = () => {
  const mapContainerStyle = {
    width: '70%',
    height: '500px',
    float: 'right',
  };

  const autocompleteStyle = {
    position: 'absolute',
    left: 10,
    top: 80,
    zIndex: 1,
  };

  const buttonStyle = {
    position: 'absolute',
    left: 10,
    top: 130,
    zIndex: 1,
  };

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

  // Callback when origin location is selected
  const handleOriginSelect = () => {
    const place = originAutocomplete.getPlace();
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setOrigin({ lat: lat(), lng: lng() });
    }
  };

  // Callback when destination location is selected
  const handleDestinationSelect = () => {
    const place = destinationAutocomplete.getPlace();
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setDestination({ lat: lat(), lng: lng() });
    }
  };

  // Autocomplete load callback for origin
  const onLoadOriginAutocomplete = (autocomplete) => {
    setOriginAutocomplete(autocomplete);
  };

  // Autocomplete load callback for destination
  const onLoadDestinationAutocomplete = (autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  // Callback for Directions Service result
  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setDirections(result);
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  };

  // Function to request directions
  const requestDirections = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsOptions = {
        origin,
        destination,
        travelMode: 'DRIVING',
      };
      directionsService.route(directionsOptions, directionsCallback);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAf7DnPpFx3bngUYJa427O5MqVsmWQonmY"
      libraries={['places']}
    >
      
      {/* Autocomplete for Origin */}
      <div style={{ ...autocompleteStyle, top: 50 }}>
        <Autocomplete
          onLoad={onLoadOriginAutocomplete}
          onPlaceChanged={handleOriginSelect}
        >
          <input
            type="text"
            placeholder="Enter your current location..."
            style={{ width: '240px', padding: '8px' }}
          />
        </Autocomplete>
      </div>

      {/* Autocomplete for Destination */}
      <div style={{ ...autocompleteStyle, top: 100 }}>
        <Autocomplete
          onLoad={onLoadDestinationAutocomplete}
          onPlaceChanged={handleDestinationSelect}
        >
          <input
            type="text"
            placeholder="Enter your destination..."
            style={{ width: '240px', padding: '8px' }}
          />
        </Autocomplete>
      </div>

      {/* Button to Request Directions */}
      <div style={buttonStyle}>
        <button onClick={requestDirections}>Get Directions</button>
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={7}
      >
        {/* Directions Renderer */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Directions List */}
      <DirectionsList directions={directions} />
    </LoadScript>
  );
};

export default Map;

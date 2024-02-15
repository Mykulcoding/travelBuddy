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
    <div className="directions">
        <h2>Directions</h2>
        <ol className='list'>
          {directions &&
            directions.routes[0].legs[0].steps.map((step, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: step.instructions }} />
            ))}
        </ol>
    </div>
  );
};

const Map = () => {
  const mapContainerStyle = {
    height: '500px',
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
      <div className="map-container">
        <div className="form">
          {/* Autocomplete for Origin */}
        
            <Autocomplete
              className="input-container"
              onLoad={onLoadOriginAutocomplete}
              onPlaceChanged={handleOriginSelect}
            >
              <input
                type="text"
                placeholder="Enter your current location..."
                className="input-field"
              />
            </Autocomplete>
         

          {/* Autocomplete for Destination */}
          
            <Autocomplete
              className="input-container"
              onLoad={onLoadDestinationAutocomplete}
              onPlaceChanged={handleDestinationSelect}
            >
              <input
                type="text"
                placeholder="Enter your destination..."
                className="input-field"
              />
            </Autocomplete>
          

          {/* Button to Request Directions */}
          <div class="direction-btn">
            <button className='btn' onClick={requestDirections}>Get Directions</button>
          </div>
          
           {/* Directions List */}
           {directions && (
            <DirectionsList directions={directions} />
           )}
            
        </div>
        <div className="map-area">
          {/* Google Map */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            className="map"
            center={{ lat: 51.509865, lng: -0.118092 }}
            zoom={7}
          >
            {/* Directions Renderer */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    
    </LoadScript>
  );
};

export default Map;

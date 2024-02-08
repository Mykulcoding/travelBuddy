import React, { useState, useEffect } from 'react';

const Tourism = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // add Geoapify API key
          `https://api.geoapify.com/v1/places?categories=Tourist%20Attractions&apiKey=YOUR_API_KEY`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch tourist attractions: ${response.statusText}`);
        }

        const data = await response.json();
        setTouristAttractions(data.features);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tourist attractions:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Tourist Attractions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {touristAttractions.map((attraction) => (
            <li key={attraction.properties.id}>
              {attraction.properties.name} - {attraction.properties.formattedAddress}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tourism;

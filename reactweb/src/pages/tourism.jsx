import React, { useState, useEffect } from "react";

const Tourism = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "764e391db4bf49b1881adcbf7f364eda"; // DDM: Added Geoapify API key
        const response = await fetch(
          // Add Geoapify API key
          `https://api.geoapify.com/v1/places?categories=Tourist%20Attractions&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch tourist attractions: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTouristAttractions(data.features);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tourist attractions:", error);
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
      ) : touristAttractions.length === 0 ? ( // DDM: Added condition to handle no tourist attractions found
        <p>No tourist attractions found.</p>
      ) : (
        <ul>
          {touristAttractions.map((attraction) => (
            <li key={attraction.properties.id}>
              {/* DDM: Improved display of tourist attraction details */}
              <div>
                <strong>{attraction.properties.name}</strong>
              </div>
              <div>{attraction.properties.formattedAddress}</div>
              <div>
                {/* DDM: Added condition to display website if available */}
                {attraction.properties.url && (
                  <a
                    href={attraction.properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tourism;

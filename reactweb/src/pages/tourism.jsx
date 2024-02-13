import React, { useState, useEffect } from "react";

const Tourism = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [sortType, setSortType] = useState("name");

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
        setFilteredAttractions(data.features); // DDM: Set filtered attractions initially
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tourist attractions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // DDM: Function to handle sorting
  const handleSort = (type) => {
    setSortType(type);
    const sortedAttractions = [...filteredAttractions].sort((a, b) => {
      if (type === "name") {
        return a.properties.name.localeCompare(b.properties.name);
      } else if (type === "distance") {
        return a.properties.distance - b.properties.distance;
      } else if (type === "rating") {
        return b.properties.rating - a.properties.rating;
      }
      return 0;
    });
    setFilteredAttractions(sortedAttractions);
  };

  // DDM: Function to handle filtering
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = touristAttractions.filter((attraction) =>
      attraction.properties.name.toLowerCase().includes(keyword)
    );
    setFilteredAttractions(filtered);
  };

  return (
    <div>
      <h2>Tourist Attractions</h2>
      {/* DDM: Added filtering and sorting controls */}
      <div>
        <label htmlFor="filter">Filter by name:</label>
        <input type="text" id="filter" onChange={handleFilter} />
      </div>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={(e) => handleSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="distance">Distance</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredAttractions.length === 0 ? (
        <p>No tourist attractions found.</p>
      ) : (
        <ul>
          {filteredAttractions.map((attraction) => (
            <li key={attraction.properties.id}>
              <div>
                <strong>{attraction.properties.name}</strong>
              </div>
              <div>{attraction.properties.formattedAddress}</div>
              <div>
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

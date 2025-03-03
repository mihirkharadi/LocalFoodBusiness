import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlignRight, LocateFixed } from "lucide-react"; // Import location icon

const OPENCAGE_API_KEY = "78068595eb15458a84ee1542b889f513"; // Replace with your OpenCage API key

const App = ({sendLocation}) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          // Reverse Geocode to get Address
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );

            if (response.data.results.length > 0) {
              setAddress(response.data.results[0].formatted);
            }

            sendLocation({ latitude,longitude, address });
          } catch (error) {
            console.error("Error fetching address:", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Location permission denied.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  };

  // Convert Address to Coordinates
  const handleGeocode = async () => {
    if (!address) {
      alert("Please enter an address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setCoordinates({ lat, lng });
      } else {
        alert("Address not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Error fetching location");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ textAlign: "center"}}>
    

      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address or use current location"
          style={{ padding: "8px", width: "250px" }}
        />
        <button onClick={handleGeocode} style={{ padding: "8px 12px" }}>Get Coordinates</button>
       
      </div> */}

      <div className="grid grid-cols-2 border rounded place-items-center mb-3">
      <h2>{address ? address : "Use your Location"}</h2>

      <button onClick={getCurrentLocation} style={{ padding: "8px 12px", border: "none", background: "transparent" }}>
          <LocateFixed size={24} color="blue" />
        </button>
      </div>

      

      {/* {coordinates && (
        <div>
          <h3>Latitude: {coordinates.lat}</h3>
          <h3>Longitude: {coordinates.lng}</h3>
        </div>
      )} */}

     
    </div>




  );
};

export default App;

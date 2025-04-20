import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";  
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import DraggableMarker from "./draggableMarker";

const center = new LatLng(45.048775, 20.063703);

function MapClickHandler({ setCoordinates }) {
  useMapEvent("click", (e) => {
    setCoordinates(e.latlng);
  });

  return null;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    description: "",
    location: "",
  });
  const [latitude, setLatitude] = useState(center.lat);
  const [longitude, setLongitude] = useState(center.lng);
  const [bunnyImage, setBunnyImage] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "bunnyImage" && files.length > 0) {
      const file = files[0];
      if (!validateFile(file)) {
        alert("Please upload a valid image file (PNG, JPG, JPEG, GIF).");
        event.target.value = ""; 
        return;
      }
      setBunnyImage(file);
      return;
    }

    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleMapClick = (latLng) => {
    setLatitude(latLng.lat);
    setLongitude(latLng.lng);
    setMarkerPosition(latLng); 
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    return validTypes.includes(file.type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... your existing submit logic ...
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Create a New Post</h2>
        <form className="form">
          
          <div className="input-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={post.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Bunny Image</label>
            <input
              type="file"
              onChange={handleChange}
              name="bunnyImage"
              accept="image/*"
            />
          </div>

          <div className="input-group">
            <label>Latitude</label>
            <input
              type="text"
              value={latitude}
              readOnly
            />
          </div>

          <div className="input-group">
            <label>Longitude</label>
            <input
              type="text"
              value={longitude}
              readOnly
            />
          </div>

          <div className="input-group">
            <label>Location on Map</label>
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler setCoordinates={handleMapClick} />
              <DraggableMarker
                position={markerPosition}
                setPosition={(newPosition) => {
                  setLatitude(newPosition.lat);
                  setLongitude(newPosition.lng);
                  setMarkerPosition(newPosition);
                }}
                onClick={() => console.log("Marker clicked!")}
                removeMarker={() => console.log("Marker removed!")}
              />
            </MapContainer>
          </div>

          <div className="button-group">
            <button type="submit">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
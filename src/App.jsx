import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BookingsPage from "./components/MyBookingsPage";
import { Routes, Route } from "react-router-dom";
import SingleProperty from "./components/SingleProperty";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import HomePage from "./components/HomePage";
import FilteredPropertiesPage from "./components/FilteredPropertiesPage";

function App() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 4,
    name: "Frank White",
  });

  const handleSaveProperty = (property) => {
    setSavedProperties((prev) => [...prev, property]);
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Bookings page */}
        <Route
          path="/bookings"
          element={<BookingsPage currentUser={currentUser} />}
        />

        {/* single property details */}
        <Route
          path="/property/:id"
          element={
            <SingleProperty
              saveProperty={handleSaveProperty}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} />}
        />
        <Route path="/profile/:userId/edit" element={<EditProfile />} />

        <Route
          path="/filtered-properties"
          element={<FilteredPropertiesPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

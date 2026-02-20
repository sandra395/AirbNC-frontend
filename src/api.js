import axios from "axios";

const API_BASE = "https://portfolio-xxtl.onrender.com/api";

// ---------------- PROPERTIES ----------------
export const getProperties = async () => {
  try {
    const res = await axios.get(`${API_BASE}/properties`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    return [];
  }
};

export const getProperty = async (propertyId) => {
  try {
    const res = await axios.get(`${API_BASE}/properties/${propertyId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch property ${propertyId}:`, err);
    return {};
  }
};

export const getUserProperties = async (ownerId) => {
  try {
    const res = await axios.get(`${API_BASE}/properties?host=${ownerId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch user properties:", err);
    return { properties: [] };
  }
};

// ---------------- BOOKINGS ----------------
export const getUserBookings = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/users/${userId}/bookings`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch bookings for user ${userId}:`, err);
    return { bookings: [] };
  }
};

export const getPropertyBookings = async (propertyId) => {
  try {
    const res = await axios.get(
      `${API_BASE}/properties/${propertyId}/bookings`
    );
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch bookings for property ${propertyId}:`, err);
    return { bookings: [] };
  }
};

export const createBooking = async (propertyId, bookingData) => {
  try {
    const res = await axios.post(
      `${API_BASE}/properties/${propertyId}/booking`,
      bookingData
    );
    return res.data;
  } catch (err) {
    console.error(`Failed to create booking for property ${propertyId}:`, err);
    return null;
  }
};

// ---------------- REVIEWS ----------------
export const getPropertyReviews = async (propertyId) => {
  try {
    const res = await axios.get(`${API_BASE}/properties/${propertyId}/reviews`);
    return res.data.reviews || [];
  } catch (err) {
    console.error(`Failed to fetch reviews for property ${propertyId}:`, err);
    return [];
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const res = await axios.delete(`${API_BASE}/reviews/${reviewId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete review ${reviewId}:`, err);
    return null;
  }
};

export const postReview = async (propertyId, reviewData) => {
  try {
    const res = await axios.post(
      `${API_BASE}/properties/${propertyId}/reviews`,
      reviewData
    );
    return res.data;
  } catch (err) {
    console.error(`Failed to post review for property ${propertyId}:`, err);
    return null;
  }
};

export const getUserReviews = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/users/${userId}/reviews`);
    return res.data.reviews || [];
  } catch (err) {
    console.error(`Failed to fetch reviews for user ${userId}:`, err);
    return [];
  }
};

// ---------------- USER PROFILE ----------------
export const updateUser = async (userId, updatedData) => {
  try {
    const res = await axios.patch(`${API_BASE}/users/${userId}`, updatedData);
    return res.data;
  } catch (err) {
    console.error(`Failed to update user ${userId}:`, err);
    return null;
  }
};

export const getUser = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/users/${userId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch user ${userId}:`, err);
    return {};
  }
};

// ---------------- FAVOURITES ----------------
export const toggleFavourite = async (propertyId, guestId) => {
  try {
    const res = await axios.post(
      `${API_BASE}/properties/${propertyId}/favourite`,
      { guest_id: guestId }
    );
    return res.data;
  } catch (err) {
    console.error(
      `Failed to toggle favourite for property ${propertyId}:`,
      err
    );
    return null;
  }
};

export const getUserFavourites = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/users/${userId}/favourites`);
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch favourites for user ${userId}:`, err);
    return [];
  }
};

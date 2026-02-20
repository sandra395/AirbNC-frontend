import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import editProfile from "../assets/edit.png";
import {
  getUser,
  getUserProperties,
  getPropertyBookings,
  getUserBookings,
  getUserReviews,
  deleteReview,
} from "../api";

const Profile = ({ currentUser }) => {
  const [ownProperties, setOwnProperties] = useState([]);
  const [propertyBookings, setPropertyBookings] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Fetch user info
        const userData = await getUser(currentUser.id);
        setUser(userData.user || currentUser);

        // Fetch user's reviews
        let reviewsData = await getUserReviews(currentUser.id);
        setUserReviews(reviewsData || []);

        // Fetch user's own properties
        const propertiesData = await getUserProperties(currentUser.id);
        const properties = propertiesData?.properties || [];
        setOwnProperties(properties);

        // Fetch bookings for each property
        const bookingsMap = {};
        await Promise.all(
          properties.map(async (property) => {
            const bookingData = await getPropertyBookings(property.property_id);
            bookingsMap[property.property_id] = bookingData?.bookings || [];
          })
        );
        setPropertyBookings(bookingsMap);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const handleDeleteReview = async (reviewId) => {
    // Optimistically remove from UI
    const updatedReviews = userReviews.filter((r) => r.review_id !== reviewId);
    setUserReviews(updatedReviews);

    try {
      await deleteReview(reviewId);
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Could not delete review");
      // Restore the review if deletion failed
      setUserReviews(userReviews);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-page-container">
      <h2 className="profile-name">
        {user.first_name} {user.surname}{" "}
        <Link to={`/profile/${user.id}/edit`}>
          <img
            src={editProfile}
            alt="Edit profile"
            className="profile-edit-icon"
          />
        </Link>
      </h2>

      {user.avatar && (
        <img
          src={user.avatar}
          alt={`${user.first_name} avatar`}
          className="profile-avatar"
        />
      )}

      <p>
        <strong>Email:</strong> {user.email || currentUser.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone_number || currentUser.phone_number}
      </p>

      {/* My Bookings Section */}
      <div className="profile-section-card">
        <h3>My Bookings</h3>
        <p>View and manage your travel bookings.</p>
        <Link to="/bookings" className="bookings-link">
          <button className="profile-bookings-btn">📅 View My Bookings</button>
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="profile-section-card">
        <h3>My Reviews</h3>
        <p>Reviews you've written for properties.</p>
        {userReviews.length === 0 ? (
          <p>
            <em>You haven't written any reviews yet.</em>
          </p>
        ) : (
          <div className="profile-reviews-list">
            {userReviews.map((review) => (
              <div key={review.review_id} className="profile-review-item">
                <div className="review-header">
                  <h4>{review.property_name || "Property"}</h4>
                  <span className="review-rating">⭐ {review.rating}/5</span>
                </div>
                <p className="review-comment">"{review.comment}"</p>
                <div className="review-footer">
                  <span className="review-date">
                    {review.created_at
                      ? new Date(review.created_at).toLocaleDateString()
                      : ""}
                  </span>
                  {review.property_id && (
                    <Link
                      to={`/property/${review.property_id}`}
                      className="view-property-link"
                    >
                      View Property
                    </Link>
                  )}
                </div>
                <div className="review-actions">
                  <button
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(review.review_id)}
                    title="Delete review"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

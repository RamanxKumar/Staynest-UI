import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  });

  const emptyBookingInfo = {
    bookingId: " ",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };

  // const isLoggedIn = localStorage.getItem("token");
  // const userRole = localStorage.getItem("userRole");

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message); // or .data.message if using a full JSON error response
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBookingCancellation = async (bookingId) => {
    if (!bookingInfo.bookingId) {
      setError("Booking ID is missing. Cannot cancel booking.");
      return;
    }

    try {
      await cancelBooking(bookingInfo.bookingId); // ID must be a valid number
      setIsDeleted(true);
      setSuccessMessage("✅ Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError("Error cancelling booking: " + error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 1500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">🔍 Find My Booking</h2>
            <p className="text-muted">
              Enter your confirmation code to retrieve booking details.
            </p>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter booking confirmation code"
                value={confirmationCode}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="btn btn-primary">
                Find Booking
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Finding your booking...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {successMessage && (
            <div className="alert alert-success text-center">
              {successMessage}
            </div>
          )}

          {bookingInfo.bookingConfirmationCode && !isDeleted && (
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <h5 className="card-title text-success fw-semibold mb-3">
                  ✅ Booking Information
                </h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <strong>Confirmation Code:</strong>{" "}
                    {bookingInfo.bookingConfirmationCode}
                  </li>
                  <li className="list-group-item">
                    <strong>Room Type:</strong> {bookingInfo.room.roomType}
                  </li>
                  <li className="list-group-item">
                    <strong>Booking ID</strong> {bookingInfo.bookingId}
                  </li>

                  <li className="list-group-item">
                    <strong>Booking Room Id:</strong> {bookingInfo.room.id}
                  </li>
                  <li className="list-group-item">
                    <strong>Room Number:</strong> {bookingInfo.room.id}
                  </li>
                  <li className="list-group-item">
                    <strong>Check-in:</strong>{" "}
                    {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}
                  </li>
                  <li className="list-group-item">
                    <strong>Check-out:</strong>{" "}
                    {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}
                  </li>
                  <li className="list-group-item">
                    <strong>Guest Name:</strong> {bookingInfo.guestFullName}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {bookingInfo.guestEmail}
                  </li>
                  <li className="list-group-item">
                    <strong>Adults:</strong> {bookingInfo.numOfAdults},{" "}
                    <strong>Children:</strong> {bookingInfo.numOfChildren}
                  </li>
                  <li className="list-group-item">
                    <strong>Total Guests:</strong> {bookingInfo.totalNumOfGuest}
                  </li>
                </ul>

                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-danger w-20"
                    onClick={() =>
                      handleBookingCancellation(bookingInfo.bookingId)
                    }
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindBooking;

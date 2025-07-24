import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success", {
        state: { message: "Booking Confirmed!" },
      });
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <Card className="shadow-sm p-4 border-0 rounded-4 h-100">
      <h4 className="text-center fw-bold text-primary mb-4">
        🛏️ Reservation Summary
      </h4>

      <div className="mb-3">
        <p className="mb-1">
          <strong>Name:</strong> {booking.guestFullName}
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {booking.guestEmail}
        </p>
        <p className="mb-1">
          <strong>Check-in:</strong> {checkInDate.format("MMM Do YYYY")}
        </p>
        <p className="mb-1">
          <strong>Check-out:</strong> {checkOutDate.format("MMM Do YYYY")}
        </p>
        <p className="mb-1">
          <strong>Days Booked:</strong> {numberOfDays}
        </p>
      </div>

      <div className="mb-3">
        <h6 className="text-success">👨‍👩‍👧 Guests</h6>
        <p className="mb-1">
          <strong>Adults:</strong> {booking.numOfAdults}
        </p>
        <p className="mb-1">
          <strong>Children:</strong> {booking.numOfChildren}
        </p>
      </div>

      {payment > 0 ? (
        <>
          <p className="fs-5 mt-3">
            <strong>Total Payment:</strong>{" "}
            <span className="text-success">${payment}</span>
          </p>

          {isFormValid && !isBookingConfirmed ? (
            <Button
              variant="success"
              className="w-100 fw-bold mt-3"
              onClick={handleConfirmBooking}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processing Payment...
                </>
              ) : (
                "Confirm Booking & Pay"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center mt-4">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger mt-3">
          ❌ Check-out date must be after check-in date.
        </p>
      )}
    </Card>
  );
};

export default BookingSummary;

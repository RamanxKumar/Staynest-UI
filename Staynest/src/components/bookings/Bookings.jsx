import React, { useState, useEffect } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";
import { Container, Spinner, Alert, Card } from "react-bootstrap";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="bg-light min-vh-100 py-5">
      <Container>
        <Header title="🧾 Existing Bookings" style={{ marginBottom: "2rem" }} />

        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            {error}
          </Alert>
        )}

        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" role="status" variant="primary" />
            <span className="ms-3 fs-5">Loading existing bookings...</span>
          </div>
        ) : (
          <Card className="shadow-sm p-4 rounded-4 border-0">
            <BookingsTable
              bookingInfo={bookingInfo}
              handleBookingCancellation={handleBookingCancellation}
            />
          </Card>
        )}
      </Container>
    </section>
  );
};

export default Bookings;

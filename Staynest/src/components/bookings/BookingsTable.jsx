import React, { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  const filterBookings = (startDate, endDate) => {
    if (startDate && endDate) {
      const filtered = bookingInfo.filter((booking) => {
        const checkIn = parseISO(booking.checkInDate);
        const checkOut = parseISO(booking.checkOutDate);
        return (
          checkIn >= startDate &&
          checkOut <= endDate &&
          checkOut > startDate
        );
      });
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookingInfo);
    }
  };

  return (
    <section className="mt-4">
      <div className="mb-4 shadow-sm p-3 rounded bg-white">
        <h5 className="mb-3 fw-semibold">📅 Filter Bookings by Date Range</h5>
        <DateSlider
          onDateChange={filterBookings}
          onFilterChange={filterBookings}
        />
      </div>

      <div className="table-responsive shadow-sm rounded bg-white p-3">
        <table className="table table-hover align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>S/N</th>
              <th>Booking ID</th>
              <th>Room ID</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Guest Name</th>
              <th>Guest Email</th>
              <th>Adults</th>
              <th>Children</th>
              <th>Total Guests</th>
              <th>Confirmation Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{index + 1}</td>
                  <td>{booking.bookingId}</td>
                  <td>{booking.room.id}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {booking.room.roomType}
                    </span>
                  </td>
                  <td>{booking.checkInDate}</td>
                  <td>{booking.checkOutDate}</td>
                  <td>{booking.guestFullName}</td>
                  <td>{booking.guestEmail}</td>
                  <td>
                    <span className="badge bg-primary">
                      {booking.numOfAdults}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {booking.numOfChildren}
                    </span>
                  </td>
                  <td>{booking.totalNumOfGuest}</td>
                  <td>
                    <span className="badge bg-success">
                      {booking.bookingConfirmationCode}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleBookingCancellation(booking.bookingId)
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-muted py-4">
                  📭 <strong>No bookings found for the selected date range</strong>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BookingsTable;

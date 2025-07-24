import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <div className="container py-5">
      <Header title="Booking Status" />
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4 p-4 text-center">
            {message ? (
              <>
                <div className="alert alert-success fw-semibold fs-5">
                  ✅ Booking Confirmed!
                </div>
                
                <h4 className="fw-bold text-primary border rounded-pill bg-light py-2 px-4 d-inline-block">
                  {message}
                </h4>
                <p className="mt-4 text-muted">Please save this for your reference.</p>
                <Link to="/" className="btn btn-success mt-3 px-4 py-2">
                  Go to Home
                </Link>
              </>
            ) : (
              <>
                <div className="alert alert-danger fw-semibold fs-5">
                  ❌ Booking Failed!
                </div>
                <p className="lead text-danger">{error}</p>
                <Link to="/" className="btn btn-outline-danger mt-3 px-4 py-2">
                  Try Again / Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

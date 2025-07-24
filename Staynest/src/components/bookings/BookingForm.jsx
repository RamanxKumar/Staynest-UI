import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  FormControl
} from "react-bootstrap";
import { getRoomById, bookRoom } from "../utils/ApiFunctions";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [roomPrice, setRoomPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await getRoomById(roomId);
        setRoomPrice(response.roomPrice);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const calculatePayment = () => {
    const checkIn = moment(booking.checkInDate);
    const checkOut = moment(booking.checkOutDate);
    const days = checkOut.diff(checkIn, "days");
    return days * roomPrice;
  };

  const isGuestCountValid = () => {
    const adults = parseInt(booking.numOfAdults);
    const children = parseInt(booking.numOfChildren);
    return adults >= 1 && (adults + children) >= 1;
  };

  const isCheckOutDateValid = () => {
    const checkIn = moment(booking.checkInDate);
    const checkOut = moment(booking.checkOutDate);
    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage("Check-out date must be after check-in date.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity() || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      navigate("/booking-success", {
        state: { message: confirmationCode },
      });
    } catch (error) {
      navigate("/booking-success", {
        state: { error: error.message },
      });
    }
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="g-4">
          <Col lg={isSubmitted ? 7 : 12}>
            <Card className="p-4 shadow-sm border-0 rounded-4">
              <h3 className="text-center fw-bold text-primary mb-4">Reserve Your Room</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="guestFullName">
                      <Form.Label className="fw-semibold">Full Name</Form.Label>
                      <FormControl
                        type="text"
                        required
                        placeholder="Enter full name"
                        name="guestFullName"
                        value={booking.guestFullName}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="guestEmail">
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <FormControl
                        type="email"
                        required
                        placeholder="Enter email"
                        name="guestEmail"
                        value={booking.guestEmail}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="checkInDate">
                      <Form.Label className="fw-semibold">Check-in Date</Form.Label>
                      <FormControl
                        type="date"
                        required
                        name="checkInDate"
                        min={moment().format("YYYY-MM-DD")}
                        value={booking.checkInDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Select check-in date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="checkOutDate">
                      <Form.Label className="fw-semibold">Check-out Date</Form.Label>
                      <FormControl
                        type="date"
                        required
                        name="checkOutDate"
                        min={moment().format("YYYY-MM-DD")}
                        value={booking.checkOutDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Select check-out date.
                      </Form.Control.Feedback>
                      {errorMessage && (
                        <div className="text-danger mt-1">{errorMessage}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="numOfAdults">
                      <Form.Label className="fw-semibold">Adults</Form.Label>
                      <FormControl
                        type="number"
                        required
                        min={1}
                        name="numOfAdults"
                        value={booking.numOfAdults}
                        onChange={handleInputChange}
                        placeholder="e.g. 2"
                      />
                      <Form.Control.Feedback type="invalid">
                        Must include at least 1 adult.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="numOfChildren">
                      <Form.Label className="fw-semibold">Children</Form.Label>
                      <FormControl
                        type="number"
                        min={0}
                        required
                        name="numOfChildren"
                        value={booking.numOfChildren}
                        onChange={handleInputChange}
                        placeholder="e.g. 1"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid mt-4">
                  <Button type="submit" variant="primary" size="lg">
                    Continue to Summary
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>

          {isSubmitted && (
            <Col lg={5}>
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                onConfirm={handleFormSubmit}
                isFormValid={validated}
              />
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default BookingForm;

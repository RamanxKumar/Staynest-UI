import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Card, Spinner } from "react-bootstrap";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const checkInMoment = moment(searchQuery.checkInDate);
    const checkOutMoment = moment(searchQuery.checkOutDate);

    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setErrorMessage("Please enter valid dates");
      return;
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setHasSearched(true);

    const formattedCheckIn = checkInMoment.format("YYYY-MM-DD");
    const formattedCheckOut = checkOutMoment.format("YYYY-MM-DD");

    getAvailableRooms(formattedCheckIn, formattedCheckOut, searchQuery.roomType)
      .then((response) => {
        setAvailableRooms(response);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((error) => {
        console.error("Error fetching available rooms:", error);
        setErrorMessage("Something went wrong while searching for rooms.");
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    setErrorMessage("");
  };

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
    setErrorMessage("");
    setHasSearched(false);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0 rounded-4 p-4 bg-light">
        <h2 className="text-center mb-4 text-primary fw-bold">
          Find Your Perfect Room
        </h2>
        <Form onSubmit={handleSearch}>
          <Row className="g-3 justify-content-center">
            <Col xs={12} md={3}>
              <Form.Group controlId="checkInDate">
                <Form.Label className="fw-semibold">Check-in Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  className="rounded-pill shadow-sm"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="checkOutDate">
                <Form.Label className="fw-semibold">Check-out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  className="rounded-pill shadow-sm"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={searchQuery.checkInDate || moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="roomType">
                <Form.Label className="fw-semibold">Room Type</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    name="roomType"
                    placeholder="e.g., Deluxe"
                    className="rounded-pill shadow-sm me-2"
                    value={searchQuery.roomType}
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-pill shadow-sm"
                  >
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {errorMessage && <p className="text-danger mt-3 text-center">{errorMessage}</p>}

        <div className="text-center mt-4">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" className="me-2" />
              <span className="fw-bold text-muted">Finding available rooms...</span>
            </div>
          ) : hasSearched && availableRooms.length > 0 ? (
            <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
          ) : hasSearched && availableRooms.length === 0 ? (
            <p className="mt-4 fw-semibold text-danger">
              No rooms available for the selected dates and room type.
            </p>
          ) : null}
        </div>
      </Card>
    </Container>
  );
};

export default RoomSearch;

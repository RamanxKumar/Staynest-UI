import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const today = new Date();

  return (
    <footer className="bg-light text-dark border-top shadow-sm pt-4 pb-3 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <FaHotel className="text-primary me-2 fs-4" />
              <Link to="/" style={{ textDecoration: "none" }}>
                <h5 className="fw-bold mb-0">Staynest Hotel</h5>
              </Link>
            </div>
            <p className="small mt-1 mb-0 text-muted">
              Where comfort meets elegance. Book your next stay with confidence.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 small text-muted">
              &copy; {today.getFullYear()} Staynest Hotel
              <br />
              All rights reserved
              <br />
              (Raman Kumar)
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

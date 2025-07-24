import React from "react"
import { Link } from "react-router-dom"
import { Card, Container, Row, Col } from "react-bootstrap"
import { FaBed, FaCalendarCheck, FaHotel } from "react-icons/fa"

const Admin = () => {
	return (
		<section className="bg-light py-5 min-vh-100">
			<Container>
				<div className="text-center mb-5">
					<h2 className="fw-bold text-primary">Welcome to Admin Panel</h2>
					<p className="text-muted">Manage your hotel with ease and efficiency.</p>
					<hr className="w-25 mx-auto" />
				</div>

				{/* Manage Rooms */}
				<Row className="justify-content-center mb-4">
					<Col xs={12} md={8} lg={6}>
						<Link to="/add-rooms" className="text-decoration-none">
							<Card className="h-100 shadow-sm border-0 rounded-4 text-center p-4 hover-scale">
								<FaBed className="fs-1 text-primary mb-3" />
								<Card.Title className="fw-bold">Manage Rooms</Card.Title>
								<Card.Text className="text-muted small">
									Add, update or remove available hotel rooms.
								</Card.Text>
							</Card>
						</Link>
					</Col>
				</Row>

				{/* Manage Bookings */}
				<Row className="justify-content-center mb-4">
					<Col xs={12} md={8} lg={6}>
						<Link to="/existing-bookings" className="text-decoration-none">
							<Card className="h-100 shadow-sm border-0 rounded-4 text-center p-4 hover-scale">
								<FaCalendarCheck className="fs-1 text-success mb-3" />
								<Card.Title className="fw-bold">Manage Bookings</Card.Title>
								<Card.Text className="text-muted small">
									View, confirm or cancel guest reservations.
								</Card.Text>
							</Card>
						</Link>
					</Col>
				</Row>

				{/* View All Rooms */}
				<Row className="justify-content-center">
					<Col xs={12} md={8} lg={6}>
						<Link to="/existing-rooms" className="text-decoration-none">
							<Card className="h-100 shadow-sm border-0 rounded-4 text-center p-4 hover-scale">
								<FaHotel className="fs-1 text-warning mb-3" />
								<Card.Title className="fw-bold">All Rooms</Card.Title>
								<Card.Text className="text-muted small">
									View and manage the complete list of hotel rooms.
								</Card.Text>
							</Card>
						</Link>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Admin

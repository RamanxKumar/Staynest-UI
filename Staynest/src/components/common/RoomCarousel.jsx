import React, { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row, Spinner, Alert, Button } from "react-bootstrap"

const RoomCarousel = () => {
	const [rooms, setRooms] = useState([])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAllRooms()
			.then((data) => {
				setRooms(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return (
			<div className="text-center my-5">
				<Spinner animation="border" variant="warning" />
				<div className="mt-2">Loading rooms...</div>
			</div>
		)
	}

	if (errorMessage) {
		return (
			<Alert variant="danger" className="my-5 text-center">
				Error: {errorMessage}
			</Alert>
		)
	}

	return (
		<section className="bg-light py-5">
			<Container>
				<h2 className="text-center mb-4 fw-bold text-dark">Explore Our Rooms</h2>

				<Carousel controls={rooms.length > 4} indicators={false} interval={null}>
					{[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row className="g-4">
								{rooms.slice(index * 4, index * 4 + 4).map((room) => (
									<Col key={room.id} xs={12} md={6} lg={3}>
										<Card className="h-100 shadow-sm border-0 rounded-4">
											<Link to={`/book-room/${room.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${room.photo}`}
													alt={room.roomType}
													style={{ height: "180px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
												/>
											</Link>
											<Card.Body className="text-center">
												<Card.Title className="fw-bold text-warning">{room.roomType}</Card.Title>
												<Card.Text className="text-muted mb-2">${room.roomPrice} / night</Card.Text>
												<Link to={`/book-room/${room.id}`}>
													<Button variant="warning" size="sm" className="rounded-pill px-3">
														Book Now
													</Button>
												</Link>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>

				<div className="text-center mt-4">
					<Link to="/browse-all-rooms" className="btn btn-outline-warning rounded-pill px-4">
						Browse All Rooms
					</Link>
				</div>
			</Container>
		</section>
	)
}

export default RoomCarousel

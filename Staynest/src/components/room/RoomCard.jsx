import React from "react"
import { Card, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaRupeeSign, FaBed } from "react-icons/fa"

const RoomCard = ({ room }) => {
	return (
		<Col key={room.id} xs={12} sm={12} md={6} lg={4} className="mb-4">
			<Card className="h-100 shadow-sm border-0 rounded-4">
				<Link to={`/book-room/${room.id}`}>
					<Card.Img
						variant="top"
						src={`data:image/png;base64, ${room.photo}`}
						alt="Room"
						className="rounded-top-4"
						style={{ height: "200px", objectFit: "cover" }}
					/>
				</Link>

				<Card.Body className="d-flex flex-column justify-content-between">
					<div>
						<Card.Title className="d-flex align-items-center gap-2 text-primary fs-5 fw-bold">
							<FaBed /> {room.roomType}
						</Card.Title>
						<Card.Subtitle className="mb-2 text-muted fs-6">
							<FaRupeeSign className="mb-1" /> {room.roomPrice} / night
						</Card.Subtitle>
						<Card.Text className="text-secondary small">
							Enjoy our premium comfort room with amenities perfect for a relaxing stay.
						</Card.Text>
					</div>

					<div className="text-end mt-3">
						<Link to={`/book-room/${room.id}`}>
							<Button variant="outline-primary" className="rounded-pill px-4 py-1">
								Book Now
							</Button>
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default RoomCard

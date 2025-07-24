import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
	FaCocktail,
	FaParking,
	FaSnowflake,
	FaTshirt,
	FaUtensils,
	FaWifi,
} from "react-icons/fa"

const services = [
	{ icon: <FaWifi />, title: "WiFi", desc: "Stay connected with high-speed internet access." },
	{ icon: <FaUtensils />, title: "Breakfast", desc: "Start your day with a delicious breakfast buffet." },
	{ icon: <FaTshirt />, title: "Laundry", desc: "Keep your clothes fresh with our laundry service." },
	{ icon: <FaCocktail />, title: "Mini-bar", desc: "Enjoy a refreshing drink from our in-room mini-bar." },
	{ icon: <FaParking />, title: "Parking", desc: "Convenient on-site parking available." },
	{ icon: <FaSnowflake />, title: "Air Conditioning", desc: "Stay cool and comfortable always." },
]

const HotelService = () => {
	return (
		<div className="py-5 bg-light">
			<Container>
				<Header title="Our Services" />

				<h4 className="text-center mb-3">
					Services at <span className="text-warning fw-bold">Staynest</span>{" "}
					<FaClock className="ms-2" /> 24x7 Front Desk
				</h4>
				<hr className="w-25 mx-auto mb-4" />

				<Row xs={1} md={2} lg={3} className="g-4">
					{services.map((service, index) => (
						<Col key={index}>
							<Card className="h-100 shadow-sm border-0">
								<Card.Body className="text-center">
									<div className="fs-2 text-warning mb-2">{service.icon}</div>
									<Card.Title className="fw-bold">{service.title}</Card.Title>
									<Card.Text className="text-muted">{service.desc}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	)
}

export default HotelService

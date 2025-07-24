import React from "react"
import { Container } from "react-bootstrap"

const MainHeader = () => {
	return (
		<header
			className="d-flex align-items-center justify-content-center text-white"
			style={{
				height: "85vh",
				backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c")`, // hotel-themed image URL
				backgroundSize: "cover",
				backgroundPosition: "center",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Dark Overlay */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					zIndex: 1,
				}}
			></div>

			{/* Text Content */}
			<Container
				className="text-center"
				style={{
					zIndex: 2,
				}}
			>
				<h1 className="display-4 fw-bold">
					Welcome to <span className="text-warning">Staynest Hotel</span>
				</h1>
				<h4 className="lead">Experience the Best Hospitality in Town</h4>
			</Container>
		</header>
	)
}

export default MainHeader

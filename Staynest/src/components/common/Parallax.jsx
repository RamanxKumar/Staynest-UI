import React from "react"
import { Container } from "react-bootstrap"

const Parallax = () => {
	return (
		<div
			style={{
				backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c")`, // replace with your image URL
				backgroundAttachment: "fixed",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				color: "white",
				padding: "100px 0",
				position: "relative",
			}}
			className="text-center mb-5"
		>
			{/* Overlay for readability */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					zIndex: 1,
				}}
			></div>

			<Container style={{ position: "relative", zIndex: 2 }}>
				<h1 className="fw-bold display-5">
					Experience the Best Hospitality at{" "}
					<span style={{ color: "#ffd700" }}>Staynest Hotel</span>
				</h1>
				<h3 className="mt-3">We offer the best services for all your needs.</h3>
			</Container>
		</div>
	)
}

export default Parallax

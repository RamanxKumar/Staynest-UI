import React from "react"
import { Container } from "react-bootstrap"

const Header = ({ title }) => {
	return (
		<div
			className="text-white text-center py-2 mb-4"
			style={{
				background: "linear-gradient(135deg, #FFA500, #FFCC00)",
				borderRadius: "1rem",
			}}
		>
			<Container>
				<h1 className="display-5 fw-bold">{title}</h1>
			</Container>
		</div>
	)
}

export default Header

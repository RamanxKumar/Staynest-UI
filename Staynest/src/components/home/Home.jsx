import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import HotelService from "../common/HotelService";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";

const Home = () => {
	const location = useLocation();
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		if (location.state?.loginSuccess) {
			setSuccessMessage("✅ You have logged in successfully!");
		} else if (location.state?.logoutSuccess) {
			setSuccessMessage("👋 You have logged out successfully.");
		}

		const timer = setTimeout(() => setSuccessMessage(""), 4000);
		return () => clearTimeout(timer);
	}, [location.state]);

	return (
		<section>
			{/* Beautiful Success Message */}
			{successMessage && (
				<div className="container mt-4">
					<div
						className="alert d-flex align-items-center justify-content-between rounded-pill shadow-sm px-4 py-3 fade show"
						role="alert"
						style={{
							background: "linear-gradient(135deg, #d4edda, #c3e6cb)",
							border: "1px solid #155724",
							color: "#155724",
							fontWeight: "600",
						}}
					>
						<div className="d-flex align-items-center">
							<i className="bi bi-check-circle-fill me-2 fs-5"></i>
							<span>{successMessage}</span>
						</div>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="alert"
							aria-label="Close"
							onClick={() => setSuccessMessage("")}
						></button>
					</div>
				</div>
			)}

			{/* Main Content */}
			<MainHeader />
			<section className="container">
				<RoomSearch /><br/>
				<RoomCarousel />
				<Parallax />
				<RoomCarousel />
				<HotelService />
				<Parallax />
				<RoomCarousel />
			</section>
		</section>
	);
};

export default Home;

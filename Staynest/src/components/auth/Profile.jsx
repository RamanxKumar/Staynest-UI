import React, { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token);
				setUser(userData);
			} catch (error) {
				setErrorMessage("Unable to fetch user data.");
			}
		};
		fetchUser();
	}, [userId]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token);
				setBookings(response);
			} catch (error) {
				console.error("Error fetching bookings."); // Removed from UI
			}
		};
		fetchBookings();
	}, [userId]);

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm("Are you sure you want to delete your account?");
		if (confirmed) {
			try {
				await deleteUser(userId);
				localStorage.clear();
				navigate("/");
				window.location.reload();
			} catch (error) {
				setErrorMessage("Error deleting account.");
			}
		}
	};

	return (
		<div className="container py-5">
			<div className="row justify-content-center">
				<div className="col-md-10">
					{errorMessage && (
						<div className="alert alert-danger text-center shadow-sm">{errorMessage}</div>
					)}
					{message && (
						<div className="alert alert-success text-center shadow-sm">{message}</div>
					)}

					{user ? (
						<div className="card shadow-lg rounded-4 border-0 p-4 bg-light">
							<h2 className="text-center text-primary fw-bold mb-4">My Profile</h2>
							<div className="row align-items-center g-4">
								<div className="col-md-3 text-center">
									<img
										src="Profile-icon.jpg"
										alt="Profile"
										className="img-fluid rounded-circle border border-secondary shadow"
										style={{ width: "140px", height: "140px", objectFit: "cover" }}
									/>
								</div>
								<div className="col-md-9">
									<ul className="list-group list-group-flush">
										<li className="list-group-item"><strong>ID:</strong> {user.id}</li>
										<li className="list-group-item"><strong>Name:</strong> {user.firstName} {user.lastName}</li>
										<li className="list-group-item"><strong>Email:</strong> {user.email}</li>
										<li className="list-group-item">
											<strong>Roles:</strong>{" "}
											{user.roles.map((role) => (
												<span key={role.id} className="badge bg-dark me-2">{role.name}</span>
											))}
										</li>
									</ul>
								</div>
							</div>

							<hr className="my-4" />
							<h4 className="text-center text-dark mb-3">Booking History</h4>

							{bookings.length > 0 ? (
								<div className="table-responsive">
									<table className="table table-striped table-hover border shadow-sm">
										<thead className="table-secondary">
											<tr>
												<th>Booking ID</th>
												<th>Room ID</th>
												<th>Room Type</th>
												<th>Check-In</th>
												<th>Check-Out</th>
												<th>Confirmation Code</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{bookings.map((booking, index) => (
												<tr key={index}>
													<td>{booking.bookingId}</td>
													<td>{booking.room.id}</td>
													<td>{booking.room.roomType}</td>
													<td>{moment(booking.checkInDate).format("DD MMM YYYY")}</td>
													<td>{moment(booking.checkOutDate).format("DD MMM YYYY")}</td>
													<td>{booking.bookingConfirmationCode}</td>
													<td>
														<span className="badge bg-success">On-going</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<p className="text-center text-muted">No bookings found yet.</p>
							)}

							<div className="text-center mt-4">
								<button
									className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
									onClick={handleDeleteAccount}
								>
									Close Account
								</button>
							</div>
						</div>
					) : (
						<p className="text-center mt-5 text-muted">Loading user data...</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;

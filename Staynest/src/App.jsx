import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import Home from "./components/home/Home"

import ExistingRooms from "./components/room/ExistingRooms"
import EditRoom from "./components/room/EditRoom"
import AddRoom from "./components/room/AddRoom"
import RoomListing from "./components/room/RoomListing"

import Admin from "./components/admin/Admin"

import Checkout from "./components/bookings/Checkout"
import BookingSuccess from "./components/bookings/BookingSuccess"
import Bookings from "./components/bookings/Bookings"
import FindBooking from "./components/bookings/FindBooking"

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

import Profile from "./components/auth/Profile"

import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="d-flex flex-column min-vh-100">
					<NavBar />

					<main className="flex-fill">
						<Routes>
							{/* Public Routes */}
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register/>} />
							<Route path="/browse-all-rooms" element={<RoomListing />} />
							

							{/* Room Management (Admin Only, optionally protected) */}
							<Route path="/existing-rooms" element={<ExistingRooms />} />
							<Route path="/edit-room/:roomId" element={<EditRoom />} />
							<Route path="/add-rooms" element={<AddRoom />} />

							{/* Booking Routes */}
							<Route
								path="/book-room/:roomId"
								element={
									<RequireAuth>
										<Checkout />
									</RequireAuth>
								}
							/>
							<Route path="/existing-bookings" element={<Bookings />} />

							{/* Admin */}
							<Route
								path="/admin"
								element={
									<RequireAuth>
										<Admin />
									</RequireAuth>
								}
							/>

							{/* Authenticated User */}
							<Route
								path="/profile"
								element={
									<RequireAuth>
										<Profile />
									</RequireAuth>
								}
							/>

							<Route
								path="/booking-success"
								element={
									<RequireAuth>
										<BookingSuccess />
									</RequireAuth>
								}
							/>
							<Route
								path="/find-booking"
								element={
									<RequireAuth>
										<FindBooking/>
									</RequireAuth>
								}
							/>
						</Routes>
					</main>

					<Footer />
				</div>
			</Router>
		</AuthProvider>
	)
}

export default App

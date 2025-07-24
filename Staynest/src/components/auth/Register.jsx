import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"

const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error: ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<section className="container d-flex justify-content-center align-items-center min-vh-100">
			<div className="card shadow-lg p-4 w-100" style={{ maxWidth: "550px", borderRadius: "1.5rem" }}>
				<h2 className="text-center mb-4 text-primary fw-bold">Create Your Account</h2>

				{errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
				{successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

				<form onSubmit={handleRegistration}>
					<div className="mb-3">
						<label htmlFor="firstName" className="form-label">
							First Name
						</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control rounded-pill"
							value={registration.firstName}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="lastName" className="form-label">
							Last Name
						</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control rounded-pill"
							value={registration.lastName}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email Address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control rounded-pill"
							value={registration.email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control rounded-pill"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
							required
						/>
					</div> 

					<div className="d-grid gap-2 mb-3">
						<button type="submit" className="btn btn-primary rounded-pill fw-semibold py-2">
							Register
						</button>
					</div>

					<p className="text-center text-muted">
						Already have an account?{" "}
						<Link to="/login" className="text-decoration-none fw-bold text-primary">
							Login
						</Link>
					</p>
				</form>
			</div>
		</section>
	)
}

export default Registration

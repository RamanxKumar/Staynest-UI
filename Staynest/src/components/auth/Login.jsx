import React, { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const [login, setLogin] = useState({ email: "", password: "" });

	const navigate = useNavigate();
	const auth = useAuth();
	const location = useLocation();
	const redirectUrl = location.state?.path || "/";

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setLogin((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const success = await loginUser(login);
			if (success?.token) {
				auth.handleLogin(success.token);
				navigate(redirectUrl, { replace: true, state: { loginSuccess: true } });
			} else {
				throw new Error("Invalid credentials");
			}
		} catch (error) {
			setErrorMessage("Invalid email or password. Please try again.");
			setTimeout(() => setErrorMessage(""), 4000);
		}
		window.location.reload();
	};

	return (
		<section className="container d-flex justify-content-center align-items-center min-vh-100">
			<div
				className="card shadow-lg p-5 rounded-4"
				style={{
					width: "100%",
					maxWidth: "500px",
					backgroundColor: "#f9f9f9",
				}}
			>
				<h3 className="text-center mb-4 text-primary fw-bold">Login to Your Account</h3>

				{errorMessage && (
					<div className="alert alert-danger text-center rounded-pill py-2">
						{errorMessage}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label fw-semibold">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control rounded-pill"
							value={login.email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="password" className="form-label fw-semibold">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control rounded-pill"
							value={login.password}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="d-grid mb-3">
						<button type="submit" className="btn btn-primary rounded-pill fw-semibold py-2">
							Login
						</button>
					</div>

					<p className="text-center text-muted">
						Don't have an account?{" "}
						<Link to="/register" className="text-decoration-none fw-bold text-primary">
							Register
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Login;

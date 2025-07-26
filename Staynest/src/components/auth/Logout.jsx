import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	  // ✅ Dark Mode State
	  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
	
	  const toggleDarkMode = () => {
		setDarkMode((prev) => {
		  const newMode = !prev;
		  localStorage.setItem("darkMode", newMode);
		  return newMode;
		});
	  };
	
	  useEffect(() => {
		document.body.classList.toggle("dark-mode", darkMode);
	  }, [darkMode]);

	const handleLogout = () => {
		auth.handleLogout();
		navigate("/", {
			replace: true,
			state: { logoutSuccess: true },
		});

		window.location.reload();
	};

	return (
		<>
			<li>
				<Link
					to="/profile"
					className="dropdown-item d-flex align-items-center"
					aria-label="Go to profile"
				>
					<i className={`bi bi-person-circle ${darkMode ? "text-white" : "text-dark"} me-2`}></i>
					<span>Profile</span>
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<li>
				<button
					className="dropdown-item d-flex align-items-center text-danger fw-semibold"
					onClick={handleLogout}
					aria-label="Logout"
				>
					<i className="bi bi-box-arrow-right me-2"></i>
					<span>Logout</span>
				</button>
			</li>
		</>
	);
};

export default Logout;

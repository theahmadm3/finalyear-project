import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

const InstructorLogin: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const loginData = {
		email: email.toLowerCase(),
		password: password,
	};

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		try {
			// Clear previous errors
			setError("");
			// Perform login
			await login(loginData);
			// Redirect or show success message
			navigate("/portal/profile");
		} catch (error) {
			setError("Invalid email or password. Please try again.");
			console.error("Login error:", error);
		}
	};

	return (
		<div className="overflow-auto bg-dark-blue flex flex-row-ns flex-column-s justify-between-ns justify-center w-100 vh-100">
			<div className="w-50-m w-60-l dn-s"></div>
			<div className="w-50-m w-40-l pa2 flex-ns justify-center-ns items-center-ns bg-black-40">
				<form
					onSubmit={handleLogin}
					className="pa2 shadow-1 br3 w-70-l w-100 white"
				>
					<h2 className="tc">Instructor Login</h2>
					<div className="pa2 w-100 f4">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							className="pa2 w-100 br3 bg-white f4 black fluent-input bg-animate mt2"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="pa2 w-100 f4">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							className="pa2 w-100 br3 bg-white f4 black fluent-input bg-animate mt2"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && <p className="red">{error}</p>}
					<div className="pa2 mt4 flex justify-center items-center">
						<button
							type="submit"
							className="w-fc bn bg-blue white pointer pa2 pl3 pr3 br2"
						>
							{" "}
							Login{" "}
						</button>
					</div>
					<div className="pa2 mt4 flex justify-center items-center">
						<Link to="/student-login" className="white link">
							Student?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default InstructorLogin;

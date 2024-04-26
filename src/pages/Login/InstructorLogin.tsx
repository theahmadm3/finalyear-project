import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

const InstructorLogin: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [disableButton, setDisableButton] = useState<boolean>(false);

	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const loginData = {
		email: email.toLowerCase(),
		password: password,
	};

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		setDisableButton(true);

		try {
			const data = await login(loginData);
			// Redirect or show success message
			navigate("/portal/instructor-profile");
		} catch (error) {
			setError("Invalid email or password. Please try again.");
			console.error("Login error:", error);
		} finally {
			setDisableButton(false);
		}
	};

	return (
		<div className="overflow-auto bg-dark-blue flex flex-row-ns flex-column-s justify-between-ns justify-center w-100 vh-100">
			<div className="w-50-m w-40-l center pa2 flex-ns justify-center-ns items-center-ns">
				<form
					onSubmit={handleLogin}
					className="pa5-ns pa2 shadow-1 br3 w-70-l w-100 white"
				>
					<h2 className="tc">Instructor Login</h2>
					<div className="pa2 w-100 f4">
						<label htmlFor="email">Email *</label>
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
						<label htmlFor="password">Password *</label>
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
							disabled={disableButton}
							className={
								disableButton
									? "w-100 pa3 pointer grow bn bg-light-blue white br2"
									: "w-100 pa3 pointer grow bn bg-blue white br2"
							}
						>
							{!disableButton ? "Login" : "Logging in..."}
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

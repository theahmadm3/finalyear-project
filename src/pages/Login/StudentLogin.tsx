import React, { FormEvent } from "react";
import { Link } from "react-router-dom";

const StudentLogin: React.FC = () => {

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="overflow-auto flex flex-row-ns flex-column justify-between-ns justify-center w-100 vh-100">
			<div className="w-50 dn-s bg-dark-blue"></div>
			<div className="w-50-ns pa2 flex-ns justify-center-ns items-center-ns bg-black">
				<form
					onSubmit={handleLogin}
					className="pa2 ba br3 w-70-ns w-100 white"
				>
					<h2 className="tc">Student Login</h2>
					<div className="pa2 w-100 f4">
						<label htmlFor="student_id">Student ID</label>
						<input
							type="text"
							id="student_id"
							className="pa2 w-100 br3 bg-white f4 black fluent-input bg-animate mt2"
							placeholder="Student Id"
						/>
					</div>
					<div className="pa2 w-100 f4">
						<label htmlFor="student_password">Password</label>
						<input
							type="password"
							id="student_password"
							className="pa2 w-100 br3 bg-white f4 black fluent-input bg-animate mt2"
							placeholder="Password"
						/>
					</div>
					<div className="pa2 mt4 flex justify-center items-center">
						<button className="w-fc bn bg-blue white pointer pa2 pl3 pr3 br2">
							{" "}
							Login{" "}
						</button>
					</div>
					<div className="pa2 mt4 flex justify-center items-center">
						<Link to="/login" className="white link">
							Instructor?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default StudentLogin;

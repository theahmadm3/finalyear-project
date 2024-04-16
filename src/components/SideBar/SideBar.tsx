import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
	const linkStyles = {
		outline: "none",
	};

	return (
		<div className="flex flex-column">
			<NavLink
				to="/portal"
				style={linkStyles}
				className={({ isActive }) => (isActive ? "" : "")}
			>
				<p>Profile</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) => (isActive ? "" : "")}
			>
				<p>Courses</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) => (isActive ? "" : "")}
			>
				<p>Attendance</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) => (isActive ? "" : "")}
			>
				<p>Attendance Records</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) => (isActive ? "" : "")}
			>
				<p>Settings</p>
			</NavLink>
			<div>Logout</div>
		</div>
	);
};
export default SideBar;

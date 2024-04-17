import React from "react";
import { Link, NavLink } from "react-router-dom";

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
			<Link to='/' className='link black'>Logout</Link>
		</div>
	);
};
export default SideBar;

import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
	const linkStyles = {
		outline: "none",
	};

	return (
		<div className="flex flex-column vh-100">
			<NavLink
				to="/portal"
				style={linkStyles}
				className={({ isActive }) =>
					isActive ? "inline-flex link black" : "inline-flex link black"
				}
			>
				<i className="material-icons mr2">account_circle</i>
				<p>Profile</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) =>
					isActive ? "inline-flex link black" : "inline-flex link black"
				}
			>
				<i className="material-icons mr2">school</i>
				<p>Courses</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) =>
					isActive ? "inline-flex link black" : "inline-flex link black"
				}
			>
				<i className="material-icons mr2">check_box</i>
				<p>Attendance</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) =>
					isActive ? "inline-flex link black" : "inline-flex link black"
				}
			>
				<i className="material-icons mr2">featured_play_list</i>
				<p>Attendance Records</p>
			</NavLink>
			<NavLink
				to="/"
				style={linkStyles}
				className={({ isActive }) =>
					isActive ? "inline-flex link black" : "inline-flex link black"
				}
			>
				<i className="material-icons mr2">settings</i>
				<p>Settings</p>
			</NavLink>
			<Link to="/" className="link black inline-flex">
				<i className="material-icons mr2">logout</i>
				Logout
			</Link>
		</div>
	);
};
export default SideBar;

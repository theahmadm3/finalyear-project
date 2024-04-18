import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
	const linkStyles = {
		outline: "none",
	};

	const userType = "student";
	return (
		<div className="flex flex-column vh-100">
			{userType === "student" ? (
				<>
					<NavLink
						to="/portal"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">account_circle</i>
						<p>Profile</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">school</i>
						<p>Courses</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">check_box</i>
						<p>Attendance</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">featured_play_list</i>
						<p>Attendance Records</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">settings</i>
						<p>Settings</p>
					</NavLink>
					<Link to="/" className="link inline-flex white">
						<i className="material-icons mr2">logout</i>
						Logout
					</Link>
				</>
			) : (
				<>
					<NavLink
						to="/portal"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">account_circle</i>
						<p>Profile</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">school</i>
						<p>Courses</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">check_box</i>
						<p>Attendance</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive ? "inline-flex link white" : "inline-flex link white"
						}
					>
						<i className="material-icons mr2">settings</i>
						<p>Settings</p>
					</NavLink>
					<Link to="/" className="link inline-flex white">
						<i className="material-icons mr2">logout</i>
						Logout
					</Link>
				</>
			)}
		</div>
	);
};
export default SideBar;

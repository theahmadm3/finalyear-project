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
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">account_circle</i>
						<p className="ma0">Profile</p>
					</NavLink>
					<NavLink
						to="/courses"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">school</i>
						<p className="ma0">Courses</p>
					</NavLink>
					<NavLink
						to="/attendance"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">check_box</i>
						<p className="ma0">Attendance</p>
					</NavLink>
					<NavLink
						to="/records"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">featured_play_list</i>
						<p className="ma0">Attendance Records</p>
					</NavLink>
					<NavLink
						to="/settings"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">settings</i>
						<p className="ma0">Settings</p>
					</NavLink>
					<Link to="/login" className="pa2 inline-flex link white items-center">
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
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">account_circle</i>
						<p className="ma0">Profile</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">school</i>
						<p className="ma0">Courses</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">check_box</i>
						<p className="ma0">Attendance</p>
					</NavLink>
					<NavLink
						to="/"
						style={linkStyles}
						className={({ isActive }) =>
							isActive
								? "pa2 inline-flex link white bg-white blue items-center"
								: "pa2 inline-flex link white items-center"
						}
					>
						<i className="material-icons mr2">settings</i>
						<p className="ma0">Settings</p>
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

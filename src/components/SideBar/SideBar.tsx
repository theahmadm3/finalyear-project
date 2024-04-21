import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

const SideBar: React.FC = () => {
	const linkStyles = {
		outline: "none",
	};

	const { logout } = useContext(AuthContext);

	return (
		<div className="flex flex-column vh-100">
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
			<div onClick={logout} className="inline-flex white pa2 pointer">
				<i className="material-icons mr2">logout</i>
				Logout
			</div>
		</div>
	);
};
export default SideBar;

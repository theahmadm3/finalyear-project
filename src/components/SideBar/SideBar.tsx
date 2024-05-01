import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

const SideBar: React.FC = () => {
	const linkStyles = {
		outline: "none",
	};

	const { logout, user } = useContext(AuthContext);

	const navigate = useNavigate();

	const [waiting, setWaiting] = useState<boolean>(true);

	useEffect(() => {
		// When either user or instructor context value becomes available, update waiting state
		if (user !== null || user !== undefined) {
			setWaiting(false);
		}
	}, [user]);

	const isStudent = waiting ? user?.is_student : user?.is_student;

	const handleLogout = () => {
		isStudent ? navigate("/student-login") : navigate("/login");
		logout();
		window.location.reload();
	};

	return (
		<div className="flex flex-column justify-between vh-90">
			<div className="flex flex-column">
				<NavLink
					to="/portal/profile"
					style={linkStyles}
					className={({ isActive }) =>
						isActive
							? "pa2 inline-flex mb2 link white bg-white bg-animate blue items-center br3"
							: "pa2 inline-flex mb2 link white items-center"
					}
				>
					<i className="material-icons mr2">account_circle</i>
					<p className="ma0">Profile</p>
				</NavLink>
				<NavLink
					to="/portal/courses"
					style={linkStyles}
					className={({ isActive }) =>
						isActive
							? "pa2 inline-flex mb2 link white bg-white bg-animate blue items-center br3"
							: "pa2 inline-flex mb2 link white items-center"
					}
				>
					<i className="material-icons mr2">school</i>
					<p className="ma0">Courses</p>
				</NavLink>

				<NavLink
					to="/portal/attendance"
					style={linkStyles}
					className={({ isActive }) =>
						isActive
							? "pa2 inline-flex mb2 link white bg-white bg-animate blue items-center br3"
							: `${
									isStudent
										? "pa2 inline-flex mb2 link white items-center"
										: "dn"
							  }`
					}
				>
					<i className="material-icons mr2">check_box</i>
					<p className="ma0">Attendance</p>
				</NavLink>
				<NavLink
					to="/portal/records"
					style={linkStyles}
					className={({ isActive }) =>
						isActive
							? "pa2 inline-flex mb2 link white bg-white bg-animate blue items-center br3"
							: "pa2 inline-flex mb2 link white items-center"
					}
				>
					<i className="material-icons mr2">featured_play_list</i>
					<p className="ma0">Attendance Records</p>
				</NavLink>
				<NavLink
					to="/portal/settings"
					style={linkStyles}
					className={({ isActive }) =>
						isActive
							? "pa2 inline-flex mb2 link white bg-white bg-animate blue items-center br3"
							: "pa2 inline-flex mb2 link white items-center"
					}
				>
					<i className="material-icons mr2">settings</i>
					<p className="ma0">Settings</p>
				</NavLink>
			</div>
			<div className="w-100 pointer">
				<div
					onClick={handleLogout}
					className="w-100 pa2 inline-flex mb2 link white bg-blue br3 items-center"
				>
					<i className="material-icons mr2">logout</i>
					Logout
				</div>
			</div>
		</div>
	);
};
export default SideBar;

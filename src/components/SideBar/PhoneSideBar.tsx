import React, { useContext, useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

const PhoneSideBar: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
		<>
			<button className="bn bg-transparent" onClick={handleShow}>
				<i className="material-icons white">menu</i>
			</button>

			<Offcanvas
				show={show}
				onHide={handleClose}
				className=""
				style={{ width: "70%" }}
			>
				<Offcanvas.Header className="bg-dark-blue white inline-flex justify-between items-center">
					<h3 className='w-80'>MJ University</h3>
					<i onClick={handleClose} className="material-icons w-10 tr">
						close
					</i>
				</Offcanvas.Header>
				<Offcanvas.Body className="bg-dark-blue white">
					<Link
						onClick={handleClose}
						to="/portal/profile"
						className="inline-flex w-100 link white hover-bg-blue pa1"
						style={{ outline: "none" }}
					>
						<i className="material-icons mr2">account_circle</i>{" "}
						<p className="ma0">Profile</p>
					</Link>
					<Link
						onClick={handleClose}
						to="/portal/attendance"
						style={{ outline: "none" }}
						className={`${
							isStudent
								? "inline-flex w-100 link white hover-bg-blue pa1"
								: "dn"
						}`}
					>
						<i className="material-icons mr2">school</i>{" "}
						<p className="ma0">Courses</p>
					</Link>
					<Link
						onClick={handleClose}
						to="/portal/records"
						className="inline-flex w-100 link white hover-bg-blue pa1"
						style={{ outline: "none" }}
					>
						<i className="material-icons mr2">featured_play_list</i>{" "}
						<p className="ma0"> Attendance Records</p>
					</Link>
					<Link
						onClick={handleClose}
						to="/portal/settings"
						className="inline-flex w-100 link white hover-bg-blue pa1"
						style={{ outline: "none" }}
					>
						<i className="material-icons mr2">settings</i>{" "}
						<p className="ma0">Settings</p>
					</Link>
					<div
						onClick={handleLogout}
						className="inline-flex w-100 link white hover-bg-blue pa1 pointer"
						style={{ outline: "none" }}
					>
						<i className="material-icons mr2">logout</i>{" "}
						<p className="ma0">Logout</p>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
export default PhoneSideBar;

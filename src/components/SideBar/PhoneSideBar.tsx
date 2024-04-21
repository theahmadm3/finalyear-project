import React, { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

const PhoneSideBar: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { logout, isStudent } = useContext(AuthContext);

	return (
		<>
			<button className="bn bg-transparent" onClick={handleShow}>
				<i className="material-icons white">menu</i>
			</button>

			{isStudent ? (
				<Offcanvas show={show} onHide={handleClose} className="w-50">
					<Offcanvas.Header
						className="bg-dark-blue white"
						closeButton
					></Offcanvas.Header>
					<Offcanvas.Body className="bg-dark-blue white">
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">account_circle</i>{" "}
							<p className="ma0">Profile</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">school</i>{" "}
							<p className="ma0">Courses</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">check_box</i>{" "}
							<p className="ma0">Attendance</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">featured_play_list</i>{" "}
							<p className="ma0"> Attendance Records</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">settings</i>{" "}
							<p className="ma0">Settings</p>
						</Link>
						<div
							onClick={logout}
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">logout</i>{" "}
							<p className="ma0">Logout</p>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			) : (
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton></Offcanvas.Header>
					<Offcanvas.Body>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">account_circle</i>{" "}
							<p className="ma0">Profile</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">school</i>{" "}
							<p className="ma0">Courses</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">check_box</i>{" "}
							<p className="ma0">Attendance</p>
						</Link>
						<Link
							onClick={handleClose}
							to="/portal"
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">settings</i>{" "}
							<p className="ma0">Settings</p>
						</Link>
						<div
							onClick={logout}
							className="inline-flex w-100 link white hover-bg-blue pa1"
							style={{ outline: "none" }}
						>
							<i className="material-icons mr2">logout</i>{" "}
							<p className="ma0">Logout</p>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			)}
		</>
	);
};
export default PhoneSideBar;

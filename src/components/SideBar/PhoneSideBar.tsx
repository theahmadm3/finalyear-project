import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Link } from "react-router-dom";

const PhoneSideBar: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const userType = "student"; // TODO: get this dynamically

	return (
		<>
			<button className="bn bg-transparent" onClick={handleShow}>
				<i className="material-icons white">menu</i>
			</button>

			{userType === "student" ? (
				<Offcanvas show={show} onHide={handleClose} className="w-50">
					<Offcanvas.Header className='bg-dark-blue white' closeButton></Offcanvas.Header>
					<Offcanvas.Body className='bg-dark-blue white'>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">account_circle</i>{" "}
							<p>Profile</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">school</i>{" "}
							<p>Courses</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">check_box</i>{" "}
							<p>Attendance</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">featured_play_list</i>{" "}
							<p> Attendance Records</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">settings</i>{" "}
							<p>Settings</p>
						</Link>
						<Link to="/" className="inline-flex w-100 link white">
							<i className="material-icons mr2">logout</i> <p>Logout</p>
						</Link>
					</Offcanvas.Body>
				</Offcanvas>
			) : (
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton></Offcanvas.Header>
					<Offcanvas.Body>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">account_circle</i>{" "}
							<p>Profile</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">school</i>{" "}
							<p>Courses</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">check_box</i>{" "}
							<p>Attendance</p>
						</Link>
						<Link to="/portal" className="inline-flex w-100 link white">
							<i className="material-icons mr2">settings</i>{" "}
							<p>Settings</p>
						</Link>
						<Link to="/" className="inline-flex w-100 link white">
							<i className="material-icons mr2">logout</i> <p>Logout</p>
						</Link>
					</Offcanvas.Body>
				</Offcanvas>
			)}
		</>
	);
};
export default PhoneSideBar;

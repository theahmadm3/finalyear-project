import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const PhoneSideBar: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const userType = "student"; // TODO: get this dynamically

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Launch
			</Button>

			{userType === "student" ? (
				<Offcanvas show={show} onHide={handleClose} className='ba w-50'>
					<Offcanvas.Header closeButton></Offcanvas.Header>
					<Offcanvas.Body>
						<p>Profile</p>
						<p>Courses</p>
						<p>Attendance</p>
						<p>Settings</p>
						<p>Logout</p>
					</Offcanvas.Body>
				</Offcanvas>
			) : (
				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton></Offcanvas.Header>
					<Offcanvas.Body>
						<p>Profile</p>
						<p>Courses</p>
						<p>Attendance</p>
						<p>Attendance Records</p>
						<p>Settings</p>
						<p>Logout</p>
					</Offcanvas.Body>
				</Offcanvas>
			)}
		</>
	);
};
export default PhoneSideBar;

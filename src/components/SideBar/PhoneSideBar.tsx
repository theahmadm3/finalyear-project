import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const PhoneSideBar: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const userType = "student"; // TODO: get this dynamically

	return (
		<>
			<button className="bn bg-transparent" onClick={handleShow}>
            <i className="material-icons">menu</i>
			</button>

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

import QRCode from "qrcode.react";
import React, { FormEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export interface InstructorTakeAttendanceProps {
	courseId: number;
	name: string;
}

const InstructorTakeAttendance: React.FC<InstructorTakeAttendanceProps> = ({
	courseId,
	name,
}) => {
	const [show, setShow] = useState<boolean>(false);
	const [showQrCode, setShowQrCode] = useState<boolean>(false);
	const [location, setLocation] = useState<string>("");
	const [locationError, setLocationError] = useState<string>("");
	const [formError, setFormError] = useState<string>("");
	const [formData, setFormData] = useState<string>("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const HandleShowQrCode = () => setShowQrCode(true);
	const handleCloseQrCode = () => setShowQrCode(false);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation(
						`${position.coords.latitude} ${position.coords.longitude}`,
					);
					handleShow();
					console.log(position);
					console.log("Location", location);
				},
				(error) => {
					setLocationError(error.message); // Update location error message
					alert(error.message); // Alert the error message directly
				},
			);
		} else {
			setLocationError("Geolocation is not supported by your browser.");
			alert("Geolocation is not supported by your browser.");
		}
	};

	const [selectedTime, setSelectedTime] = useState<string>("");

	const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedTime(event.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (location.trim() === "" || selectedTime.trim() === "") {
			setFormError("Please select both location and time.");
			return;
		}

		// Reset form error message
		setFormError("");

		const lectureAttendanceData = {
			course_id: courseId,
			location: location,
			time: selectedTime,
		};

		console.log(lectureAttendanceData);
		setFormData(JSON.stringify(lectureAttendanceData));
		HandleShowQrCode();

		handleClose();
	};

	return (
		<>
			<Button variant="primary" onClick={getLocation}>
				Take Attendance
			</Button>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<span className="b"></span>Take Attendance
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-row-ns flex-column-s justify-between">
							<div className="flex flex-column w-45-ns">
								<label htmlFor="course" className="mb2 b pa1">
									Course
								</label>
								<input
									className="pa2 br3 bn shadow-2"
									id="course"
									value={`${name}`}
									readOnly
									disabled
								/>
							</div>
							<div className="flex flex-column w-45-ns">
								<label htmlFor="location" className="mb2 b pa1">
									Location
								</label>
								<input
									id="location"
									className="pa2 br3 bn shadow-2"
									value={location === "" ? "click to get location" : location}
									readOnly
									required
								/>
								{locationError && <p>{locationError}</p>}
							</div>
						</div>
						<div className="flex flex-row-ns flex-column-s justify-between">
							<div className="flex flex-column w-45-ns">
								<label htmlFor="time" className="mb2 b pa1">
									Lecture time frame
								</label>
								<select
									id="time"
									className="pa1 br3 bn shadow-2"
									style={{ outline: "none" }}
									value={selectedTime}
									onChange={handleTimeChange}
									required
								>
									<option value="">Select Time frame</option>
									<option value={"9-12"}>Morning (9am - 12pm)</option>
									<option value={"2-5"}>Afternoon (2pm - 5pm)</option>
								</select>
							</div>
						</div>
						<p className="error-message">{formError}</p>
						<hr className="mt4 mb2 w-100"></hr>
						<div className="inline-flex justify-end w-100 pa2">
							<Button variant="secondary" onClick={handleCloseQrCode}>
								Close
							</Button>
							<button
								className="ml2 pa2 pl3 pr3 bn white br3 bg-dark-blue dim link"
								type="submit"
							>
								Generate QR Code
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<Modal show={showQrCode} onHide={handleCloseQrCode} centered>
				<Modal.Header closeButton>
					<span className="b"></span>QR Code
				</Modal.Header>
				<Modal.Body>
					<div
						className="flex flex-column justify-center items-center pa2"
						style={{ height: "70vh" }}
					>
						<QRCode size={400} value={formData} />
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default InstructorTakeAttendance;

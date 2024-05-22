import QRCode from "qrcode.react";
import React, { FormEvent, useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { toast } from "react-toastify";

export interface InstructorTakeAttendanceProps {
	courseId: number;
	name: string;
}

const InstructorTakeAttendance: React.FC<InstructorTakeAttendanceProps> = ({
	courseId,
	name,
}) => {
	const { token } = useContext(AuthContext);

	const [show, setShow] = useState<boolean>(false);
	const [showQrCode, setShowQrCode] = useState<boolean>(false);
	const [showManualAttendance, setShowManualAttendance] =
		useState<boolean>(false);
	const [location, setLocation] = useState<string>("");
	const [locationError, setLocationError] = useState<string>("");
	const [formError, setFormError] = useState<string>("");
	const [formData, setFormData] = useState<string>("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const HandleShowQrCode = () => setShowQrCode(true);
	const handleCloseQrCode = () => setShowQrCode(false);
	const HandleShowManualAttendance = () => setShowManualAttendance(true);
	const handleCloseManualAttendance = () => setShowManualAttendance(false);

	const getLocation = () => {
		const loadingToast = toast.loading("Getting location");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation(
						`${position.coords.latitude} ${position.coords.longitude}`,
					);
					toast.dismiss(loadingToast);
					handleShow();
				},
				(error) => {
					setLocationError(error.message);
					alert(error.message);
					toast.error(error.message);
					toast.dismiss(loadingToast);
				},
			);
		} else {
			setLocationError("Geolocation is not supported by your browser.");
			alert("Geolocation is not supported by your browser.");
			toast.error("Geolocation is not supported by your browser.");
			toast.dismiss(loadingToast);
		}
	};

	const [selectedTime, setSelectedTime] = useState<string>("");

	const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedTime(event.target.value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (location.trim() === "" || selectedTime.trim() === "") {
			setFormError("Please select both location and time.");
			return;
		}

		setFormError("");
		// Start loading indicator
		const loadingToast = toast.loading("Generating QR code");

		const lectureAttendanceData = {
			course: Number(courseId),
			location: location,
			time_frame: selectedTime,
			lecturer: 1,
		};

		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/create/lecturer/attendance",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(lectureAttendanceData),
				},
			);
			const data = await response.json();

			if (data.success) {
				const qrString = JSON.stringify(data.data);
				setFormData(qrString);
				toast.success(data.message);
				HandleShowQrCode();
			} else {
				setFormError(data.message);
				// Display error message
				toast.error(data.message);
			}
		} catch (error) {
			console.error("Error fetching QR string:", error);
			// Display error message
			toast.error("Error generating qr code");
		} finally {
			// Hide loading indicator
			toast.dismiss(loadingToast);
		}

		handleClose();
	};

	return (
		<>
			<Button variant="primary" onClick={getLocation}>
				Take Attendance
			</Button>
			<p className="red">{formError}</p>
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
									<option value={"9-12"}>Morning (9am - 12 noon)</option>
									<option value={"12-14"}>Afternoon (12 noon - 2pm)</option>
									<option value={"14-17"}>Evening (2pm - 5pm)</option>
									<option value={"1-23"}>Night (Night)</option>
								</select>
							</div>
						</div>
						<p className="error-message">{formError}</p>
						<hr className="mt4 mb2 w-100"></hr>
						<div className="inline-flex justify-end w-100 pa2">
							<Button variant="secondary" onClick={handleClose}>
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
						className="w-100-s flex flex-column justify-center items-center pa2"
						style={{ height: "70vh" }}
					>
						<QRCode size={350} value={formData} />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={HandleShowManualAttendance}>
						Take Manual Attendance
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				show={showManualAttendance}
				onHide={handleCloseManualAttendance}
				centered
			>
				<Modal.Header closeButton> Students </Modal.Header>
				<Modal.Body></Modal.Body>
			</Modal>
		</>
	);
};

export default InstructorTakeAttendance;

import { useContext, useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { toast } from "react-toastify";

export interface StudentRecordProps {
	courseId: number;
	name: string;
	code: string;
}

const ViewStudentAttendance: React.FC<StudentRecordProps> = ({
	courseId,
	name,
	code,
}) => {
	const [show, setShow] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totalAttendance, setTotalAttendance] = useState<number>(100);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { token } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);

		fetch(
			"https://finalyear-project-backend.onrender.com/api/get/student/attendance",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ course_id: courseId }),
			},
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setTotalAttendance(data.data);
			})
			.catch((err) => {
				console.error("Error fetching courses: ", err);
				toast.error(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [token, courseId]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				View Attendance Record
			</Button>
			{isLoading ? (
				<></>
			) : (
				<Modal centered show={show} onHide={handleClose}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="tc">
						<h3>Attendance record for</h3>
						<h4 className="mt2 mb2">{name}</h4>
						<h4>{code}</h4>
						<br />
						<ProgressBar
							variant={`${
								totalAttendance > 89
									? "success"
									: totalAttendance > 69
									? ""
									: totalAttendance > 50
									? "warning"
									: "danger"
							}`}
							now={totalAttendance < 1 ? 4 : totalAttendance}
							label={`${totalAttendance}%`}
						/>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
};

export default ViewStudentAttendance;

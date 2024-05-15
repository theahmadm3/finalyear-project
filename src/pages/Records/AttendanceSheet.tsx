import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { toast } from "react-toastify";

interface Sheet {
	id: number;
	first_name: string;
	last_name: string;
	student_id: number;
}
export interface AttendanceSheetProps {
	course_id: number;
}

const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ course_id }) => {
	const { token } = useContext(AuthContext);

	const [show, setShow] = useState<boolean>(false);
	const [students, setStudents] = useState<Sheet[]>([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchAttendanceSheet = async () => {
			try {
				const response = await fetch(
					`https://finalyear-project-backend.onrender.com/api/get/studentsInLecture/${course_id}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					},
				);
				const data = await response.json();
				if (!data.success) {
					toast.error("No students for this course yet");
					throw new Error("No students for this course yet");
				} else {
					setStudents(data.data);
				}
				console.log(data);
			} catch (error) {
				console.error("Error fetching details: ", error);
			}
		};

		fetchAttendanceSheet();
	}, [token, course_id]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				View <span className="dn-s">Attendance</span>
			</Button>
			<Modal centered show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					{students.length === 0 ? (
						<p>no students have attended this lecture</p>
					) : (
						<Table responsive className="ba br3">
							<thead>
								<tr className="bg-dark-blue white">
									<th>S/N</th>
									<th>Name</th>
									<th>ID</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{students.map((student, index) => (
									<tr key={index} className="bb">
										<td>{index + 1}</td>
										<td>
											{student.first_name} {student.last_name}
										</td>
										<td>{student.student_id}</td>
										<td>
											View <span className="dn-s">Attendance</span>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default AttendanceSheet;

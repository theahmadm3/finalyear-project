import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Loader from "../../components/Loader/Loader";
import Error404 from "../Error404/Error404";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AttendanceSheet from "./AttendanceSheet";

interface Lecture {
	id: number;
	timestamp: string;
	time_frame: string;
}

const Lectures: React.FC = () => {
	const { user, token } = useContext(AuthContext);

	const [waiting, setWaiting] = useState<boolean>(true);
	const [lectures, setLectures] = useState<Lecture[]>([]);

	const { id } = useParams();

	useEffect(() => {
		// When isStudent context value becomes available, update waiting state
		if (user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when isStudent changes

	useEffect(() => {
		const fetchLectures = async () => {
			try {
				const response = await fetch(
					`https://finalyear-project-backend.onrender.com/api/get/Lecturer/attendance/${id}`,
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
					toast.error("No lectures for this course yet");
					throw new Error("No lectures for this course yet");
				} else {
					setLectures(data.data);
				}
				console.log(data);
			} catch (error) {
				console.error("Error fetching details: ", error);
			}
		};

		fetchLectures();
	}, [token, id]);

	if (waiting) {
		return <Loader />;
	}

	if (user?.is_student) {
		return <Error404 />;
	} else {
		return (
			<div className="pa4-l pa3-m pa2">
				<Link to="/portal/records" className="br-100 pa1 pt3 pl2">
					<i className="material-icons mr2">arrow_back</i>
				</Link>
				<br />
				<br />
				<Table striped hover responsive className="ba br3">
					<thead>
						<tr className="bg-dark-blue white">
							<th>S/N</th>
							<th>Date</th>
							<th>Time</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{lectures.map((lecture, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{lecture.timestamp}</td>
								<td>{lecture.time_frame}</td>
								<td>
									<AttendanceSheet course_id={lecture.id} />
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
};

export default Lectures;

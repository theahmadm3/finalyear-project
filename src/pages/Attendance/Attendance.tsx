/* eslint-disable no-extra-boolean-cast */
import React, { useContext, useEffect, useState } from "react";

import { QrReader } from "react-qr-reader";
import { AuthContext } from "../../contexts/auth/AuthContext";

import { toast } from "react-toastify";

const Attendance: React.FC = () => {
	const [scanQR, setScanQR] = useState<boolean>(false);
	const [courses, setCourses] = useState<number[]>([]);

	const { user, token } = useContext(AuthContext);

	useEffect(() => {
		fetch(
			"https://finalyear-project-backend.onrender.com/api/get/student_courses",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			},
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch courses");
				}
				return response.json();
			})
			.then((apiData) => {
				const courses = apiData.enrolled;
				const coursesArray: number[] = [];
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				courses.map((course: any) => {
					coursesArray.push(course.id);
				});
				setCourses(coursesArray);
			});
	}, [token]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const takeAttendance = async (scanData: any) => {
		const email = user?.email;
		const lecture_id = 1;
		const qrData = JSON.parse(scanData);
		const courseId = qrData.course_id;

		if (!courses.includes(courseId)) {
			toast.error("You are not enrolled in this course");
			return;
		}

		toast.success(
			`"Successful Attendance" Course ID: ${courseId}, email: ${email}, lecture ID: ${lecture_id}`,
		);

		const attendanceData = {
			email: email,
			lecture_id: lecture_id,
		};

		console.log(attendanceData);
	};

	return (
		<>
			<h1>{user?.first_name}</h1>
			{!scanQR ? (
				<div className="center pa4 ma2 bn shadow-1">
					<button
						className="center br3 pa2 ma2"
						onClick={async () => {
							setScanQR(true);
						}}
					>
						Take Attendance
					</button>
				</div>
			) : (
				<div className="w-100 vh-75 flex flex-column justify-center items-center">
					<QrReader
						className="w-70"
						scanDelay={500}
						constraints={{ facingMode: "environment" }}
						onResult={(result, error) => {
							if (!!result) {
								setScanQR(false);
								takeAttendance(result);
							}

							if (!!error) {
								// alert(JSON.stringify(error));
							}
						}}
					/>
				</div>
			)}
		</>
	);
};

export default Attendance;

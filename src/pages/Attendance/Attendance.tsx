/* eslint-disable no-extra-boolean-cast */
import React, { useCallback, useContext, useEffect, useState } from "react";

import { QrReader } from "react-qr-reader";
import { AuthContext } from "../../contexts/auth/AuthContext";

import { toast } from "react-toastify";

const Attendance: React.FC = () => {
	const [scanQR, setScanQR] = useState<boolean>(false);
	const [courses, setCourses] = useState<number[]>([]);
	const [lat, setLat] = useState<number>(0);
	const [long, setLong] = useState<number>(0);

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

	const getLocation = useCallback(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLat(position.coords.latitude);
					setLong(position.coords.longitude);
				},
				(error) => {
					toast.error(error.message);
				},
			);
		} else {
			toast.error("Geolocation is not supported by your browser.");
		}
	}, []);

	useEffect(() => {
		getLocation();
	}, [getLocation]);

	const calculateDistance = (
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number,
	): number => {
		const earthRadius = 6371000; // Earth's radius in meters
		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = earthRadius * c; // Distance in meters
		return distance;
	};

	const toRadians = (degrees: number): number => {
		return degrees * (Math.PI / 180);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const takeAttendance = async (scanData: any) => {
		const lecture_id = 1;
		const qrData = await JSON.parse(scanData);
		const lecturer_lat = Number(qrData.lat);
		const lecturer_long = Number(qrData.long);
		const courseId = qrData.course_id;

		const distance = calculateDistance(lat, long, lecturer_lat, lecturer_long);
		const maxDistance = 25; // Set maximum distance threshold to 25 meters

		if (distance > maxDistance) {
			alert(`${lat} ${long}`);
			toast.error("You are not in class");
			return;
		}

		if (!courses.includes(courseId)) {
			toast.error("You are not enrolled in this course");
			return;
		}

		const attendanceData = {
			lecture: lecture_id,
		};

		const loadingToast = toast.loading("Sending attendance data");

		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/create/student/attendance",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(attendanceData),
				},
			);
			const data = await response.json();

			if (data.success) {
				toast.success("Successful Attendance");
			} else {
				toast.error(data.message);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			toast.dismiss(loadingToast);
		}
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

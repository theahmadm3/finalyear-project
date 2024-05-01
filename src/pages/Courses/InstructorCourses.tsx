import React, { useContext, useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";
import InstructorTakeAttendance from "./InstructorTakeAttendance";

import { AuthContext } from "../../contexts/auth/AuthContext";

interface Course {
	id: number;
	title: string;
	course_code: string;
}

const InstructorCourses: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorLoading, setErrorLoading] = useState<boolean>(false);

	const { token } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);

		fetch(
			"https://finalyear-project-backend.onrender.com/api/get/lecturer_courses",
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
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setCourses(data.teaching);
			})
			.catch((err) => {
				console.error("Error fetching courses: ", err);
				setErrorLoading(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [token]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : errorLoading ? (
				<p>Refresh the page, if not sign out and sign in again</p>
			) : (
				<div className="flex flex-row-ns flex-column-s flex-wrap justify-start-l justify-between w-100 pa4-l pa3">
					{courses.map((course, index) => {
						return (
							<div
								key={index}
								className="pa3 pb4 shadow-1 br4 w-48-m w-30-l w-100-s mb3 mr3-l bg-light-gray blue tc"
							>
								<div className="b-circle-s center mb2"></div>
								<p>{course.title}</p>

								<p>{course.course_code}</p>
								<p></p>
								<br />
								<InstructorTakeAttendance
									courseId={course.id}
									name={course.course_code}
								/>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default InstructorCourses;

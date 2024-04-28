import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/auth/AuthContext";

interface Course {
	title: string; // Changed from "name" to "title" to match the data structure
}

const StudentCourses: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorLoading, setErrorLoading] = useState<boolean>(false);

	const { token } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true); // Move setIsLoading(true) here to start loading before fetch

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
			.then((data) => {
				setCourses(data.enrolled);
			})
			.catch((err) => {
				console.error("Error fetching courses: ", err);
				setErrorLoading(true);
			})
			.finally(() => setIsLoading(false)); // Move setIsLoading(false) here to stop loading after fetch
	}, [token]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : errorLoading ? (
				<p>Refresh the page, if not sign out and sign in again</p>
			) : (
				<div className="flex flex-row flex-wrap justify-between w-100 pa4-l pa3">
					{courses.map((course, index) => {
						return (
							<div key={index} className="pa2 shadow-1 br4 w-45">
								Name : {course.title} <br />
								Code: {course.course_code} <br />
								Lecturer Email: {course.email} <br />
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default StudentCourses;

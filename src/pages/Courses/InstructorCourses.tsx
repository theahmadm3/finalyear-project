import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/auth/AuthContext";

interface Course {
	title: string;
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
				<p>{JSON.stringify(courses)}</p>
			)}
		</>
	);
};

export default InstructorCourses;

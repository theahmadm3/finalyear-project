import React, { useContext, useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";

import { AuthContext } from "../../contexts/auth/AuthContext";
import { Link } from "react-router-dom";

interface Course {
	id: number;
	title: string;
	course_code: string;
}

const InstructorRecords: React.FC = () => {
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
								<div
									className="b-circle-s center mb2 shadow"
									style={{
										backgroundImage: `url('https://placehold.co/600x400@3x.png?text=${encodeURIComponent(
											course.course_code,
										)}&font=roboto')`,
										backgroundPosition: "center",
										backgroundSize: "cover",
									}}
								></div>
								<p>{course.title}</p>
								<Link
									to={`/portal/lectures/${course.id}`}
									className="link black pa2 pl3 pr3 br3 bg-blue white dim"
								>
									View Lectures
								</Link>
								<br />
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default InstructorRecords;

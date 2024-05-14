import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { toast } from "react-toastify";
import ViewStudentAttendance from "./ViewStudentAttendance";

interface Course {
	id: number;
	title: string;
	course_code: string;
	email: string;
	first_name: string;
	last_name: string;
}

const StudentRecords: React.FC = () => {
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
				toast.error("Network Error");
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
				<div className="flex flex-row-ns flex-column-s flex-wrap justify-start-l justify-between w-100 pa4-l pa3">
					{courses.map((course, index) => {
						return (
							<div
								key={index}
								className="ba b--moon-gray pa3 pb4 shadow-1 br4 w-48-m w-30-l w-100-s mb3 mr3-l bg-light-gray blue tc"
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

								{/* <p>{course.course_code}</p> */}
								<br />
								{/* {course.first_name} <br />
								{course.last_name} <br /> */}
								<ViewStudentAttendance
									courseId={course.id}
									name={course.title}
									code={course.course_code}
								/>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default StudentRecords;

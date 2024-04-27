import React, { useEffect } from "react";

const StudentCourses: React.FC = () => {
	useEffect(() => {
		fetch(
			"https://finalyear-project-backend.onrender.com/api/get/lecturer_courses",
		)
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, []);
	return <>StudentCourses</>;
};

export default StudentCourses;

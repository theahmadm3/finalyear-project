import React from "react";
import ReactDOM from "react-dom/client";

// using cdn and link tag in the html file for styles

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";

import AuthProvider from "./contexts/auth/AuthContext.tsx";
import Lecturer from "./contexts/auth/Lecturer.tsx";

import App from "./App.tsx";
import InstructorLogin from "./pages/Login/InstructorLogin.tsx";
import StudentLogin from "./pages/Login/StudentLogin.tsx";
import Home from "./pages/HomePage/Home.tsx";
import ErrorLoading from "./components/Loader/ErrorLoading.tsx";
import StudentProfile from "./pages/Profile/StudentProfile.tsx";
import InstructorProfile from "./pages/Profile/LecturerProfile.tsx";
import StudentCourses from "./pages/Courses/StudentCourses.tsx";
import InstructorCourses from "./pages/Courses/InstructorCourses.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/student-login",
		element: <StudentLogin />,
	},
	{
		path: "/login",
		element: <InstructorLogin />,
	},
	{
		path: "/portal",
		element: <Home />,
		children: [
			{
				path: "student-profile",
				element: <StudentProfile />,
			},
			{
				path: "instructor-profile",
				element: <InstructorProfile />,
			},
			{
				path: "courses-learning",
				element: <StudentCourses />,
			},
			{
				path: "courses-teaching",
				element: <InstructorCourses />,
			},
		],
	},
	{
		path: "*",
		element: <ErrorLoading />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<Lecturer>
				<RouterProvider router={router} />
			</Lecturer>
		</AuthProvider>
	</React.StrictMode>,
);

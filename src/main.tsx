import React from "react";
import ReactDOM from "react-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";

import AuthProvider from "./contexts/auth/AuthContext.tsx";

import App from "./App.tsx";
import InstructorLogin from "./pages/Login/InstructorLogin.tsx";
import StudentLogin from "./pages/Login/StudentLogin.tsx";
import Home from "./pages/HomePage/Home.tsx";
import Courses from "./pages/Courses/Courses.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Error404 from "./pages/Error404/Error404.tsx";
import Attendance from "./pages/Attendance/Attendance.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
				path: "profile",
				element: <Profile />,
			},
			{
				path: "courses",
				element: <Courses />,
			},
			{
				path: "attendance",
				element: <Attendance />,
			},
		],
	},
	{
		path: "*",
		element: <Error404 />,
	},
]);

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
		<ToastContainer />
	</React.StrictMode>,
	document.getElementById("root"),
);

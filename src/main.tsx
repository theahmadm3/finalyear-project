import React from "react";
import ReactDOM from "react-dom/client";

// using cdn and link tag in the html file for styles 

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import InstructorLogin from "./pages/Login/InstructorLogin.tsx";
import StudentLogin from "./pages/Login/StudentLogin.tsx";
import Home from "./pages/HomePage/Home.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/student-login',
    element: <StudentLogin />
  },
  {
    path: '/login',
    element: <InstructorLogin />
  },
  {
    path: '/home',
    element: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

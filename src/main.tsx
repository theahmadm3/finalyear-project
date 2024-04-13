import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import InstructorLogin from "./pages/Login/InstructorLogin.tsx";
import StudentLogin from "./pages/Login/StudentLogin.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { capitalizeFirst } from "../../components/someFunctions/capitalizeFirst";

interface UserData {
	isStudent: boolean;
}

interface AuthContextType {
	isLoggedIn: boolean;
	user: UserData | null;
	instructor: UserData | null;
	token: string | null;
	login: (credentials: { email: string; password: string }) => Promise<void>; // Adjust return type
	studentLogin: (credentials: {
		email: string;
		password: string;
	}) => Promise<void>;
	logout: () => void;
	authError: string;
	isStudent: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	user: null,
	instructor: null,
	token: null,
	login: async () => {},
	logout: () => {},
	studentLogin: async () => {},
	authError: "Try again",
	isStudent: false,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
		!!localStorage.getItem("token"),
	);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	); // Simplified token initialization
	const [user, setUser] = useState<UserData | null>(null);
	const [instructor, setInstructor] = useState<UserData | null>(null);
	const [authError, setAuthError] = useState<string>("Try again"); // Change to camelCase for consistency
	const [isStudent, setIsStudent] = useState<boolean>(false);

  //in case of refresh fetching user data and login state
	useEffect(() => {
		const checkIsLoggedIn = localStorage.getItem("token");
		if (checkIsLoggedIn) {
			setToken(checkIsLoggedIn);
			fetchStudentData(checkIsLoggedIn);
			fetchInstructorData(checkIsLoggedIn);
		}
	}, []);

  //fetching student data
	const fetchStudentData = async (token: string) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/get/student",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = await response.json();
			const userData = data.user;
			setUser(userData);
			setIsStudent(userData.is_student);
			console.log(data);
		} catch (error) {
			console.error("Error fetching user data: ", error);
		}
	};

  //fetching instructor data
	const fetchInstructorData = async (token: string) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/get/lecturer",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = await response.json();
			const userData = data.user;
			setInstructor(userData);
			setIsStudent(false);
			console.log(data);
		} catch (error) {
			console.error("Error fetching user data: ", error);
		}
	};

  //Instructor login
	const login = async (credentials: { email: string; password: string }) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/login/lecturer",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(credentials),
				},
			);

			const data = await response.json();
			const accessToken = data.access;

			// Store token in local storage
			localStorage.setItem("token", accessToken);

			setToken(accessToken);
			fetchInstructorData(accessToken);
			setIsLoggedIn(true);
			setIsStudent(false);

			return data; // Return any additional data if needed
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	//Student login
	const studentLogin = async (credentials: {
		email: string;
		password: string;
	}) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/login/student",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(credentials),
				},
			);

			const data = await response.json();
			const accessToken = data.access;

			// Store token in local storage
			localStorage.setItem("token", accessToken);

			setToken(accessToken);
			fetchStudentData(accessToken);
			setIsLoggedIn(true);
			setIsStudent(true);

			return data; // Return any additional data if needed
		} catch (error) {
			console.error("Login failed:", error);
			throw error; // Re-throw the error for handling in the component
		}
	};

	//Logout
	const logout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				login,
				studentLogin,
				user,
				instructor,
				token,
				authError,
				isStudent,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

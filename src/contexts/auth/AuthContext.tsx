/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from "react";

interface User {
	first_name: string;
	last_name: string;
	level: number;
	student_id: number;
	is_student: boolean;
	department: string;
	country: string;
	email: string;
	phone_number: string;
}

interface AuthContextType {
	isLoggedIn: boolean;
	user: User | null;
	token: string | null;
	login: (credentials: { email: string; password: string }) => Promise<void>; // Adjust return type
	studentLogin: (credentials: {
		email: string;
		password: string;
	}) => Promise<void>;
	logout: () => void;
	authError: string;
}

export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	user: null,
	token: null,
	login: async () => {},
	logout: () => {},
	studentLogin: async () => {},
	authError: "Try again",
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const token = localStorage.getItem("token");
		return token !== null && token !== undefined;
	});

	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	); // Simplified token initialization
	const [user, setUser] = useState<User | null>(null);

	const [authError, setAuthError] = useState<string>("Try again"); // Change to camelCase for consistency

	//in case of refresh fetching user data and login state
	useEffect(() => {
		const checkIsLoggedIn = localStorage.getItem("token");

		if (checkIsLoggedIn && checkIsLoggedIn !== undefined) {
			setToken(checkIsLoggedIn);

			fetchUserData(checkIsLoggedIn);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const fetchUserData = async (token: string) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/get/user",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const data = await response.json();
			const userData = data.data;
			setUser(userData);
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
			if (data.access) {
				const accessToken = data.access;

				// Store token in local storage
				localStorage.setItem("token", accessToken);

				setToken(accessToken);
				fetchUserData(accessToken);
				setIsLoggedIn(true);
				return data;
			}
		} catch (error: any) {
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

			const data: any = await response.json();

			if (data.access) {
				const accessToken = data.access;

				// Store token in local storage
				localStorage.setItem("token", accessToken);

				setToken(accessToken);
				fetchUserData(accessToken);
				setIsLoggedIn(true);
				return data;
			}
		} catch (error: any) {
			console.error("Login failed:", error);
			setAuthError(error);
			throw error;
		}
	};

	//Logout
	const logout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		window.location.reload();
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				login,
				studentLogin,
				user,
				token,
				authError,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

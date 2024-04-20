import React, { createContext, useEffect, useState } from "react";
import { capitalizeFirst } from "../../components/someFunctions/capitalizeFirst";

interface UserData {
	isStudent: boolean;
}

interface AuthContextType {
	isLoggedIn: boolean;
	user: UserData | null;
	token: string | null;
	login: (credentials: { email: string; password: string }) => Promise<void>; // Adjust return type
	studentLogin: (credentials: {
		email: string;
		password: string;
	}) => Promise<void>;
	authError: string;
	isStudent: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	user: null,
	token: null,
	login: async () => {},
	studentLogin: async () => {},
	authError: "Try again",
	isStudent: false,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Removed unnecessary 'any' type
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
		!!localStorage.getItem("token"),
	);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	); // Simplified token initialization
	const [user, setUser] = useState<UserData | null>(null);
	const [authError, setAuthError] = useState<string>("Try again"); // Change to camelCase for consistency
	const [isStudent, setIsStudent] = useState<boolean>(false);

	useEffect(() => {
		const checkIsLoggedIn = localStorage.getItem("token");
		if (checkIsLoggedIn) {
			setToken(checkIsLoggedIn);
			fetchUserData(checkIsLoggedIn);
		}
	}, []);

	const fetchUserData = (token: string) => {
		fetch("https://finalyear-project-backend.onrender.com/api/get/student", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}
				return response.json();
			})
			.then((data) => {
				const userData = data.data.user;
				setUser(userData);
				setIsStudent(userData.isStudent); // Update isStudent state
			})
			.catch((error) => {
				console.error("Error fetching user data: ", error);
			});
	};

	const login = async (credentials: { email: string; password: string }) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/lecturer/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(credentials),
				},
			);
			const data = await response.json();

			if (data.success) {
				localStorage.setItem("token", data.data.token);
				setToken(data.data.token);
				setUser(data.data.user);
				setIsLoggedIn(true);
			} else {
				setAuthError(capitalizeFirst(data.message)); // Update authError state
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Login failed:", error.message);
		}
	};
	const studentLogin = async (credentials: {
		email: string;
		password: string;
	}) => {
		try {
			const response = await fetch(
				"https://finalyear-project-backend.onrender.com/api/lecturer/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(credentials),
				},
			);
			const data = await response.json();

			if (data.success) {
				localStorage.setItem("token", data.data.token);
				setToken(data.data.token);
				setUser(data.data.user);
				setIsLoggedIn(true);
			} else {
				setAuthError(capitalizeFirst(data.message)); // Update authError state
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Login failed:", error.message);
		}
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
				isStudent,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

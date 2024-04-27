/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from "react";

interface UserData {
	isStudent: boolean;
}

interface LecturerContextType {
	isLoggedIn: boolean;
	instructor: UserData | null;
	token: string | null;
	isStudent: boolean;
}

export const LecturerContext = createContext<LecturerContextType>({
	isLoggedIn: false,
	instructor: null,
	token: null,
	isStudent: false,
});

const Lecturer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const token = localStorage.getItem("token");
		return token !== null && token !== undefined;
	});
	console.log(isLoggedIn);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	); // Simplified token initialization
	const [instructor, setInstructor] = useState<UserData | null>(null);
	const [isStudent, setIsStudent] = useState<boolean>(false);

	//in case of refresh fetching user data and login state
	useEffect(() => {
		const checkIsLoggedIn = localStorage.getItem("token");
		if (checkIsLoggedIn && checkIsLoggedIn !== undefined) {
			setToken(checkIsLoggedIn);
			fetchInstructorData(checkIsLoggedIn);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

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

	return (
		<LecturerContext.Provider
			value={{
				instructor,
				isStudent,
				token,
				isLoggedIn,
			}}
		>
			{children}
		</LecturerContext.Provider>
	);
};

export default Lecturer;

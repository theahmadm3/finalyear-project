import React, { useState, useEffect, useContext } from "react";
import PhoneSideBar from "../SideBar/PhoneSideBar";

import { AuthContext } from "../../contexts/auth/AuthContext";
import { LecturerContext } from "../../contexts/auth/Lecturer";

const PhoneHeader: React.FC = () => {
	const { user } = useContext(AuthContext);
	const { instructor } = useContext(LecturerContext);

	const [waiting, setWaiting] = useState(true);

	const profilePicture = `https://robohash.org/${
		waiting ? "" : user.first_name
	}`;

	const profilePic = {
		backgroundImage: `url(${profilePicture})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		width: "50px",
		height: "50px",
		border: "1px solid white",
		borderRadius: "50%",
	};

	useEffect(() => {
		// When user or instructor context value becomes available, update waiting state
		if (user !== null || instructor !== null) {
			setWaiting(false);
		}
	}, [user, instructor]); // Update waiting state when user or instructor changes

	if (waiting) {
		return (
			<div className="w-100 bg-dark-blue pa2 inline-flex justify-between items-center pt3"></div>
		);
	}
	const firstName = user
		? user.is_student
			? user.first_name
			: ""
		: instructor
		? instructor.first_name
		: "";

	return (
		<div className="w-100 inline-flex justify-between items-center">
			<PhoneSideBar />
			<p className="pt2">Welcome {firstName}</p>
			<div style={profilePic} className="shadow-1 ba pa2 mr3"></div>
		</div>
	);
};

export default PhoneHeader;

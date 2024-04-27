import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";
import { LecturerContext } from "../../contexts/auth/Lecturer";

const Header: React.FC = () => {
	const { user, isStudent } = useContext(AuthContext);
	const { instructor } = useContext(LecturerContext);

	const [waiting, setWaiting] = useState(true);

	const profilePicture =
		"https://images.unsplash.com/photo-1471123327422-e370dc57a3da";

	useEffect(() => {
		// When user context value becomes available, update waiting state
		if (user !== null || instructor !== null) {
			setWaiting(false);
		}
	}, [user, instructor]); // Update waiting state when user changes

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

	if (waiting) {
		return (
			<div className="w-100 bg-dark-blue pa2 inline-flex justify-between items-center pt3"></div>
		);
	}
	return (
		<div className="w-100 bg-dark-blue pa2 inline-flex justify-between items-center pt3 pl3 pr3">
			<p>Welcome {isStudent ? user.first_name : instructor.first_name}</p>
			<div
				style={profilePic}
				className="shadow-1 flex justify-center ba pa2 mr3"
			></div>
		</div>
	);
};

export default Header;

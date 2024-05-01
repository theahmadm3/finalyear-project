import React, { useState, useEffect, useContext } from "react";
import PhoneSideBar from "../SideBar/PhoneSideBar";

import { AuthContext } from "../../contexts/auth/AuthContext";

const PhoneHeader: React.FC = () => {
	const { user } = useContext(AuthContext);

	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When user or instructor context value becomes available, update waiting state
		if (user !== null && user !== undefined) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when user or instructor changes

	if (waiting) {
		return (
			<div className="w-100 bg-dark-blue pa2 inline-flex justify-between items-center pt3"></div>
		);
	}

	const profilePicture = `https://robohash.org/${
		waiting ? "" : user?.first_name
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

	return (
		<div className="w-100 inline-flex justify-between items-center">
			<PhoneSideBar />
			<h3>MJU</h3>
			<p className="pt2">Welcome, {user?.first_name}</p>
			<div style={profilePic} className="shadow-1 ba pa2 mr3"></div>
		</div>
	);
};

export default PhoneHeader;

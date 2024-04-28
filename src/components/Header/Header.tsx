import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";

const Header: React.FC = () => {
	const { user } = useContext(AuthContext);

	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When either user or instructor context value becomes available, update waiting state
		if (user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when user or instructor changes

	const profilePicture =
		"https://images.unsplash.com/photo-1471123327422-e370dc57a3da";

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
		<div
			className={`w-100 bg-dark-blue pa2 inline-flex justify-between items-center pt3 pl3 pr3 ${
				waiting ? "" : "pl3 pr3"
			}`}
		>
			<p>Welcome, {waiting ? "" : user?.first_name}</p>
			<div
				style={profilePic}
				className="shadow-1 flex justify-center ba pa2 mr3"
			></div>
		</div>
	);
};

export default Header;

import React, { useContext, useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/auth/AuthContext";

const InstructorProfile: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When instructor context value becomes available, update waiting state
		if (user !== null && user !== undefined) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when user changes

	if (waiting) {
		return <Loader />;
	}
	const profilePicture = `https://robohash.org/${
		waiting ? "" : user?.first_name
	}`;
	const profilePic = {
		backgroundImage: `url(${profilePicture})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	return (
		<div className="w-100 flex flex-column pa2">
			<section className="profile w-100 flex flex-row-ns items-center-ns flex-column-s pa2">
				<div
					style={profilePic}
					className="b-circle shadow-1 flex justify-center ba pa2 mr3 mb2"
				></div>
				<br className="dn-ns"></br>
				<div className="ml3-ns">
					<p className="b ">
						{user?.first_name} {user?.last_name}
					</p>
					<p className="">
						<span className="b">Department:</span>
						{user?.department}
					</p>
				</div>
			</section>
			<section className="about w-80-l br3 shadow-1 bg-dark-blue white">
				<div className="pa1 pl2 pr2 inline-flex items-center justify-between w-100 bb b--moon-gray">
					<p className="f4-ns b">About Me</p>
					<p className="b">Edit</p>
				</div>
				<div className="pa2 flex flex-row-ns justify-between-ns flex-column-s w-100">
					<div className="pa2 w-25-ns w-100">
						<p className="b">Country</p>
						<p>{user?.country}</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Phone</p>
						<p>{user?.phone_number}</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Email</p>
						<p>{user?.email}</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default InstructorProfile;

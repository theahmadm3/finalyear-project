import React, { useContext, useState, useEffect } from "react";
import ProfileImage from "../../assets/react.svg";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Loader from "../../components/Loader/Loader";

const StudentProfile: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState(true);

	const profilePicture =
		"https://images.unsplash.com/photo-1471123327422-e370dc57a3da";

	useEffect(() => {
		// When user context value becomes available, update waiting state
		if (user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when user changes

	const profilePic = {
		backgroundImage: `url(${profilePicture})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	console.log(user);

	if (waiting) {
		return <Loader />;
	}

	return (
		<div className="w-100 flex flex-column pa2 min-vh-100">
			<section className="profile w-100 flex flex-row-ns items-center-ns flex-column-s pa2">
				<div
					style={profilePic}
					className="b-circle shadow-1 flex justify-center ba pa2 mr3"
				></div>
				<br className="dn-ns"></br>
				<div className="ml3-ns">
					<p className="b ">
						{user.first_name} {user.last_name}
					</p>
					<p className="">Student | Year {user.level}</p> <br />
					<p className="w-100">
						<span className="b">ID:</span> {user.student_id}{" "}
						<span className="dn-s">|</span> <br className="dn-ns"></br>
						<br className="dn-ns"></br> <span className="b">Department:</span>{" "}
						{user.department}
					</p>
				</div>
			</section>
				<br className="dn-s"></br>
			<section className="about w-80-l br3 shadow-1 bg-dark-blue white pa2-ns">
				<div className="pa1 pl2 pr2 inline-flex items-center justify-between w-100 bb b--moon-gray">
					<p className="f4-ns b">About Me</p>
					<p className="b">Edit</p>
				</div>
				<div className="pa2 flex flex-row-ns justify-between-ns flex-column-s w-100">
					<div className="pa2 w-25-ns w-100">
						<p className="b">Country</p>
						<p>{user.country}</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Phone</p>
						<p>{user.phone_number}</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Email</p>
						<p>{user.email}</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default StudentProfile;

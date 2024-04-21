import React, { useContext, useState, useEffect } from "react";
import ProfileImage from "../../assets/react.svg";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Loader from "../../components/Loader/Loader";

const InstructorProfile: React.FC = () => {
	const { instructor } = useContext(AuthContext);
	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When instructor context value becomes available, update waiting state
		if (instructor !== null) {
			setWaiting(false);
		}
	}, [instructor]); // Update waiting state when instructor changes

	const profilePic = {
		backgroundImage: `url(${ProfileImage})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	if (waiting) {
		return <Loader />;
	}
    console.log(instructor)

	return (
		<div className="w-100 flex flex-column pa2">
			<section className="profile w-100 flex flex-row-ns items-center-ns flex-column-s pa2">
				<div
					style={profilePic}
					className="b-circle flex justify-center ba pa2 mr3 mb2"
				></div>
				<br className="dn-ns"></br>
				<div className="ml3-ns">
					<p className="b ">
						{instructor.first_name} {instructor.last_name}
					</p>
					<p className="">
						<span className="b">Department: </span>{instructor.department}
					</p>
				</div>
			</section>
			<section className="about w-80-l br3 ba b--moon-gray">
				<div className="pa1 pl2 pr2 inline-flex items-center justify-between w-100 bb b--moon-gray">
					<p className="f4-ns b">About Me</p>
					<p className="b">Edit</p>
				</div>
				<div className="pa2 flex flex-row-ns justify-between-ns flex-column-s w-100">
					<div className="pa2 w-25-ns w-100">
						<p className="b">Country</p>
						<p>{instructor.country}</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Phone</p>
						<p>{instructor.phone_number}</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Email</p>
						<p>{instructor.email}</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default InstructorProfile;

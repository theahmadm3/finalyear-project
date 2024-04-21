import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import StudentProfile from "./StudentProfile";
import InstructorProfile from "./LecturerProfile";
import Loader from "../../components/Loader/Loader";

const Profile: React.FC = () => {
	const { isStudent } = useContext(AuthContext);
	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When isStudent context value becomes available, update waiting state
		if (isStudent !== undefined) {
			setWaiting(false);
		}
	}, [isStudent]); // Update waiting state when isStudent changes

	console.log(isStudent)

	if (waiting) {
		return <Loader />;
	}

	return isStudent ? <StudentProfile /> : <InstructorProfile />;
};

export default Profile;

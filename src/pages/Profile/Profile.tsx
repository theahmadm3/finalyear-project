import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import StudentProfile from "./StudentProfile";
import InstructorProfile from "./LecturerProfile";
import Loader from "../../components/Loader/Loader";

const Profile: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When isStudent context value becomes available, update waiting state
		if (user !== undefined && user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when isStudent changes

	if (waiting) {
		return <Loader />;
	}

	return user?.is_student ? <StudentProfile /> : <InstructorProfile />;
};

export default Profile;

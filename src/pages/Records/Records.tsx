import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Loader from "../../components/Loader/Loader";
import StudentRecords from "./StudentRecords";
import InstructorRecords from "./InstructorRecords";

const Records: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState(true);

	useEffect(() => {
		// When isStudent context value becomes available, update waiting state
		if (user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when isStudent changes

	if (waiting) {
		return <Loader />;
	}

	return user?.is_student ? <StudentRecords /> : <InstructorRecords />;
};

export default Records;

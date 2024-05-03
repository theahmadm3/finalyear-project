/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";

import Loader from "../../components/Loader/Loader";

const Attendance: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState<boolean>(true);

	useEffect(() => {
		if (user !== undefined && user !== null) {
			setWaiting(false);
		}
	}, [user]);

	if (waiting) {
		return <Loader />;
	}

	return (
		<>
			{JSON.stringify(user)}
			<button>Take Attendance</button>
		</>
	);
};

export default Attendance;

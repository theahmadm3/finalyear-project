/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";
import { QrReader } from "@chaiwei/react-qr-reader";

import Loader from "../../components/Loader/Loader";

const Attendance: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState<boolean>(true);
	const [data, setData] = useState<string>("No result");

	useEffect(() => {
		// When isStudent context value becomes available, update waiting state
		if (user !== undefined && user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when isStudent changes

	if (waiting) {
		return <Loader />;
	}

	return (
		<>
			<QrReader
				onResult={(result: { text: string }, error: any) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						console.info(error);
					}
				}}
				style={{ width: "100%" }}
			/>
			<p>{data}</p>
		</>
	);
};

export default Attendance;

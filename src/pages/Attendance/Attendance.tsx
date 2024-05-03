/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";

import Loader from "../../components/Loader/Loader";
import { QrReader, OnResultFunction } from "react-qr-reader";

const Attendance: React.FC = () => {
	const { user } = useContext(AuthContext);
	const [waiting, setWaiting] = useState<boolean>(true);
	// const [qrCodeData, setQrCodeData] = useState<string | null>(null);

	useEffect(() => {
		// When isStudent context value becomes available, update waiting state
		if (user !== undefined && user !== null) {
			setWaiting(false);
		}
	}, [user]); // Update waiting state when isStudent changes

	const handleScan: OnResultFunction = (qrResult: any, error: any) => {
		if (qrResult) {
			alert(qrResult.getText());
		} else {
			console.error(error);
		}
	};

	// const handleError = (error: any) => {
	// 	console.error(error);
	// };

	if (waiting) {
		return <Loader />;
	}

	return (
		<>
			<QrReader
				className="w-50"
				onResult={handleScan}
				constraints={{ facingMode: "environment" }}
				scanDelay={300}
			/>
			{/* <p>{qrCodeData}</p> */}
		</>
	);
};

export default Attendance;

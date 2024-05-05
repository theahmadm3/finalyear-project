/* eslint-disable no-extra-boolean-cast */
import React, { useContext, useState } from "react";

import { QrReader } from "react-qr-reader";
import { AuthContext } from "../../contexts/auth/AuthContext";

const Attendance: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [scanQR, setScanQR] = useState<boolean>(false);

	const { user } = useContext(AuthContext);

	return (
		<>
			<h1>{user?.first_name}</h1>
			{!scanQR ? (
				<div className="center pa4 ma2 bn shadow-1">
					<button
						className="center br3 pa2 ma2"
						onClick={async () => {
							setScanQR(true);
						}}
					>
						Take Attendance
					</button>
				</div>
			) : (
				<div className="w-100 vh-75 flex flex-column justify-center items-center">
					<QrReader
						className="w-70"
						scanDelay={500}
						constraints={{ facingMode: "environment" }}
						onResult={(result, error) => {
							if (!!result) {
								setScanQR(false);
								alert(result);
								setData(result);
							}

							if (!!error) {
								// alert(JSON.stringify(error));
							}
						}}
					/>
				</div>
			)}
			{data === null ? "no data yet" : JSON.stringify(data)}
		</>
	);
};

export default Attendance;

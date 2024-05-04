/* eslint-disable no-extra-boolean-cast */
// /* eslint-disable no-extra-boolean-cast */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react";

// import { AuthContext } from "../../contexts/auth/AuthContext";

// import Loader from "../../components/Loader/Loader";
// import { QrReader } from "react-qr-reader";

// const Attendance: React.FC = () => {
// 	const { user } = useContext(AuthContext);
// 	const [waiting, setWaiting] = useState<boolean>(true);

// 	useEffect(() => {
// 		if (user !== undefined && user !== null) {
// 			setWaiting(false);
// 		}
// 	}, [user]);

// 	if (waiting) {
// 		return <Loader />;
// 	}

// 	return (
// 		<>
// 			{JSON.stringify(user)}
// 			<QrReader
// 				scanDelay={500}
// 				constraints={{ facingMode: "environment" }}
// 				onResult={(result, error) => {
// 					if (!!result) {
// 						alert(result);
// 					}

// 					if (!!error) {
// 						alert(JSON.stringify(error));
// 					}
// 				}}
// 			/>
// 		</>
// 	);
// };

// export default Attendance;

import { QrReader } from "react-qr-reader";

// import getDistance from 'geolib/es/getDistance';

function Attendance() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [scanQR, setScanQR] = useState<boolean>(false);

	return (
		<>
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
				<>
					<QrReader
						className="w-50"
						scanDelay={500}
						constraints={{ facingMode: "environment" }}
						onResult={(result, error) => {
							if (!!result) {
								setScanQR(false);
								setData(result);
							}

							if (!!error) {
								alert(JSON.stringify(error));
							}
						}}
					/>
					{data}
				</>
			)}
		</>
	);
}

export default Attendance;

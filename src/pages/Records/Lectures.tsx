import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Loader from "../../components/Loader/Loader";
import Error404 from "../Error404/Error404";
import { Table } from "react-bootstrap";

const Lectures: React.FC = () => {
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
	if (user?.is_student) {
		return <Error404 />;
	} else {
		return (
			<div className="pa4-l pa3-m pa2">
				<Table striped hover responsive className="ba br3">
					<thead>
						<tr className="bg-dark-blue white">
							<th>S/N</th>
							<th>Course Code</th>
							<th>Course Name</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>1234</td>
							<td>12345678</td>
							<td className="pointer dn-s tc">View Attendance List</td>
							<td className="pointer dn-ns">•••</td>
						</tr>
						<tr>
							<td>1</td>
							<td>1234</td>
							<td>12345678</td>
							<td className="pointer dn-s tc">View Attendance List</td>
							<td className="pointer dn-ns">•••</td>
						</tr>
						<tr>
							<td>1</td>
							<td>1234</td>
							<td>12345678</td>
							<td className="pointer dn-s tc">View Attendance List</td>
							<td className="pointer dn-ns">•••</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
};

export default Lectures;

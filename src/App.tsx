import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
	return (
		<div className="vh-100 w-100 flex flex-column justify-center items-center">
			<h1 className="tc pa2">Welcome, Please choose your type of user below</h1>
			<div className="inline-flex pl2 pr2 justify-around w-100 f3">
				<Link to='login'>Instructor</Link> <Link to='student-login'>Student</Link>
			</div>
		</div>
	);
};

export default App;

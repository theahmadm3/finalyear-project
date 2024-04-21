import React from "react";
import "../../styles/loader.css";

const Loader: React.FC = () => {
	return (
		<div className="loader-container mt5">
			<div className="loader"></div>
			<div className="loader-text">Loading...</div>
		</div>
	);
};

export default Loader;

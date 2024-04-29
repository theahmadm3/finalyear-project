import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

function Error404() {
	return (
		<>
			<Header />
			<div className="vh-75 pb5 bg-light-blue white flex flex-column items-center justify-center">
				<h1 className="f1 b">404</h1>
				<h1>Page Not Found</h1>
				<Link
					to="/portal/profile"
					className="white dim w-fc pr4 pl4 pa3 link bg-dark-blue"
				>
					Go Back to Homepage
				</Link>
			</div>
		</>
	);
}

export default Error404;

import React, { useState, useEffect, useContext } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import PhoneHeader from "../../components/Header/PhoneHeader";
import { AuthContext } from "../../contexts/auth/AuthContext";

interface WindowSize {
	width: number;
}

const Home: React.FC = () => {
	const { isLoggedIn } = useContext(AuthContext);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
	});

	console.log(windowSize);

	useEffect(() => {
		const updateWindowSize = () => {
			setWindowSize({
				width: window.innerWidth,
			});
		};

		window.addEventListener("resize", updateWindowSize);

		return () => {
			window.removeEventListener("resize", updateWindowSize);
		};
	}, []);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate(pathname ==  "/login" ? "/login" : "/student-login");
		}
	}, [isLoggedIn, navigate, pathname]);

	return isLoggedIn ? (
		windowSize.width < 1000 ? (
			// View for smaller screens (mostly phones and tablets)
			<div className="w-100 sticky top-0 bottom-0 flex flex-column vh-100">
				<div className="bg-dark-blue white z-5 sticky top-0 left-0 w-100 inline-flex justify-between pa2">
					<PhoneHeader />
				</div>
				<div className="w-100 overflow-scroll bg-white-20">
					<Outlet />
				</div>
			</div>
		) : (
			// View for larger screens (mostly computers)
			<div className="w-100 vh-100 inline-flex justify-between sticky top-0 bottom-0 overflow-hidden">
				<div className="w-25 pa2 bg-dark-blue white">
					<p className="mb4 flex items-center justify-center f3">
						MJ University
					</p>
					<SideBar />
				</div>
				<div className="w-75 flex flex-column overflow-auto">
					<div className="sticky white top-0 left-0 w-100 bg-dark-blue">
						<Header />
					</div>
					<section className="w-100 overflow-auto pa2 br3">
						<Outlet />
					</section>
				</div>
			</div>
		)
	) : null;
};

export default Home;

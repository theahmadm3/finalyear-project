import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import PhoneHeader from "../../components/Header/PhoneHeader";

interface WindowSize {
	width: number;
}

const Home: React.FC = () => {
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

	return windowSize.width < 1000 ? (
		// View for smaller screens (mostly phones and tablets)
		<div className="w-100 sticky top-0 bottom-0 flex flex-column">
			<div className="bg-white z-5 sticky top-0 left-0 w-100 inline-flex justify-between pa2 ba">
				<PhoneHeader />
			</div>
			<div className="w-100 overflow-scroll">
				<Outlet />
			</div>
		</div>
	) : (
		// View for larger screens (mostly computers)
		<div className="w-100 vh-100 inline-flex justify-between pt1 sticky top-0 bottom-0 overflow-hidden">
			<div className="w-20 pa2 bt br">
				<p>Menu</p>
				<SideBar />
			</div>
			<div className="w-80 flex flex-column pa2 overflow-auto">
				<div className="sticky top-0 left-0 w-100">
					<Header />
				</div>
				<section className="w-100 overflow-auto">
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default Home;

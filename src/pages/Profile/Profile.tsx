import React from "react";

import ProfileImage from "../../assets/react.svg";

const Profile: React.FC = () => {
	const profilePic = {
		backgroundImage: `url(${ProfileImage})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	return (
		<div className="w-100 flex flex-column pa2">
			<section className="profile w-100 flex flex-row-ns items-center-ns flex-column-s pa2">
				<div
					style={profilePic}
					className="b-circle flex justify-center ba pa2 mr3"
				>
					{/* <img src={ProfileImage} /> */}
				</div>
				<br className="dn-ns"></br>
				<div className="ml3-ns">
					<p className="b ">Ahmad Muhammad</p>
					<p className="f7">Student | Year 4</p> <br />
					<p className="f7 w-100">
						ID: 1234567890 | Department: Computer Science
					</p>
				</div>
			</section>
			<section className="about w-80-l br3 ba b--moon-gray">
				<div className="pa1 pl2 pr2 inline-flex items-center justify-between w-100 bb b--moon-gray">
					<p className="f4-ns b">About Me</p>
					<p className="b">Edit</p>
				</div>
				<div className="pa2 flex flex-row-ns justify-between-ns flex-column-s w-100">
					<div className="pa2 w-25-ns w-100">
						<p className="b">Country</p>
						<p>Nigeria</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						
                    <p className="b">Phone</p>
						<p>08186690024</p>
					</div>
					<div className="pa2 w-25-ns w-100">
						<p className="b">Email</p>
						<p>theahmadm3@gmail.com</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Profile;

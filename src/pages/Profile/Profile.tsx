import React from "react";

import ProfileImage from "../../assets/react.svg";

const Profile: React.FC = () => {
	return (
		<div className="w-100 flex flex-column pa2">
			<section className="profile w-100 flex flex-row-ns items-center-ns flex-column-s pa2">
				<div className="b-circle flex justify-center ba pa2 mr3">
					<img src={ProfileImage} />
				</div>
				<div className="ml3">
					<p className="b ">Name LastName</p>
					<p className="f7">Student</p> <br />
					<p className="f7 w-100">Email: name@mail.com | Phone: +234 801286729800 </p>
				</div>
			</section>
			<section className="about w-100 br3 ba b--gray">
				<div className="pa1 pl2 pr2 inline-flex items-center justify-between w-100 bb">
                <p className="f4 b">About Me</p>
                    <p className="b">Edit</p>
                </div>
				<div className="pa2 flex flex-row-ns justify-between-ns flex-column-s w-100">
                <div className="pa2 w-25-ns w-100"></div>
					<div className="pa2 w-25-ns w-100"></div>
					<div className="pa2 w-25-ns w-100"></div>
					<div className="pa2 w-25-ns w-100"></div>
				</div>
			</section>
		</div>
	);
};

export default Profile;

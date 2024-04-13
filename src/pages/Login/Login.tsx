import React from "react";

const Login: React.FC = () => {
	return (
		<div className="flex flex-column bg-dark-blue justify-center items-center w-100 vh-100">
			<form className="pa2 ba br3 w-50-l w-70-ns w-100 white">
                <h2 className="tc">Student Login</h2>
				<div className='pa2 w-100 f4'>
                    <label htmlFor='student_id'>Student ID</label>
                    <input
                     type='text' id='student_id'
                    className='pa2 w-100 br3 bg-white f4 black fluent-input bg-animate mt2'
                    placeholder='Student Id' 
                    />
                </div>
				<div className='pa2 w-100 f4'>
                    <label htmlFor='student_password'>Password</label>
                    <input
                     type='password' id='student_password'
                    className='pa2 w-100 br3 bg-white f4 black fluent-input bg-animate mt2'
                    placeholder='Password' 
                    />
                </div>
                <div className="pa2 mt4 flex justify-center items-center">
                    <button className="w-fc bn bg-blue white pointer pa2 pl3 pr3 br2"> Login </button>
                </div>
			</form>
		</div>
	);
};

export default Login;

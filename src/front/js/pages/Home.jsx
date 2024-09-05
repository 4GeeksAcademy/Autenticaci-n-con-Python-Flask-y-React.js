import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import {Link}from "react-router-dom"
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import FormLogin from "../component/FormLogin.jsx";



const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src="https://picsum.photos/500/500" className="rounded " alt="" />
                    </div>
                    <div className="col">
                        <h2 className="display-1">Naturalist </h2>
                        <FormLogin/>
                        <div className="text-center">
                            <p className="mt-5 fw-bold">Don't have an account?</p>
                            <Link to="/SignUp">
				                <button className="btn btn-link fw-bold ">Sign up</button>
			                </Link>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	


		// <div className="text-center mt-5">
		// 	<h1>Hello Rigo!!</h1>
		// 	<p>
		// 		<img src={rigoImageUrl} />
		// 	</p>
		// 	<div className="alert alert-info">
		// 		{store.message || "Loading message from the backend (make sure your python backend is running)..."}
		// 	</div>
		// 	<p>
		// 		This boilerplate comes with lots of documentation:{" "}
		// 		<a href="https://start.4geeksacademy.com/starters/react-flask">
		// 			Read documentation
		// 		</a>
		// 	</p>
		// </div>
	);
};
export default Home
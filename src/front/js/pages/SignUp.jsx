import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Form from "../component/Form.jsx";

export const SignUp = () => {
	return (
		<div className="container-fluid d-flex flex-column align-items-center mt-2 w-50">
			<h2 className="display-1">Naturalist</h2>
            <p className="fst-italic">🌻🌹🪴🌵🌱🌾🌿☘️🌼🌹😍</p>
            <Form/>
            <div className="text-center">
                <p className="mt-4 mb-0">Do you have an account?</p>
				<Link to="/">
					<button className="btn btn-link fw-semibold text-info-emphasis p-0">Sign in</button>
				</Link>
            </div>
		</div>
	);
};
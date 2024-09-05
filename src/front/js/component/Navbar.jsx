import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")

    const handleLogout = () => {
        actions.logout()
        navigate("/")
    }
    const handleLogin = () => {
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold fs-2" href="#" onClick={handleLogin}>Naturalist</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex flex-row-reverse text-center align-items-center" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {token ? (
                            <>
                                <li className="nav-item d-flex align-items-center">
                                    <a className="nav-link" href="#">
                                        <img src="https://picsum.photos/100/100" className="rounded-circle p-2" alt="" />
                                    </a>
                                </li>
                                <li className="nav-item text-white d-none d-lg-block">
                                    {name}
                                </li>
                                <li className="nav-item text-white d-none d-lg-block">
                                    {email}
                                </li>
                                <li className="nav-item">
                                    <a className="btn btn-danger" href="#" onClick={handleLogout}>Log Out</a>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <a className="btn btn-primary" href="#" onClick={handleLogin}>Sign In</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
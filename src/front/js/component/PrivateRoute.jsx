import React from "react";

export const PrivateRoute = () => {
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    return (
        <div className="text-center p-2">
            {token ?
                <div>
                    <h2 className="text-info-emphasis fw-light display-1">Welcome {name}! 😊😊🌈</h2>
                    <img src="https://picsum.photos/200/300" className="rounded-4 p-2" alt="" />
                </div> : <h3 className="text-info-emphasis  display-4 fw-light d">Sign 😎😎😉 to view the site </h3>
            }
        </div>
    );
};
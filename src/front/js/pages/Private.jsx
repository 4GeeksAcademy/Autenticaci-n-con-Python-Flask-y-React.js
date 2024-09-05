import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Navbar } from '../component/Navbar.jsx'
import { PrivateRoute } from "../component/PrivateRoute.jsx";
import { UsersList } from "../component/UsersList.jsx"


const Private = () => {
    const { store } = useContext(Context)
    const token = localStorage.getItem("token")
    const userName = localStorage.getItem("name")
    return (
        <div className="">
            <Navbar />
            <div className="row text-center mt-5">
                <div>
                    <PrivateRoute />
                </div>
                <div>
                    <UsersList />
                </div>
            </div>
             
             {/* Otra forma de restringuir la ruta privada */}
            {/* {store.auth?
            <div className="row text-center mt-5">
                <div>
                    <PrivateRoute />
                </div>
                <div>
                    <UsersList />
                </div>
            </div>
            :
            <div>No estas logueado</div>
            } */}
        </div>

    );

};
export default Private
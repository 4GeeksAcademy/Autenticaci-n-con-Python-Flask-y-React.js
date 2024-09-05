import React, {useContext} from "react";
import { Context } from "../store/appContext.js";
import UsersList from "../component/UsersList.jsx";


const Private = () => {
    const token = localStorage.getItem("token")
    const userName = localStorage.getItem("name")
    return(
        <div className="text-center mt-5">
            <UsersList/>
        </div>
    );

};
export default Private
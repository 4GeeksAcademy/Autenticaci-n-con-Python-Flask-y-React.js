import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const UsersList = () => {
    const { store, actions } = useContext(Context)
    console.log(store.usersList)

    // useEffect(() => {
    //     actions.getUsersList()
    // }, [])
    return (
        <div className="">

            <button className="btn btn-primary" onClick={async () => await actions.getUsersList()}>Users List</button>
            <br />
            <br />
            <ul>
                {
                    store.usersList.map((user, index) => {
                        return (
                            <li key={index}>{user.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};



// import React, { useState, useContext } from 'react';
// import { Context } from '../store/appContext.js'
// import { Link, Navigate } from "react-router-dom"


// const UsersList = () => {
//     const { store, actions } = useContext(Context)
//     console.log("la lista de usuario que viene de flux trae :", store.usersList)

//     const token = localStorage.getItem('token')
//     const userName = localStorage.getItem('name');

//     return (
//         <div>
//             <h1>Bienvenid@ {userName} A Lista de Usuarios</h1>
//             <button className="btn btn-primary" onClick={async () => await actions.getUsersList()}>Obtener Lista</button>
//             <br />
//             <ul>
//                 {
//                     store.usersList.map((user, index) => {
//                         return (
//                             <li key={index}>{user.name}</li>
//                         )
//                     })
//                 }
//             </ul>
//             <Link to="/">
//                 <button className="btn btn-danger" onClick={actions.logout}>Cerrar sesión</button>
//             </Link>
//         </div>
//     )
// }
// export default UsersList


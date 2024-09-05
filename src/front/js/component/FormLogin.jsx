import React, { useState, useContext, useEffect, } from 'react';
import{Link, useNavigate} from "react-router-dom";
import { Context } from '../store/appContext.js'

const FormLogin = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",

    })
    const handleData = (e) => {
        let valor = e.target.value
        let type = e.target.name
        setFormLogin({ ...formLogin, [type]: valor })
    }
    const sendDataLogin = async (e) => {
        e.preventDefault() 
        try {
            console.log("la data enviada a flux, para ejecutar el fecth login es: ", formLogin)
            await actions.login(formLogin)
            setFormLogin({
                email: "",
                password: "",
            })
            navigate("/Private")

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='col-6 container-fluid'>
            <h1>Login</h1>
            <form onSubmit={sendDataLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input value={formLogin.email} name='email' type="email" onChange={handleData} className="form-control" id="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={formLogin.password} name='password' type="password" onChange={handleData} className="form-control" id="password'" />
                </div>
                
                <button type="submit" className="btn btn-primary">Log-in</button>
            </form>
        </div>
    )


}

export default FormLogin
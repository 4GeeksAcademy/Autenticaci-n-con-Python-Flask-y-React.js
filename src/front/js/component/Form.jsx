import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import{Link, useNavigate} from "react-router-dom";

const Form = () => {
    const { actions } = useContext(Context)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleData = (e) => {
        let valor = e.target.value
        let type = e.target.name
        setData({ ...data, [type]: valor })
    }

    const sendData = async (e) => {
        e.preventDefault()
        try {
            console.log("La enviada es :", data)
            await actions.register(data)
            setData({
                name: "",
                email: "",
                password: ""
            })
        } catch (e) {
            console.log(e);

        }
    }

    return (
        <div className='col-6 container-fluid'>
            <h1>Registrate</h1>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={data.name} name='name' type="text" onChange={handleData} className="form-control " id="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input value={data.email} name='email' type="email" onChange={handleData} className="form-control" id="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={data.password} name='password' type="password" onChange={handleData} className="form-control" id="password'" />
                </div>

              
                <button type="submit" className="btn btn-primary">Registrarse</button>
                
            </form>
        </div>
    )
}

export default Form
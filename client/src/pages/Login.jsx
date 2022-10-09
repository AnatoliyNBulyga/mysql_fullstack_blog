import React, {useContext, useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {AuthContext} from "../context/authContext.js";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { currentUser, login } = useContext(AuthContext)
    console.log('currentUser ', currentUser)
    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    };
    console.log('inputs ', inputs)
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/")
        } catch (err) {
            setError(err.response.data)
        }
    };
    return (
        <div className="auth">
         <h1>Login</h1>
         <form className="form" onSubmit={handleSubmit}>
             <input required type="text" placeholder="username" name="username" onChange={handleChange} />
             <input required type="password" placeholder="password" name="password" onChange={handleChange} />
             <button type="submit">Login</button>
             { error && <p>{error}</p>}
             <span>Don't you have an account? <Link to="/register">Register</Link></span>
         </form>
        </div>
    );
};

export default Login;
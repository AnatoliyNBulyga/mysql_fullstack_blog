import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {authAPI} from "../store/services/AuthService";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [register, {isLoading, error}] = authAPI.useRegisterMutation()

    const navigate = useNavigate()
    const handleChange = (e: any) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log('inputs ', inputs)
    const handleSubmit = async (e: any) => {
      e.preventDefault()
        const result = await register(inputs) as { data: boolean }
        if (result.data) {
            navigate("/login")
        }
    };

    // Error handling
    let errMsg;
    if (error) {
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            errMsg = 'error' in error ? error.error : (error.data as { status: string, message: string }).message
        } else {
            // you can access all properties of `SerializedError` here
            errMsg = error.message
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="auth">
            <h1>Register</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input required type="email" placeholder="email" name="email" onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button type="submit">Register</button>
                { error && <p>{errMsg}</p> }
                <span>Do you have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;
import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ILogin} from "../models/auth/ILogin";
import {useAppDispatch} from "../hooks/redux";
import {authAPI} from "../store/services/AuthService";
import {authSlice} from "../store/reducers/auth/authSlice";


const Login = () => {

    const [inputs, setInputs] = useState<ILogin>({
        username: "",
        password: ""
    })

    // Use RTK queries
    const [login, {isLoading, error}] = authAPI.useLoginMutation()

    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    };
    console.log('inputs ', inputs)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const result: any = await login(inputs)
        console.log('result ', result)
        if (result.data) {
            dispatch(authSlice.actions.setCurrentUser(result.data))
            localStorage.setItem("user", JSON.stringify(result.data))
            navigate("/")
        }
        setLoading(false)
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
            <h1>Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button type="submit">Login</button>
                {error && <p>{errMsg}</p>}
                <span>Don't you have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;
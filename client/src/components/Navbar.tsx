import React from 'react';
import Logo from "../img/logo.png";
import {Link} from "react-router-dom";
import {authAPI} from "../store/services/AuthService";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {authSlice} from "../store/reducers/auth/authSlice";

const Navbar = () => {


    const [logout, {error}] = authAPI.useLogoutMutation();
    const {currentUser, isLoading} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()

    console.log('current user ', currentUser)

    const onclickHandler = async () => {
        const result = await logout() as { data: boolean };
        console.log('result ', result)
        if (result.data) {
            dispatch(authSlice.actions.setCurrentUser(null))
            localStorage.removeItem("user");
        }
    }

    if (isLoading) return <div>Loading...</div>

    // Error handling
    let errMsg;
    if (error) {
        let errMsg;
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            errMsg = 'error' in error ? error.error : (error.data as { status: string, message: string }).message
        } else {
            // you can access all properties of `SerializedError` here
            errMsg = error.message
        }
    }

    if (error) return <div>{errMsg}</div>

    return (
        <div className="navbar">
            <div className="container">
                <Link to="/">
                    <span className="logo">
                       <img src={Logo} alt="Logo" />
                    </span>
                </Link>
                <div className="links">
                    <Link className="link" to="/">
                        <h6>ALL</h6>
                    </Link>
                    <Link className="link" to="/?cat=art">
                        <h6>ART</h6>
                    </Link>
                    <Link className="link" to="/?cat=science">
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className="link" to="/?cat=cinema">
                        <h6>CINEMA</h6>
                    </Link>
                    <Link className="link" to="/?cat=design">
                        <h6>DESIGN</h6>
                    </Link>
                    <Link className="link" to="/?cat=food">
                        <h6>FOOD</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {
                        currentUser
                            ? <span onClick={onclickHandler}>Logout</span>
                            : <Link className="link" to="/login">Login</Link>
                    }
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
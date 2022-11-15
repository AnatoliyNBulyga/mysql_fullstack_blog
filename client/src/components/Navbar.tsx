import React, {useContext} from 'react';
import Logo from "../img/logo.png";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import {authAPI} from "../store/services/AuthService";

const Navbar = () => {


    const [logout, {data, isLoading, error}] = authAPI.useLogoutMutation();
    const currentUser = {
        username: 'Anatoliy'
    }

    const onclickHandler = async () => {
        await logout();
    }

    return (
        <div className="navbar">
            <div className="container">
                <Link to="/">
                    <span className="logo">
                       <img src={Logo} alt="Logo" />
                    </span>
                </Link>
                <div className="links">
                    <Link className="link" to="/?cat=art">
                        <h6>ART</h6>
                    </Link>
                    <Link className="link" to="/?cat=science">
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className="link" to="/?cat=technology">
                        <h6>TECHNOLOGY</h6>
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
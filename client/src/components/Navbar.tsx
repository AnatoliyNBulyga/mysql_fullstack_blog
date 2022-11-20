import React from 'react';
import Logo from "../img/logo.png";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {postAPI} from "../store/services/PostService";
import {logoutAction} from "../store/reducers/auth/actionCreators";
import {authSlice} from "../store/reducers/auth/authSlice";

const Navbar = () => {

    const {data: posts, error: fetchPostsError, isLoading: fetchPostsLoading} = postAPI.useFetchAllPostsQuery('')
    const {currentUser, isLoading, error} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()
    console.log('currentUser ', currentUser)

    const onclickHandler = async () => {
        dispatch(logoutAction())
        if (!error) {
            console.log('remove')
            dispatch(authSlice.actions.setCurrentUser(null))
            localStorage.removeItem("user");
        }
    }

    if (isLoading) return <div>Loading...</div>

    // Error handling
    let errMsg;
    if (fetchPostsError) {
        let errMsg;
        if ('status' in fetchPostsError) {
            // you can access all properties of `FetchBaseQueryError` here
            errMsg = 'error' in fetchPostsError ? fetchPostsError.error : (fetchPostsError.data as { status: string, message: string }).message
        } else {
            // you can access all properties of `SerializedError` here
            errMsg = fetchPostsError.message
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
                    {
                        fetchPostsError
                        ? <div>Loading...</div>
                        : <>
                            <Link className="link" to="/">
                                <h6>ALL</h6>
                            </Link>
                            {
                                posts && posts.map( post =>
                                    <Link key={post.id} className="link" to={`/?cat=${post.cat}`}>
                                        <h6>{post.cat.toUpperCase()}</h6>
                                    </Link>
                                )
                            }
                        </>
                    }
                    {/*<Link className="link" to="/?cat=science">*/}
                    {/*    <h6>SCIENCE</h6>*/}
                    {/*</Link>*/}
                    {/*<Link className="link" to="/?cat=cinema">*/}
                    {/*    <h6>CINEMA</h6>*/}
                    {/*</Link>*/}
                    {/*<Link className="link" to="/?cat=design">*/}
                    {/*    <h6>DESIGN</h6>*/}
                    {/*</Link>*/}
                    {/*<Link className="link" to="/?cat=food">*/}
                    {/*    <h6>FOOD</h6>*/}
                    {/*</Link>*/}
                    { currentUser && <span>{currentUser.username}</span> }
                    {
                        currentUser
                            ? <>
                                <span onClick={onclickHandler}>Logout</span>
                                <span className="write">
                                    <Link className="link" to="/write">Write</Link>
                                </span>
                            </>
                            : <Link className="link" to="/login">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
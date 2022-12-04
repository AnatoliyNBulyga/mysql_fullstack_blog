import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {postAPI} from "../store/services/PostService";
import Hero from "../components/Hero";
import {
    Container,
} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {checkLoginAction} from "../store/reducers/auth/actionCreators";
import {MyLoader} from "../components/MyLoader";
import PageSection from "../components/PageSection";

const Home = () => {
    const { search } = useLocation()

    const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(search)
    const {currentUser, isLoading: isCurrentUserLoading, error: errorCurrentUser} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()
    const localUser = localStorage.getItem("user")
    console.log('currentUser ', currentUser)

    useEffect(() => {
        if (localUser) {
            dispatch(checkLoginAction())
        }
    }, [])

    if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }
    if (errorCurrentUser) {
        localStorage.removeItem("user")
    }

    // const posts = [
    //   {
    //     id: 1,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    //   {
    //     id: 2,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    //   {
    //     id: 3,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    //   {
    //     id: 4,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   },
    // ];

    if (isLoading) {
        return <MyLoader />
    }
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

    if (error) {
        return <div>{errMsg}</div>
    }

    return (
        <div className="home">
            <Hero />
            <Container>
                <div className="posts">
                 {
                     posts && posts.length
                     ? posts.map((post, index) => (

                         <PageSection key={post.id} post={post} index={index} />

                     ))
                     : <div>We have no posts!</div>
                 }
                </div>
            </Container>
        </div>
    );
};

export default Home;
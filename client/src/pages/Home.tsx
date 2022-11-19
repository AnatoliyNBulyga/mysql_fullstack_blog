import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {getText} from "../utils/get-text";
import {postAPI} from "../store/services/PostService";

const Home = () => {
    const { search } = useLocation()

    const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(search)

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
        return <div>Loading...</div>
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
         <div className="posts">
             {
                 posts && posts.length
                 ? posts.map(post => (
                     <div className="post" key={post.id}>
                         <div className="img">
                             {
                                 post.img && <img src={`http://localhost:8800/${post.img}`} alt="Post preview"/>
                             }
                         </div>
                         <div className="content">
                             <h1>{post.title}</h1>
                             <p>{getText(post.desc)}</p>
                             <Link className="link" to={`/posts/${post.id}`}>
                                <button>Read More</button>
                             </Link>
                         </div>
                     </div>
                 ))
                 : <div>We have no posts!</div>
             }
         </div>
        </div>
    );
};

export default Home;
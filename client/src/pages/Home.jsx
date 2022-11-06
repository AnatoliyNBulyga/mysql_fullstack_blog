import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {getText} from "../utils";

const Home = () => {
    const [posts, setPosts] = useState([])

    const { search } = useLocation()

    useEffect ( () => {
        const fetchData = async () => {
            try {
               const res = await axios.get(`/posts${search}`)
               setPosts(res.data.rows)
                console.log('res.data ', res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [search])
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

    return (
        <div className="home">
         <div className="posts">
             {
                 posts.length
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
                             <Link className="link" to={`/post/${post.id}`}>
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
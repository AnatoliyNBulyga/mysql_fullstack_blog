import React, { useEffect, useState } from "react";
import axios from "axios";
import {postAPI} from "../store/services/PostService";
import {Link} from "react-router-dom";
import {Button, Group} from "@mantine/core";

const Menu = ({cat}: {cat: string}) => {
    // const [posts, setPosts] = useState([]);
    const { data: posts } = postAPI.useFetchAllPostsQuery(`?cat=${cat}`);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get(`/posts/?cat=${cat}`);
    //             setPosts(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetchData();
    // }, [cat]);
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
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts && posts.map((post) => (
                <div className="post" key={post.id}>
                    {
                        post.img && <img src={`${process.env.REACT_APP_BACKEND_URL}/${post?.img}`} alt="Post preview" />
                    }
                    <h2>{post.title}</h2>
                    <Group mt={30}>
                        <Link className="link" to={`/posts/${post.id}`}>
                            <Button variant="outline" size="md">
                                Read more
                            </Button>
                        </Link>
                    </Group>
                </div>
            ))}
        </div>
    );
};

export default Menu;
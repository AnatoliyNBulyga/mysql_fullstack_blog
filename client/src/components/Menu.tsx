import React, { useEffect, useState } from "react";
import axios from "axios";
import {postAPI} from "../store/services/PostService";
import {Link} from "react-router-dom";
import {Button, Group} from "@mantine/core";

const Menu = ({cat}: {cat: string}) => {
    const { data: posts } = postAPI.useFetchAllPostsQuery(`?cat=${cat}`);

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
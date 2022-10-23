import React, {useContext, useEffect, useState} from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import {Link, useNavigate, useParams} from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";
import {getText} from "../utils";


const Single = () => {
    const [post, setPost] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext)

    useEffect ( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${id}`)
                setPost(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/posts/${id}`)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="single">
            <div className="content">
                <img src={`../uploads/${post?.img}`} alt="Single post image"/>
                <div className="user">
                    {
                        post.userImg && <img src={post.userImg} alt="User avatar"/>
                    }
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {
                        currentUser.username === post.username &&
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="Edit" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="Delete"/>
                        </div>
                    }
                </div>
                <h1>{post.title}</h1>
                <p>
                    { getText(post.desc) }
                </p>
            </div>
            <Menu cat={post.cat} />
        </div>
    );
};

export default Single;
import React from 'react';
import editIconSrc from '../img/edit.png';
import deleteIconSrc from '../img/delete.png';
import {Link, useNavigate, useParams} from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import {getText} from "../utils/get-text";
import {postAPI} from "../store/services/PostService";
import {useAppSelector} from "../hooks/redux";


const Single = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { data: post, isLoading, error } = postAPI.useFetchPostQuery(Number(id));
    const [removePost] = postAPI.useRemovePostMutation();
    const {currentUser} = useAppSelector(state => state.authReducer);

    console.log('post ', post)

    const handleDelete = async () => {
        try {
            const check = window.confirm('Are you sure?');
            if (!check) return true;
            const res = await removePost(Number(id)) as { data: { success: boolean, message: string }};
            if (res.data.success) {
                navigate('/')
            }

        } catch (err) {
            console.log(err)
        }
    }

    if (error) {
        return <>Error {error}</>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="single">
            {
                post
                ?
                    <>
                        <div className="content">
                            {
                                post.img && <img src={`${process.env.REACT_APP_BACKEND_URL}/${post.img}`} alt="Single post image"/>
                            }
                            <div className="user">
                                {
                                    post.author?.img && <img src={post.author.img} alt="User avatar"/>
                                }
                                <div className="info">
                                    <span>{post.author.username}</span>
                                    <p>Posted {moment(post.createdAt).fromNow()}</p>
                                </div>
                                {
                                    currentUser?.username === post.author.username &&
                                    <div className="edit">
                                        <Link to={`/write?edit=2`} state={post}>
                                            <img src={editIconSrc} alt="Edit" />
                                        </Link>
                                        <img onClick={handleDelete} src={deleteIconSrc} alt="Delete"/>
                                    </div>
                                }
                            </div>
                            <h1>{post.title}</h1>
                            <p>
                                { getText(post.desc) }
                            </p>
                        </div>
                        <Menu cat={post.cat} />
                    </>
                :   'We have no posts with this id'
            }
        </div>
    );
};

export default Single;
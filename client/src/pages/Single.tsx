import React from 'react';
import editIconSrc from '../assets/img/edit.png';
import deleteIconSrc from '../assets/img/delete.png';
import {Link, useNavigate, useParams} from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import {getText} from "../utils/get-text";
import {postAPI} from "../store/services/PostService";
import {useAppSelector} from "../hooks/redux";
import {
    Container,
} from '@mantine/core';
import {MyLoader} from "../components/MyLoader";
import {useSingleStyles} from "../hooks/style/single";
import ErrorMessage from "../components/ErrorMessage";
import {IconEdit, IconTrash} from "@tabler/icons";


const Single = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { data: post, isLoading, error } = postAPI.useFetchPostQuery(Number(id));
    const [removePost] = postAPI.useRemovePostMutation();
    const {currentUser} = useAppSelector(state => state.authReducer);
    const { classes, theme } = useSingleStyles();

    console.log('post ', post)

    const handleDelete = async () => {
        try {
            const check = window.confirm('Are you sure?');
            if (!check) return true;
            const res: any = await removePost(Number(id));
            if (res.data.success) {
                navigate('/')
            }

        } catch (err) {
            console.log(err)
        }
    }

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
        return <ErrorMessage>{errMsg}</ErrorMessage>
    }

    if (isLoading) {
        return <MyLoader />
    }

    return (
        <Container size="lg">
            <div className={classes.single}>
                {
                    post
                    ?
                        <>
                            <div className={classes.content}>
                                {
                                    post.img && <img className={classes.img} src={`${process.env.REACT_APP_BACKEND_URL}/${post.img}`} alt="Single post image"/>
                                }
                                <div className={classes.user}>
                                    {
                                        post.author?.img && <img src={`${process.env.REACT_APP_BACKEND_URL}/${post.author.img}`} alt="User avatar"/>
                                    }
                                    <div>
                                        <span>{post.author.username}</span>
                                        <p>Posted {moment(post.createdAt).fromNow()}</p>
                                    </div>
                                    {
                                        currentUser?.username === post.author.username &&
                                        <div className={classes.edit}>
                                            <Link to={`/write?edit=2`} state={post}>
                                                <IconEdit size={20} stroke={1.5} color={theme.colors.blue[8]} />
                                            </Link>
                                            <IconTrash onClick={handleDelete} size={20} stroke={1.5} color={theme.colors.red[8]} style={{ cursor: 'pointer'}} />
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
        </Container>
    );
};

export default Single;
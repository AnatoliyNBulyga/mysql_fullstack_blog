import React, {useState} from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useLocation, useNavigate} from "react-router-dom";
import {postAPI} from "../store/services/PostService";
import {fileAPI} from "../store/services/FileService";
import {
    Button,
    Container,
    TextInput,
    Radio,
    FileInput,
    Notification
} from '@mantine/core';
import {MyLoader} from "../components/MyLoader";
import {useWriteStyles} from "../hooks/style/write";
import {useDebouncedState} from "@mantine/hooks";
import { IconCheck, IconX } from '@tabler/icons';


const Write = () => {
    const { state } = useLocation()
    const [desc, setDesc] = useDebouncedState(state?.desc ?? '', 200)
    const [title, setTitle] = useDebouncedState(state?.title ?? '', 200)
    const [file, setFile] = useState<File | null>(null);
    const [cat, setCat] = useState(state?.cat ?? '')
    const { classes } = useWriteStyles()
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState<string>('')

    const [updatePost, {error: updatePostError, isLoading: updatePostLoading}] = postAPI.useUpdatePostMutation()
    const [createPost, {error: createPostError, isLoading: createPostLoading, reset}] = postAPI.useCreatePostMutation()
    const [addFile] = fileAPI.useAddFileMutation()

    const categoryArray = ['art', 'science', 'technology', 'cinema', 'development', 'food']

    const upload = async () => {
        try {
           const formData = new FormData()
           formData.append("image", file as Blob)
            const result: any = await addFile(formData)
            console.log('result ', result)
            return result.data
        } catch(err) {
            console.log(err)
        }
    }

    const handlePublish = async (e: any) => {
        e.preventDefault()
        const check = window.confirm('Are you sure?');
        if (!check) return true;
        const imgSrc = file ? await upload() : ""
        const updatePostObj = file
            ? { title, desc, cat, img: imgSrc }
            : { title, desc, cat}

        console.log('updatePostObj ', updatePostObj)
        try {
            const result: any = state
            ? await updatePost({
                    id: state.id,
                    updatePost: updatePostObj
            })
            : await createPost(updatePostObj)
            console.log('result ', result)
            if (result.data) {
                setSuccessMessage(result.data.message)
                window.setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        } catch(e) {
            console.log('ERROR in handlePublish ', e)
        }
    }

    if (updatePostLoading || createPostLoading) {
        return <Container><MyLoader /></Container>
    }

    return (
        <Container>
            <>
                {
                    successMessage &&
                    <Notification
                        sx={{ marginTop: '30px'}}
                        icon={<IconCheck size={18} />}
                        color="teal"
                        title="Success notification"
                        onClick={() => setSuccessMessage('')}
                    >
                        {successMessage}
                    </Notification>
                }
                {
                    (createPostError || updatePostError) &&
                    <Notification
                        sx={{ marginTop: '30px'}}
                        icon={<IconX size={18} />}
                        color="red"
                        onClick={reset}
                    >
                        Create or Update error!
                    </Notification>
                }
                <div className={classes.add}>
                    <div className={classes.content}>
                        <TextInput
                            type="text"
                            defaultValue={title}
                            placeholder="Title"
                            onChange={e => setTitle(e.currentTarget.value)}
                            required
                        />
                        <div className={classes.editorContainer}>
                            <ReactQuill
                                className="editor"
                                theme="snow"
                                value={desc}
                                onChange={setDesc}
                            />
                        </div>
                    </div>
                    <div className={classes.menu}>
                        <div className={classes.item}>
                            <h1>Publish</h1>
                            <span>
                                <b>Status: </b> Draft
                            </span>
                            <span>
                                <b>Visibility: </b> Public
                            </span>
                            <div className={classes.file}>
                                <FileInput
                                    id="file"
                                    label="Upload Image"
                                    placeholder="Upload Image"
                                    value={file}
                                    onChange={setFile}
                                    accept="image/png,image/jpeg"
                                />
                            </div>
                            <div className={classes.buttons}>
                                <Button variant="outline">Save as a draft</Button>
                                <Button onClick={handlePublish}>Publish</Button>
                            </div>
                        </div>
                        <div className={classes.item}>
                            <h1>Category</h1>
                            {
                                categoryArray.map(category =>
                                    <div className={classes.cat} key={category}>
                                        <Radio.Group
                                            size="xs"
                                            value={cat}
                                            onChange={setCat}
                                        >
                                            <Radio
                                                id={category}
                                                value={category}
                                                label={category}
                                                name="cat"
                                                checked={cat === category}
                                            />
                                        </Radio.Group>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </>
        </Container>
    );
};

export default Write;
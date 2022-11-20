import React, {useState} from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import {postAPI} from "../store/services/PostService";
import {fileAPI} from "../store/services/FileService";


const Write = () => {
    const { state } = useLocation()
    const [desc, setDesc] = useState(state?.desc ?? '')
    const [title, setTitle] = useState(state?.title ?? '')
    const [file, setFile] = useState<string|Blob>('')
    const [cat, setCat] = useState(state?.cat ?? '')
    const navigate = useNavigate()

    const [updatePost, {error: updatePostError, isLoading: updatePostLoading}] = postAPI.useUpdatePostMutation()
    const [createPost, {error: createPostError, isLoading: createPostLoading}] = postAPI.useCreatePostMutation()
    const [addFile] = fileAPI.useAddFileMutation()

    const categoryArray = ['art', 'science', 'technology', 'cinema', 'development', 'food']

    const upload = async () => {
        try {
           const formData = new FormData()
           formData.append("image", file)
            const result: any = await addFile(formData)
            console.log('result ', result)
            return result.data
        } catch(err) {
            console.log(err)
        }
    }

    const handlePublish = async (e: any) => {
        e.preventDefault()
        const imgSrc = file ? await upload() : ""
        const updatePostObj = file
            ? { title, desc, cat, img: imgSrc }
            : { title, desc, cat}

        try {
            state
            ? await updatePost({
                    id: state.id,
                    updatePost: updatePostObj
            })
            : await createPost(updatePostObj)
            navigate("/")
        } catch(e) {
            console.log('ERROR in handlePublish ', e)
        }
    }

    if (updatePostLoading || createPostLoading) {
        return <div>Loading...</div>
    }

    if (createPostError || updatePostError) {
        return <div>Create or Update error!</div>
    }

    return (
        <div className="add">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={desc}
                        onChange={setDesc}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display: "none"}} type="file" id="file" name="" onChange={(e: any) => setFile(e.target.files[0])}/>
                    <label htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    {
                        categoryArray.map(category =>
                            <div className="cat" key={category}>
                                <input
                                    type="radio"
                                    checked={cat === category}
                                    name="cat"
                                    value={category}
                                    id={category}
                                    onChange={(e) => setCat(e.target.value)}
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Write;
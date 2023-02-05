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
import {userAPI} from "../store/services/UserService";
import {useAppSelector} from "../hooks/redux";


const Profile = () => {
    const {currentUser} = useAppSelector(state => state.authReducer);
    const [email, setEmail] = useDebouncedState(currentUser?.email ?? '', 200)
    const [file, setFile] = useState<File | null>(null);
    const { classes } = useWriteStyles()
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState<string>('')

    const [updateUser, {error: updateUserError, isLoading: updateUserLoading, reset}] = userAPI.useUpdateUserMutation()
    const [addFile] = fileAPI.useAddFileMutation()


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
        const updateUserObj = file
            ? { email, img: imgSrc }
            : { email }

        console.log('updateUserObj ', updateUserObj)
        try {
            const result: any = await updateUser(updateUserObj)
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

    if (updateUserLoading) {
        return <Container><MyLoader /></Container>
    }

    return (
        <Container size="xs">
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
                    updateUserError &&
                    <Notification
                        sx={{ marginTop: '30px'}}
                        icon={<IconX size={18} />}
                        color="red"
                        onClick={reset}
                    >
                        Create or Update error!
                    </Notification>
                }
                <div className={classes.profile}>
                    <div className={classes.content}>
                        <TextInput
                            type="text"
                            defaultValue={email}
                            placeholder="Email"
                            onChange={e => setEmail(e.currentTarget.value)}
                            required
                        />
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
                        <Button fullWidth my="xs" onClick={handlePublish} >
                            Send
                        </Button>
                    </div>
                </div>
            </>
        </Container>
    );
};

export default Profile;
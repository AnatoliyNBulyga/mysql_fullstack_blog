import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ILogin} from "../models/auth/ILogin";
import {useAppDispatch} from "../hooks/redux";
import {authAPI} from "../store/services/AuthService";
import {authSlice} from "../store/reducers/auth/authSlice";
import { useDebouncedState } from '@mantine/hooks';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Text,
    Group,
    Button,
    LoadingOverlay,
    Title,
    Container,
    MediaQuery,
    Center
} from "@mantine/core";
import Logo from "../img/logo.png";


const Login = () => {

    const [inputs, setInputs] = useDebouncedState<any>({
        username: "",
        password: ""
    }, 400)

    // Use RTK queries
    const [login, {isLoading, error}] = authAPI.useLoginMutation()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setInputs((prev: any) => ({...prev, [e.target.name]: e.target.value}))
    };
    console.log('inputs ', inputs)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const result: any = await login(inputs)
        console.log('result ', result)
        if (result.data) {
            dispatch(authSlice.actions.setCurrentUser(result.data))
            localStorage.setItem("user", JSON.stringify(result.data))
            navigate("/")
        }
    };

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

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Container size={520} className="auth" sx={{ width: "100%" }} my={10}>

            <Center  mb="xs">
                <Link to="/">
                    <span className="logo">
                       <img src={Logo} style={{width: "100px", height: "auto"}} alt="Logo" />
                    </span>
                </Link>
            </Center>

            <MediaQuery
                query="(min-width: 500px)"
                styles={{ minWidth: '450px' }}
            >
                <Paper withBorder shadow="md" p={30} mt={10} radius="md" sx={{minWidth: '100%'}} >

                    <LoadingOverlay visible={isLoading} />

                    <Title mt={10} mb={15}
                           align="center"
                           sx={(theme: any) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 , color: '#999'})} >
                        Login
                    </Title>

                    {error && (
                        <Text color="red" align="center">
                            {error}
                        </Text>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Username"
                            required type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="password"
                            required
                            mt="md"
                            name="password"
                            onChange={handleChange}
                        />
                        <Group position="apart" mt="md">
                            <Checkbox label="Remember me" />
                        </Group>
                        <Button fullWidth my="xs" type="submit" color="tgold" sx={(theme) => ({
                            color: "white"
                        })}>
                            Sign in
                        </Button>
                        <Text color="dimmed" size="sm" align="center" mt={5}>
                            Do not have an account yet?{" "}
                            <Anchor component={Link} to="/register" size="sm">
                                Create account
                            </Anchor>
                        </Text>
                    </form>
                </Paper>

            </MediaQuery>

        </Container>
    )
};

export default Login;
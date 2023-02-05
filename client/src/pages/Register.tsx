import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom"
import {authAPI} from "../store/services/AuthService";
import {useDebouncedState, useValidatedState} from '@mantine/hooks';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Text,
    Button,
    LoadingOverlay,
    Title,
    Container,
    MediaQuery,
    Center,
    Progress,
    Popover,
    Box,
} from "@mantine/core";
import { IconX, IconCheck } from '@tabler/icons'
import Logo from "../assets/img/logo.png";
import {MyLoader} from "../components/MyLoader";
import { useAuthStyles } from "../hooks/style/auth";
import ErrorMessage from "../components/ErrorMessage";

const Register = () => {
    const [inputs, setInputs] = useDebouncedState<any>({
        username: "",
        email: "",
        password: ""
    }, 400)
    const [register, {isLoading, error}] = authAPI.useRegisterMutation()

    const { classes } = useAuthStyles();
    const navigate = useNavigate()
    const handleChange = (e: any) => {

        if (e.target.name === 'email') {
            setEmail(e.currentTarget.value)
        }
        setInputs((prev:any) => ({...prev, [e.target.name]: e.target.value}))
    }
    console.log('inputs ', inputs)
    const handleSubmit = async (e: any) => {
      e.preventDefault()
        const result: any = await register(inputs)
        if (result.data) {
            navigate("/login")
        }
    };

    // Check password
    function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
        return (
            <Text
                color={meets ? 'teal' : 'red'}
                sx={{ display: 'flex', alignItems: 'center' }}
                mt={7}
                size="sm"
            >
                {meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
            </Text>
        );
    }
    const requirements = [
        { re: /[0-9]/, label: 'Includes number' },
        { re: /[a-z]/, label: 'Includes lowercase letter' },
        { re: /[A-Z]/, label: 'Includes uppercase letter' },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
    ];
    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(inputs.password)} />
    ));
    function getStrength(password: string) {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    }
    const strength = getStrength(inputs.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    // Check email
    const [{ valid: emailValid }, setEmail] = useValidatedState(
        '',
        (val) => /^\S+@\S+$/.test(val),
        true
    );

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

    if (error) {
        return <ErrorMessage>{errMsg}</ErrorMessage>
    }

    if (isLoading) {
        return <MyLoader />
    }

    return (
        <Container size={520} className={classes.auth} sx={{ width: "100%" }} my={10}>

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
                        Registration
                    </Title>

                    {error && (
                        <Text color="red" align="center">
                            {errMsg}
                        </Text>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Username"
                            required
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Email"
                            required
                            placeholder="email"
                            name="email"
                            mt="xs"
                            onChange={handleChange}
                            error={!emailValid && 'Invalid email'}
                            classNames={{ input: emailValid ? "" : classes.invalid }}
                        />

                        <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
                            <Popover.Target>
                                <div
                                    onFocusCapture={() => setPopoverOpened(true)}
                                    onBlurCapture={() => setPopoverOpened(false)}
                                >
                                    <PasswordInput
                                        label="Password"
                                        placeholder="password"
                                        name="password"
                                        // required
                                        mt="xs"
                                        onChange={handleChange}
                                    />
                                </div>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                                <PasswordRequirement label="Includes at least 6 characters" meets={inputs.password.length > 5} />
                                {checks}
                            </Popover.Dropdown>
                        </Popover>

                        <Button fullWidth mt="xl" type="submit" color="tgold" sx={(theme) => ({
                            color: "white"
                        })}>
                            Sign up
                        </Button>
                        <Text color="dimmed" size="sm" align="center" mt={5}>
                            Do you have an account?{" "}
                            <Anchor component={Link} to="/login" size="sm">
                                Go back to login
                            </Anchor>
                        </Text>
                    </form>
                </Paper>

            </MediaQuery>

        </Container>
    )

    // return (
    //     <div className="auth">
    //         <h1>Register</h1>
    //         <form className="form" onSubmit={handleSubmit}>
    //             <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
    //             <input required type="email" placeholder="email" name="email" onChange={handleChange}/>
    //             <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
    //             <button type="submit">Register</button>
    //             { error && <p>{errMsg}</p> }
    //             <span>Do you have an account? <Link to="/login">Login</Link></span>
    //         </form>
    //     </div>
    // );
};

export default Register;
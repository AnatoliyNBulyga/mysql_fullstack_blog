import React from 'react';
import Logo from "../assets/img/logo.png";
import {Link} from "react-router-dom";
import { useState } from 'react';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    Button,
    Paper,
    Transition,
    Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconMessage,
    IconChevronDown, IconUser,
} from '@tabler/icons';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {postAPI} from "../store/services/PostService";
import {logoutAction} from "../store/reducers/auth/actionCreators";
import {authSlice} from "../store/reducers/auth/authSlice";
import {useNavbarStyles} from "../hooks/style/navbar";
import {MyLoader} from "./MyLoader";



export function Navbar() {
    const { classes, theme, cx } = useNavbarStyles();
    const [opened, { toggle, close }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [active, setActive] = useState<string>('all');

    const {data: posts} = postAPI.useFetchAllPostsQuery('')
    const {currentUser, isLoading, error} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()
    console.log('currentUser ', currentUser)

    const catArray = posts && posts.map(post => post.cat)
    const uniqueCatItems = Array.from(new Set(catArray))

    const items = uniqueCatItems.map((item: string) => (
        <Link key={item} className={classes.link} to={`/?cat=${item}`}>
            <Tabs.Tab value={item}>
                <h6>{item.toUpperCase()}</h6>
            </Tabs.Tab>
        </Link>
    ));

    const menuItems = posts && posts.map((post) => (
        <Link
            key={post.id}
            to={`/?cat=${post.cat}`}
            className={cx(classes.menuLink, { [classes.menuLinkActive]: active === post.cat })}
            onClick={(event) => {
                setActive(post.cat);
                close();
            }}
        >{post.cat.toUpperCase()}</Link>
    ));

    const onLogoutHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(logoutAction())
        if (!error) {
            console.log('remove')
            dispatch(authSlice.actions.setCurrentUser(null))
            localStorage.removeItem("user");
        }
    }

    if (isLoading) return <MyLoader />

    return (
        <div className={classes.header}>
            <Container size="lg" className={classes.mainSection}>
                <Group position="apart">
                    <Link to="/">
                       <span className={classes.logo}>
                           <img src={Logo} alt="Logo" />
                         </span>
                    </Link>

                    <Tabs
                        variant="outline"
                        classNames={{
                            root: classes.tabs,
                            tabsList: classes.tabsList,
                            tab: classes.tab,
                        }}
                    >
                        <Tabs.List>
                            <Link className={classes.link} to="/">
                                <Tabs.Tab value="all">
                                    <h6>ALL</h6>
                                </Tabs.Tab>
                            </Link>
                            {items}
                        </Tabs.List>

                    </Tabs>

                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                    <Transition transition="pop-top-right" duration={200} mounted={opened}>
                        {(styles) => (
                            <Paper className={classes.dropdown} withBorder style={styles}>
                                <Link
                                    to="/"
                                    className={cx(classes.menuLink, { [classes.menuLinkActive]: active === 'all' })}
                                    onClick={(event) => {
                                        setActive('all');
                                        close();
                                    }}
                                >All</Link>
                                { menuItems }
                                {
                                    currentUser
                                    ?
                                        <Flex py="xs" direction="column">
                                            <Link className={classes.menuLink} to="/profile">Profile</Link>
                                            <Link className={classes.menuLink} to="/write">Write</Link>
                                            <Link className={classes.menuLink} to="/" onClick={onLogoutHandler}>Logout</Link>
                                        </Flex>

                                    :
                                        <Flex py="xs" direction="column">
                                            <Link className={classes.menuLink} to="/login">Log in</Link>
                                            <Link className={classes.menuLink} to="/register">Sign up</Link>
                                        </Flex>
                                }
                            </Paper>
                        )}
                    </Transition>

                    {
                        currentUser
                        ?   <Menu
                                width={260}
                                position="bottom-end"
                                transition="pop-top-right"
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                            >
                                <Menu.Target>
                                    <UnstyledButton
                                        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                                    >
                                        <Group spacing={7}>
                                            {
                                                currentUser.img &&
                                                <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/${currentUser.img}`} alt={currentUser.username} radius="xl" size={20} />
                                            }
                                            <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.black }} mr={3}>
                                                {currentUser.username}
                                            </Text>
                                            <IconChevronDown size={12} stroke={1.5} />
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconUser size={14} stroke={1} color={theme.colors.blue[8]} />}>
                                        <Link className={classes.link} to="/profile">Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item icon={<IconMessage size={14} stroke={1} color={theme.colors.blue[8]} />}>
                                        <Link className={classes.link} to="/write">Write</Link>
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item
                                        icon={<IconLogout size={14} stroke={1} color={theme.colors.blue[8]} />}
                                        onClick={onLogoutHandler}
                                    >Logout</Menu.Item>

                                </Menu.Dropdown>
                            </Menu>

                        :   <Group position="center" grow py="xs" px="md" className={classes.hiddenMobile}>
                                <Link to="/login"><Button variant="default">Log in</Button></Link>
                                <Link to="/register"><Button>Sign up</Button></Link>
                            </Group>
                    }
                </Group>
            </Container>
        </div>
    );
}

export default Navbar;
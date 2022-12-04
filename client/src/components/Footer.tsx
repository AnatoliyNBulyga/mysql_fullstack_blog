import React from 'react';
import Logo from "../img/logo.png";
import { Container, Group, ActionIcon } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import {useFooterStyles} from "../hooks/style/footer";

const Footer = () => {
    const { classes } = useFooterStyles();
    return (

        <div className={classes.footer}>
            <Container className={classes.inner}>
                <img src={Logo} style={{width: '80px', height: 'auto'}} alt="Logo"/>
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
};

export default Footer;
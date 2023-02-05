import { Container, Title, Text, Button } from '@mantine/core';
import {useHeroStyles} from "../hooks/style/hero";
import Video from "../assets/videos/video.mp4";
import React from "react";



export function Hero() {
    const { classes } = useHeroStyles();
    return (
        <div className={classes.hero}>
            <div className={classes.heroBg}>
                <video src={Video} autoPlay loop muted playsInline />
            </div>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Simply{' '}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                            >
                                write
                            </Text>{' '}
                            your content and keep{' '}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                            >
                                blogging
                            </Text>{' '}
                        </Title>

                        <Text className={classes.description} mt={30}>
                            T-Blog is a modern text based minimal blog theme created for bloggers that just want to write.
                            It has a unique minimalist design based on beautiful typography which will make your personal website look good with or without images.
                        </Text>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Hero;
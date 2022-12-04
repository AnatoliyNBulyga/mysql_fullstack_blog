import { Container, Title, Text, Button } from '@mantine/core';
import {useHeroStyles} from "../hooks/style/hero";



export function Hero() {
    const { classes } = useHeroStyles();
    return (
        <div className={classes.hero}>
            <Container >
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            A{' '}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: 'pink', to: 'yellow' }}
                            >
                                fully featured
                            </Text>{' '}
                            React components library
                        </Title>

                        <Text className={classes.description} mt={30}>
                            Build fully functional accessible web applications with ease – Mantine includes more
                            than 100 customizable components and hooks to cover you in any situation
                        </Text>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Hero;
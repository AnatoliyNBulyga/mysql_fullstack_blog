import {createStyles} from "@mantine/core";

export const useHeroStyles = createStyles((theme) => ({
    hero: {
        position: 'relative',

        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            background: 'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, rgba(6, 35, 67, .7) 70%)',
        }
    },
    heroBg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'hidden',

        '& video': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
        },
    },

    image: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    content: {
        position: 'relative',
        zIndex: 2,
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            marginRight: 0,
        },
    },

    title: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.05,
        maxWidth: 500,
        fontSize: 48,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            fontSize: 34,
            lineHeight: 1.15,
        },
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: 500,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
        },
    },

    control: {
        paddingLeft: 50,
        paddingRight: 50,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 22,

        [theme.fn.smallerThan('md')]: {
            width: '100%',
        },
    },
}));
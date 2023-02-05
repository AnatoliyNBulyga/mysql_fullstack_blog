import {createStyles} from "@mantine/core";

export const usePageSectionsStyles = createStyles((theme) => ({
    post: {
         '&:nth-of-type(2n)': {
             flexDirection: 'row-reverse',

             '> .content': {
                marginRight: 0,
             }
         }
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
        gap: '60px',
    },

    content: {
        maxWidth: 498,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: '2',
        position: 'relative',
        '&::after': {
            content: '""',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.blue[1],
            // backgroundColor: '#333',
            position: 'absolute',
            top: '20px',
            left: '-20px',
            zIndex: -1,
        },

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));
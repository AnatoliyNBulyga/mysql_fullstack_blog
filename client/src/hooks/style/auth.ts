import {createStyles} from "@mantine/core";

export const useAuthStyles = createStyles((theme) => ({

    auth: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',

        '& h1': {
            fontSize: '20px',
            color: theme.colors.blue[7],
            marginBottom: '20px',
        }
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px',
        backgroundColor: 'white',
        gap: '20px',

        '& input': {
            padding: '10px',
            border: 'none',
            borderBottom: '1px solid gray',
        },

        '& button': {
            padding: '10px',
            border: 'none',
            backgroundColor: 'teal',
            cursor: 'pointer',
            color: 'white',
        },

        '& p': {
            fontSize: '12px',
            color: 'red',
            textAlign: 'center'
        },

        '& span': {
            fontSize: '12px',
            textAlign: 'center'
        }
    },

    invalid: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
    },

}));
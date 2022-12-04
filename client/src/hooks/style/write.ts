import {createStyles} from "@mantine/core";


export const useWriteStyles = createStyles((theme) => ({

    add: {
        marginTop: '80px',
        display: 'flex',
        gap: '20px',
    },

    content: {
        flex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',

        '& input': {
            padding: '10px',
            border: '1px solid lightgray',
        }
    },

    editorContainer: {
        minHeight: '45vh',
        overflow: 'scroll',
        border: '1px solid lightgray',

    },

    editor: {
        height: '100%',
        border: 'none'
    },

    menu: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },

    item: {
        border: '1px solid lightgray',
        padding: '10px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#555',

        '& h1': {
            fontSize: '20px'
        }
    },

    file: {
        textDecoration: 'underline',
        cursor: 'pointer',
    },

    buttons: {
        display: 'flex',
        justifyContent: 'space-between',

        '& button:first-child': {
            cursor: 'pointer',
            color: 'teal',
            backgroundColor: 'white',
            border: '1px solid teal',
            padding: '3px 5px',
        },

        '& button:last-child': {
            cursor: 'pointer',
            color: 'white',
            backgroundColor: 'teal',
            border: '1px solid teal',
            padding: '3px 5px'
        }
    },

    cat: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        color: 'teal'
    }
}));
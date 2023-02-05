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
        borderRadius: '4px',
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
        borderRadius: '4px',
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
        cursor: 'pointer',
        margin: '10px 0',

        '& label': {
            fontSize: '12px',
            color: '#555',
            fontWeight: 'bold',
        }
    },

    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    cat: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        color: 'teal'
    },

    profile: {
        height: 'calc(100vh - 400px)',
        marginTop: '80px',
        display: 'flex',
        gap: '20px',
    },

}));
import {createStyles} from "@mantine/core";


export const useSingleStyles = createStyles((theme) => ({
    single: {
        display: 'flex',
        gap: '50px',
        marginTop: '40px',

        '& h1': {
            fontSize: '42px',
            color: '#333',
        },
        '& p': {
            textAlign: 'justify',
            lineHeight: '30px',
        },
            '& .menu': {
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '25px',

                '& h1': {
                    fontSize: '20px',
                    color: '#555',
                },

                '& .post': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',

                        '& img': {
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                        },

                        '& h2': {
                            color: '#555',
                        },

                        '& .button': {
                            width: 'max-content',
                            padding: '7.5px 15px',
                            cursor: 'pointer',
                            color: 'teal',
                            backgroundColor: 'white',
                            border: '1px solid teal',

                        '&:hover': {
                                border: '1px solid white',
                                backgroundColor: '#b9e7e7',
                                color: 'black',
                            }
                        }
                    }
                }
    },
    content: {
        flex: '5',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    img: {
        width: '100%',
        height: '300px',
        objectFit: 'cover'
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',

        '& img': {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover',
        },

        '& span': {
            fontWeight: 'bold',
        }
    },
    edit: {
        display: 'flex',
        gap: '5px',

        '& img': {
            width: '20px',
            height: '20px',
            cursor: 'pointer',
        }
    },
}));
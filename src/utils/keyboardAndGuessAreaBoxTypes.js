import {green, grey, orange, red} from '@mui/material/colors';

const boxStyleVariants = {
    exactMatch: {
        backgroundColor: green[400],
        color: grey[50],
        borderColor: green[400]
    },

    partialMatch: {
        backgroundColor: orange[200],
        color: grey[50],
        borderColor: orange[200]
    },

    noMatch: {
        backgroundColor: grey[500],
        color: grey[50],
        borderColor: grey[500]
    },

    blankBox: {
        backgroundColor: grey[50],
        color: grey[900],
        borderColor: grey[400]
    },

    notEvaluated: {
        backgroundColor: grey[50],
        color: grey[900],
        borderColor: grey[400],
        active: true,
    },
    keyboardUnusedKey: {
        backgroundColor: grey[400],
        color: grey[900],
        borderColor: grey['A100']
    }, 
};

const messageBoxStyles = {
    win: {
        backgroundColor: green[500],
        color: 'black'
    },
    error: {
        backgroundColor: orange[500],
        color: 'black'
    },
    loss: {
        backgroundColor: red[500],
        color: 'white'
    },
};


export { 
    boxStyleVariants,
    messageBoxStyles,
};


import { Box, Typography } from '@mui/material';

const MsgCenter = (props) => {

    const { message } = props;

    if ( message.msg.length )
        return (
            <Box sx={{
                textTransform: 'uppercase',
                alignItems: 'center',
                textAlign: 'center',
                mt: 2,
                backgroundColor: message.style.backgroundColor,
                color: message.style.color,
                border: 'thick',
                borderColor: '#9e9e9e',
                borderWidth: 10,
                padding: 1,
                borderRadius: 5
            }}>
            <Typography sx={{ paddingLeft: 1, paddingRight: 1 }}> {message.msg} </Typography>    
            </Box>
        );

    return null; // if message is empty do not return a component
}

export default MsgCenter;

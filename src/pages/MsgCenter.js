import { Box, Typography } from '@mui/material';

const MsgCenter = (props) => {

    const { message } = props;

    return (
        <Box sx={{
            textTransform: 'uppercase',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Typography> {message} </Typography>    
        </Box>
    );
}

export default MsgCenter;

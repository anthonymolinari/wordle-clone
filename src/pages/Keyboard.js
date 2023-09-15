import {Fragment} from "react";
import {Box, Stack, Typography} from "@mui/material";

const Key = (props) => {
    const { keyboardAttr, onClick } = props;

    return (
            <Box sx={{
                height: 58,
                width: ( keyboardAttr.letter.length > 1 ? 75 : 50 ),
                backgroundColor: keyboardAttr.backgroundColor,
                color: keyboardAttr.color,
                alignItems: 'center',
                textAlign: 'center',
                fontSize: "1.25em",
                fontWeight: "bold",
                textTransform: "uppercase",
                cursor: 'pointer',
                userSelect: 'none',
                borderColor: keyboardAttr.borderColor,
                border: 'medium',
                borderRadius: '5px',
            }} onClick={onClick}>
                <Typography sx={{
                    mt: 2
                }}> {keyboardAttr.letter} </Typography>
            </Box>
    )
}

const Keyboard = (props) => {

    const { onClickHandler, keyboard } = props;

    return (
        <Fragment>
            <Box sx={{
                height: 300,
                alignItems: "center",
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
            <Stack direction='column' spacing={1}
                sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                }}>
                <Stack spacing={1} direction='row'>
                    {keyboard.slice(0,10).map( key  => (<Key onClick={() => onClickHandler(key)} key={`top-${key.letter}`} keyboardAttr={key} />) )} 
                </Stack>
                 <Stack spacing={1} direction='row'>
                    {keyboard.slice(10,19).map( key  => (<Key onClick={() => onClickHandler(key)} key={`mid-${key.letter}`} keyboardAttr={key} />) )} 
                </Stack>
                 <Stack spacing={1} direction='row'>
                    {keyboard.slice(19,28).map( key  => (<Key onClick={() => onClickHandler(key)} key={`bot-${key.letter}`} keyboardAttr={key} />) )} 
                </Stack>
            </Stack>
            </Box>
        </Fragment>
    )
}

export default Keyboard;

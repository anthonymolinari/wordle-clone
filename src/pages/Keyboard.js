import {Fragment} from "react";
import {Box, Stack, Typography} from "@mui/material";

const Key = (props) => {
    const { val, onClick } = props;

    return (
            <Box sx={{
                height: 58,
                width: ( val.length > 1 ? 75 : 50 ),
                backgroundColor: 'lightgrey',
                color: 'black',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: "nyt-franklin",
                fontSize: "1.25em",
                fontWeight: "bold",
                textTransform: "uppercase",
                cursor: 'pointer',
                userSelect: 'none',
            }} onClick={onClick}>
                <Typography sx={{
                    mt: 2
                }}> {val} </Typography>
            </Box>
    )
}

const Keyboard = (props) => {

    const { onClickHandler } = props;
    
    const alpha = {
        top: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        middle: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        bottom: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
    };

    return (
        <Fragment>
            <Box sx={{
                height: 400,
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
                    {alpha.top.map( key  => (<Key onClick={() => onClickHandler(key)} key={`top-${key}`} val={key} />) )} 
                </Stack>
                 <Stack spacing={1} direction='row'>
                    {alpha.middle.map( key  => (<Key onClick={() => onClickHandler(key)} key={`top-${key}`} val={key} />) )} 
                </Stack>
                 <Stack spacing={1} direction='row'>
                    {alpha.bottom.map( key  => (<Key onClick={() => onClickHandler(key)} key={`top-${key}`} val={key} />) )} 
                </Stack>
            </Stack>
            </Box>
        </Fragment>
    )
}

export default Keyboard;

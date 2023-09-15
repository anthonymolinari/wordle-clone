import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {Fragment} from "react";

import {
    numGuessAreaColumns,
    guessBoxSizes,
} from '../utils/sizes';

const GuessBox = (props) => {

    const { backgroundColor, value, active } = props.cellContent;

    return (
        <Box
            sx={{
                width: guessBoxSizes.width,
                height: guessBoxSizes.height,
                border: 1,
                borderColor: (active ? 'black': 'lightgrey'),
                m: 0.4,
                padding: 0,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography sx={{ 
                mt: 0.5, 
                fontFamily: 'nyt-franklin', 
                fontSize: '2rem', 
                fontWeight: 'bold',
                textTransform: 'uppercase',
            }}> {value} </Typography>
        </Box>
    )
}

const GuessArea = (props) => {

    const {allRows} = props;

    return (
        <Fragment>
            <Grid container columns={numGuessAreaColumns}>
                {allRows.map( (box, idx) =>
                    <Grid key={idx} item xs={1} sx={{
                        margin: 0, 
                        padding: 0
                    }}>
                        <GuessBox cellContent={box} />
                    </Grid>
                )}
            </Grid>
        </Fragment>
    )
}

export default GuessArea;

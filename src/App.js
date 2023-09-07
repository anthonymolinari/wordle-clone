import {Fragment, useState, useEffect} from "react";

import Keyboard from "./pages/Keyboard";
import GuessArea from "./pages/GuessArea";
import TopBanner from "./pages/TopBanner";
import MsgCenter from "./pages/MsgCenter";
import {Box} from "@mui/material";

import dim from "./utils/dimensions";

import words from './utils/fiveLetterWords';

// return true if guess is in word list
const validateWord = (guess) => {
    for ( let word of words ) {
        if ( word === guess ) 
            return true;
    }
    return false;
}

function App() {

    const [ secretWord, setSecretWord ] = useState(''); 

    const [ activeCell, setActiveCell ] = useState(0);
    const [ message, setMessage ] = useState('');

    const [ completedRows, setCompletedRows ] = useState([]);

    const [ activeRow, setActiveRow ] = useState( new Array(dim.numGCols).fill({
        backgroundColor: 'white',
        value: "",
    }));

    const [ remainingRows, setRemainRows ] = useState( new Array((dim.numGRows - 1) * dim.numGCols)
        .fill({
            backgroundColor: 'white'
        }));

    const allRows = [...completedRows, ...activeRow, ...remainingRows];

    useEffect(() => {
        const idx = Math.floor(Math.random() * words.length);
        console.log(`the word to guess is ${words[idx]}`);
        setSecretWord(words[idx]);
    }, []);

    const keyBoardHandler = (value) => {
        const newActiveRow = activeRow.slice();
        
        if ( value === 'del' ) {
            if (activeCell < 1)
                return;

            newActiveRow[activeCell-1] = {
                ...newActiveRow[activeCell-1],
                value: '',
                active: false,
            };
            setActiveRow(newActiveRow);
            if ( activeCell > 0 ) {
                setActiveCell(activeCell-1);
            }
            return;
        }
            
        if ( value === 'enter' ) {
            const guess = newActiveRow.map( cell => cell.value ).join('');
            // send msg to msgCenter
            if (!validateWord(guess)) {
                messageTimer(`${guess} is NOT in the word list`);
                return;
            }

            // compare against goal word
            // if match -> win
            if (guess === secretWord)
                messageTimer(`CORRECT, ${guess} is the answer!`);
            
            if (completedRows.length === 25) {
                messageTimer(`Game OVER, ${guess} was inncorrect`);
                return 
            }
            
            setCompletedRows([...completedRows, ...newActiveRow]);
            // new active row
            setActiveRow(new Array(dim.numGCols).fill({
                backgroundColor: 'white',
                value: "",
            }));

            setRemainRows(new Array((dim.numGRows - (completedRows.length / 5) - 2) * dim.numGCols).fill({
                backgroundColor: 'blue'
            }));

            setActiveCell(0);

            console.log(allRows);

            return;
        }
        
        newActiveRow[activeCell] = {
            ...newActiveRow[activeCell],
            value: value,
            active: true,
        };
        setActiveRow(newActiveRow);
        if ( activeCell < 4 )
            setActiveCell(activeCell+1);
    }

    const messageTimer = async (msg_string) => {
        setMessage(msg_string);
        // have messages dissapear after a set timer
        setTimeout(() => setMessage(''), 4 * 1000);
    }


    return (
    <Fragment>
      <TopBanner />
      <Box
          margin="auto"
          sx={{
            //height: dim.numGRows * dim.height + (dim.numGRows - 1) * dim.vGap + dim.topBannerHeight + dim.keyboardHeight,
            height: 500, // generate dynamically using dimensions object
            width: dim.numGCols * dim.width + (dim.numGCols -1 ) * dim.hGap,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,

      }}
      >
      
      <GuessArea allRows={allRows} />
      <MsgCenter message={message} />
      </Box>
      <Keyboard onClickHandler={(value) => keyBoardHandler(value)} />
    </Fragment>
  );
}

export default App;

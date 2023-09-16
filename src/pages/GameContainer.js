import {Fragment, useState} from "react";

import Keyboard from "./Keyboard";
import GuessArea from "./GuessArea";
import TopBanner from "./TopBanner";
import MsgCenter from "./MsgCenter";
import {Box} from "@mui/material";

import {
    randomWord,
    validateWord,
    getIndeciesOf,
} from '../utils/utils';

import {
    numGuessAreaRows,
    numGuessAreaColumns,
    guessContainer
} from '../utils/sizes';

import { boxStyleVariants, messageBoxStyles } from '../utils/keyboardAndGuessAreaBoxTypes';

export default function GameContainer() {

    const [ secretWord, setSecretWord ] = useState(randomWord);
    const [ message, setMessage ] = useState({
        msg: ""
    });
    const [ activeCell, setActiveCell ] = useState(0);
    const [ completedRows, setCompletedRows ] = useState([]);
    const [ disable, setDisable ] = useState(false);
    

    const keyboardAlpha = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
        'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'
    ];

    const initKeyboard = () => {
        let keys = keyboardAlpha.map( letter => {
            if ( letter === 'enter' ) 
                return {
                    ...boxStyleVariants.keyboardUnusedKey,
                    letter: letter,
                    isEnterKey: true,
                };
            if ( letter === 'del' )
                return {
                    ...boxStyleVariants.keyboardUnusedKey,
                    letter: letter,
                    isBackspaceKey: true,
                };
            return {
                ...boxStyleVariants.keyboardUnusedKey,
                letter: letter,
            };
        })
        
        return keys;
    }

    const initActiveRow = () => new Array(numGuessAreaColumns).fill({
            ...boxStyleVariants.blankBox, 
            value: ""
    });

    const initRemainingRows = () => {
        return new Array( 
            (numGuessAreaColumns * (numGuessAreaRows-1)) - (completedRows.length) )
            .fill(boxStyleVariants.blankBox);
    }
    const updateRemainingRows = () => {
        return new Array( 
            (numGuessAreaColumns * (numGuessAreaRows-2)) - (completedRows.length) )
            .fill(boxStyleVariants.blankBox);
    }

    const [ keyboard, setKeyboard ] = useState(initKeyboard);

    const [ activeRow, setActiveRow ] = useState(initActiveRow);

    const [ remainingRows, setRemainRows ] = useState(initRemainingRows)

    const allRows = [...completedRows, ...activeRow, ...remainingRows];

    
    const keyBoardHandler = (key) => {
        if ( disable )
            return;

        if ( key.isBackspaceKey && activeCell === 0)
            return; // activeRow is empty as such, there are no letters to erase
        
        if ( key.isBackspaceKey ) {
            const newActiveRow = activeRow.slice();
            newActiveRow[activeCell-1] = {
                ...newActiveRow[activeCell-1],
                value: '',
                active: false,
            };
            setActiveRow(newActiveRow);
            setActiveCell(activeCell-1);
            return;
        }

        if ( activeCell === numGuessAreaColumns && key.isEnterKey) {
            // evaluate user's work that is now in activeRow. The feedback boxes
            // get stored in a 5 element array and get pushed into the completedRows.
            // the activeRow gets reset to 5 blank boxes.
            // if the remainingRows is empty, game is over. Display a message in the message center.
            let newActiveRow = activeRow.slice();
            let newKeyboard = keyboard.slice();
            const guess = newActiveRow.map( cell => cell.value ).join('');
            if (!validateWord(guess)) {
                messageTimer(`${guess} is NOT in the word list`, messageBoxStyles.error);
                return;
            }

            if (guess === secretWord) {
                newActiveRow = newActiveRow.map( elm => ({
                    ...elm,
                    ...boxStyleVariants.exactMatch,
                }));
                setMessage({
                    msg: `CORRECT, ${guess} is the answer!`, 
                    style: messageBoxStyles.win,
                });
                setDisable(true);
            }
            else {
                let exactMatches = new Array(5).fill(false);
                // color the guess boxes and keyboard
                // first find the exact matches
                for ( let i = 0; i < newActiveRow.length; i++ ) {
                    if ( newActiveRow[i].value === secretWord[i] ) {
                        exactMatches[i] = true;
                        newActiveRow[i] = {...newActiveRow[i], ...boxStyleVariants.exactMatch};
                        let idx = keyboardAlpha.indexOf(newActiveRow[i].value);
                        newKeyboard[idx] = {
                            ...newKeyboard[idx],
                            ...boxStyleVariants.exactMatch,
                        };
                    }
                }
                for ( let i = 0; i < newActiveRow.length; i++ ) {
                    if ( exactMatches[i] )
                        continue;

                    let j = secretWord.indexOf(newActiveRow[i].value);
                    
                    // check if letter has been exactly matched
                    if ( exactMatches[j] ) {
                        // check if there is another instance of the letter that 
                        // hasn't been matched 
                        let idxs = getIndeciesOf(secretWord.split(""), newActiveRow[i].value);
                        console.log(idxs);
                        if ( idxs.length > 1 ) {
                            idxs.forEach( k => {
                                if ( k !== j ) {
                                    newActiveRow[i] = {...newActiveRow[i], ...boxStyleVariants.partialMatch};
                                }
                            });
                        } else {
                            newActiveRow[i] = {...newActiveRow[i], ...boxStyleVariants.noMatch};
                        }
                    }
                    else if ( j > -1 ) {
                        newActiveRow[i] = {...newActiveRow[i], ...boxStyleVariants.partialMatch};
                        let idx = keyboardAlpha.indexOf(newActiveRow[i].value);
                        newKeyboard[idx] = {
                            ...newKeyboard[idx],
                            ...boxStyleVariants.partialMatch,
                        };
                    }
                    else {
                        newActiveRow[i] = {...newActiveRow[i], ...boxStyleVariants.noMatch};
                        let idx = keyboardAlpha.indexOf(newActiveRow[i].value);
                        newKeyboard[idx] = {
                            ...newKeyboard[idx],
                            ...boxStyleVariants.noMatch,
                        };
                    }
                }                   
            } 
            
            if (completedRows.length === 25) {
                setMessage({ 
                    msg: `Game OVER, the secret word was ${secretWord}`, 
                    style: messageBoxStyles.loss
                });
                setDisable(true);

                setCompletedRows([...completedRows, ...newActiveRow]);
                setKeyboard(newKeyboard);
                setActiveRow([]);
                setRemainRows([]);
                return;
            }

            setCompletedRows([...completedRows, ...newActiveRow]);
            setKeyboard(newKeyboard);
            setActiveRow(initActiveRow);
            setRemainRows(updateRemainingRows);
            setActiveCell(0);

            return;
        }

        if ( key.isEnterKey ) {
            // ignore the enter key as there are not enough letters in active row
            return;
        }

        if ( activeCell === numGuessAreaColumns ) {
            // activeRow is already full.
            return;
        }
        
        const newActiveRow = activeRow.slice();
        newActiveRow[activeCell] = {...boxStyleVariants.notEvaluated, value: key.letter};
        setActiveRow(newActiveRow);
        setActiveCell(activeCell+1);
    }

    const messageTimer = async (msg_string, style) => {
        setMessage({
            msg: msg_string,
            style: style,
        });
        // have messages dissapear after a set timer
        setTimeout(() => setMessage({msg: ""}), 5 * 1000);
    }

    return (
    <Fragment>
      <TopBanner />
      <Box
          margin="auto"
          sx={{
            height: guessContainer.height, 
            width: guessContainer.width,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,

      }}
      >
      <GuessArea allRows={allRows} />
      <MsgCenter message={message} />
      </Box>
      <Keyboard keyboard={keyboard} onClickHandler={keyBoardHandler} />
    </Fragment>
  );
}

import words from './fiveLetterWords';

// pick a secret word
export function randomWord() {
    const idx = Math.floor(Math.random() * words.length);
    console.log(`The word to guess is ${words[idx]}`);
    return words[idx];
}

// return true if guess is in word list
export function validateWord(guess) {
    for ( let word of words ) {
        if ( word === guess ) 
            return true;
    }
    return false;
}

// gets an array of strings 
export function getIndeciesOf(arr, x) {
    let idxs = [];
    console.log(arr);
    arr.forEach( (elm, idx) => {
        console.log(elm, x);
        if ( elm === x )
            idxs.push(idx);
    });
    return idxs;
}


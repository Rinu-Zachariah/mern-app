import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import "./index.css"
import List from "../list"

const Scrabble = () => {  
  const [inputValue, setInputValue] = useState("");
  const [generatedWords, setGeneratedWords] = useState([]);

  const generateWords = words => {
      const wordsArr = [];
      if (words.length === 1) return words;
      for (let val in words) {
        var word = words[val];
        generateWords(words.join('').replace(word, '').split('')).concat("").map(reducedWord => 
          wordsArr.push([word].concat(reducedWord))
        );
      }
      return wordsArr;
  }
  return (
    <div className="scrabble">
      <TextField
        label="Input Alphabets here"
        variant="outlined"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className="scrabble__button"
        onClick={() => {
          setGeneratedWords(generateWords(inputValue.toLowerCase().split('')).map(str => str.join('')));
        }}
      >
        Generate words
      </Button>
      {generatedWords.length !== 0 && <List key="key" data={generatedWords} />}
    </div>
  );
}

export default Scrabble;

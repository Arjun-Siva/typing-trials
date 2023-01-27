import _ from "lodash";
import { useState, useEffect } from "react";
import { Paper } from '@mui/material';
import TextArea from "./TextArea/TextArea";
import InputText from "./InputText/InputText";
import ProgressBar from "./ProgressBar/ProgressBar";
import ResultModal from "../Modals/ResultModal/ResultModal";
import './TrialsEngine.css';

// states - full text, current word
const createEmptyBitmaps = (wordsOfText) => {
    let bitmaps = [...Array(wordsOfText.length)].map(
        (l, i) => Array(wordsOfText[i].length).fill(0)
    );
    return bitmaps;
}

const fullText = `The water that falls on you from nowhere when you lie is perfectly ordinary but perfectly pure. True fact. I tested it myself when the water started falling a few weeks ago. Everyone on Earth did. Everyone with any sense of lab safety anyway. Never assume any liquid is just water. When you say "I always document my experiments as I go along'" enough water falls to test' but not so much that you have to mop up the lab. Which lie doesn't matter.`;
let words = fullText.split(" ").map((word) => word + " ");
words[words.length - 1] = words[words.length - 1].trim();
const individualContrib = Array(words.length);
words.forEach((word, i) => {
    individualContrib[i] = (word.length / fullText.length) * 100;
})

let startTime, endTime, showResults, speed, accuracy;

const TrialsEngine = () => {

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctnessBitmaps, setCorrectnessBitmaps] = useState(createEmptyBitmaps(words));
    const [currentProgress, setProgress] = useState(0);

    const onCompletionHandler = (resultBitmap) => {
        let updatedBitMaps = _.cloneDeep(correctnessBitmaps);
        updatedBitMaps[currentWordIndex] = resultBitmap; // might be clone. no probs as of now
        setCorrectnessBitmaps(updatedBitMaps);

        setProgress(currentProgress + individualContrib[currentWordIndex]);

        if (currentWordIndex !== words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        }
        else {
            endTime = new Date().getTime();

            let totalWords = 0, totalChars = 0, correctChars = 0;
            updatedBitMaps.forEach((wordBitmap) => {
                wordBitmap.forEach((charBitmap) => {
                    if (charBitmap === 1)
                        correctChars += 1;
                    totalChars += 1;
                });
                totalWords += 1;
            })

            let timeTaken = ((endTime - startTime) / 1000) / 60; // in mimutes
            speed = Math.round(totalWords / timeTaken, 0);
            accuracy = Math.round((correctChars / totalChars) * 100, 2);
            showResults = true;
        }
    }

    useEffect(() => {
        startTime = new Date().getTime();
        showResults = false;
        speed = 0;
        accuracy = 0;
    }, []);

    return (
        <div className="EngineContainer">
            <Paper elevation={24} className="TrialsEngine" square>
                <TextArea fullText={fullText} currentBitmaps={correctnessBitmaps} />
                <ProgressBar progress={currentProgress} />
                <InputText className="InputText" currentWord={words[currentWordIndex]} onCompletion={onCompletionHandler} />
            </Paper>
            {showResults && <ResultModal accuracy={accuracy} speed={speed} />}
        </div>
    )
}

export default TrialsEngine;
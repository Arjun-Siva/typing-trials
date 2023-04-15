import _ from "lodash";
import { useState, useEffect } from "react";
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

let startTime, endTime, showResults, speed, accuracy;

const TrialsEngine = (props) => {

    const fullText = props.fullText;
    let words = fullText.split(" ").map((word) => word + " ");
    words[words.length - 1] = words[words.length - 1].trim();
    const contribs = Array(words.length);
    words.forEach((word, i) => {
        contribs[i] = (word.length / fullText.length) * 100;
    })

    const [allWords, setWords] = useState(_.clone(words));
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctnessBitmaps, setCorrectnessBitmaps] = useState(createEmptyBitmaps(words));
    const [currentProgress, setProgress] = useState(0);
    const [individualContrib, setIndividualContrib] = useState(_.clone(contribs));

    const [started, startGame] = useState(false);

    const startGameHandler = () => {
        startTime = new Date().getTime();
        startGame(true);
    }

    // const stopGameHandler = () => {
    //     startGame(false);
    // }

    const onCompletionHandler = (resultBitmap) => {
        let updatedBitMaps = _.cloneDeep(correctnessBitmaps);
        updatedBitMaps[currentWordIndex] = resultBitmap; // might be clone. no probs as of now
        setCorrectnessBitmaps(updatedBitMaps);

        setProgress(currentProgress + individualContrib[currentWordIndex]);

        if (currentWordIndex !== allWords.length - 1) {
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

            props.setPrevResults(
                {speed, accuracy}
            )            
        }
    }

    useEffect(() => {
        showResults = false;
        speed = 0;
        accuracy = 0;
        let words = fullText.split(" ").map((word) => word + " ");
        words[words.length - 1] = words[words.length - 1].trim();
        const contribs = Array(words.length);
        words.forEach((word, i) => {
            contribs[i] = (word.length / fullText.length) * 100;
        })

        setWords(_.clone(words));
        setCorrectnessBitmaps(createEmptyBitmaps(words));
        setIndividualContrib(_.clone(contribs));
    }, [fullText]);

    const restartHandler = () => {
        props.reloadText();
    };

    return (
        <div className="EngineContainer">
            <Stack direction="row" spacing={5} className="Stack">
                <Button variant="outlined" color="success" onClick={startGameHandler} disabled={started}>
                    Start
                </Button>
                {/* <Button variant="outlined" color="error" disabled={showResults} onClick={stopGameHandler}>
                    Stop
                </Button> */}
                <Button variant="outlined" color="secondary" onClick={restartHandler}>
                    Restart
                </Button>
            </Stack>
            <Paper elevation={16} className="TrialsEngine" square>
                <TextArea fullText={fullText} currentBitmaps={correctnessBitmaps} blur={!started} />
                <ProgressBar progress={currentProgress} />
                {(currentProgress < 100 && started) && <InputText className="InputText" currentWord={allWords[currentWordIndex]} onCompletion={onCompletionHandler} />}
            </Paper>
            {showResults && <ResultModal accuracy={accuracy} speed={speed} />}
        </div>
    )
}

export default TrialsEngine;
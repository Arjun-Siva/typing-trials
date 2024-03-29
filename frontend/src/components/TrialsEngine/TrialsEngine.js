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

/**
 * in props get mode: multi: true/false --
 * if mode is multi, emit current progress, on each time updated
 * hide start, restart buttons in multi --
 * render only when arena owner starts the game. when starts, fetch text from API
 * if multi mode, default value for started is true --
 */

const TrialsEngine = (props) => {

    const multimode = props.multimode;
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

    const [started, startGame] = useState(multimode);

    const startGameHandler = () => {
        startTime = new Date().getTime();
        startGame(true);
    }

    const onCompletionHandler = (resultBitmap) => {
        let updatedBitMaps = _.cloneDeep(correctnessBitmaps);
        updatedBitMaps[currentWordIndex] = resultBitmap; // might be clone. no probs as of now
        setCorrectnessBitmaps(updatedBitMaps);

        let newProgress = currentProgress + individualContrib[currentWordIndex];

        setProgress(newProgress);

        if (multimode) { props.progressChangeHandler(newProgress); }

        if (currentWordIndex !== allWords.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        }
        else {
            endTime = new Date().getTime();

            setProgress(100); // to round it up

            let totalWords = 0, totalChars = 0, correctChars = 0;
            updatedBitMaps.forEach((wordBitmap) => {
                wordBitmap.forEach((charBitmap) => {
                    if (charBitmap === 1)
                        correctChars += 1;
                    totalChars += 1;
                });
                totalWords += 1;
            })

            let timeTaken = ((endTime - startTime) / 1000) / 60; // in minutes
            speed = Math.round(totalWords / timeTaken, 0);
            accuracy = Math.round((correctChars / totalChars) * 100, 2);
            showResults = true;

            if (multimode) {
                props.endGameHandler({ speed, accuracy });
            }

            if (!multimode) {
                props.setPrevResults({ speed, accuracy });
            }
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

        if (multimode) {
            startTime = new Date().getTime();
        }
    }, [fullText, multimode]);

    const restartHandler = () => {
        props.reloadText();
    };

    return (
        <div className="EngineContainer">
            {!multimode && <Stack direction="row" spacing={5} className="Stack">
                <Button variant="outlined" color="success" onClick={startGameHandler} disabled={started}>
                    Start
                </Button>
                <Button variant="outlined" color="secondary" onClick={restartHandler}>
                    Restart
                </Button>
            </Stack>}
            <Paper elevation={16} className="TrialsEngine" square>
                <TextArea fullText={fullText} currentBitmaps={correctnessBitmaps} blur={!started} />
                <ProgressBar progress={currentProgress}/>
                {(currentProgress < 100 && started) && <InputText className="InputText" currentWord={allWords[currentWordIndex]} onCompletion={onCompletionHandler} />}
            </Paper>
            {showResults && <ResultModal accuracy={accuracy} speed={speed} />}
        </div>
    )
}

export default TrialsEngine;
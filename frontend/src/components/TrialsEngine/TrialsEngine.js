import { useState } from "react";
import { Paper } from '@mui/material';
import TextArea from "./TextArea/TextArea";
import InputText from "./InputText/InputText";
import _ from "lodash";
import ProgressBar from "./ProgressBar/ProgressBar";
import './TrialsEngine.css';

// states - full text, current word
const createEmptyBitmaps = (words) => {
    let bitmaps = [...Array(words.length)].map(
        (l, i) => Array(words[i].length).fill(0)
    );
    return bitmaps;
}

const fullText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia corrupti provident, quaerat laborum nobis molestias debitis ea culpa praesentium, dicta illo quisquam dolorem, pariatur repellat nesciunt saepe modi obcaecati ipsum!";
let words = fullText.split(" ").map((word) => word + " ");
words[words.length - 1] = words[words.length - 1].trim();
const individualContrib = Array(words.length);
words.forEach((word, i) => {
    individualContrib[i] = (word.length / fullText.length) * 100;
})


const TrialsEngine = () => {

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctnessBitmaps, setCorrectnessBitmaps] = useState(createEmptyBitmaps(words));
    const [currentProgress, setProgress] = useState(0);

    const onCompletionHandler = (resultBitmap) => {
        let updatedBitMaps = _.cloneDeep(correctnessBitmaps);
        updatedBitMaps[currentWordIndex] = resultBitmap;
        setCorrectnessBitmaps(updatedBitMaps);

        setProgress(currentProgress + individualContrib[currentWordIndex]);

        if (currentWordIndex !== words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        }
        else {
            alert("Completed!");
        }
    }

    return (
        <Paper elevation={24} className="TrialsEngine" square>
            <TextArea fullText={fullText} currentBitmaps={correctnessBitmaps} />
            <ProgressBar progress={currentProgress} />
            <InputText className="InputText" currentWord={words[currentWordIndex]} onCompletion={onCompletionHandler} />
        </Paper>

    )
}

export default TrialsEngine;
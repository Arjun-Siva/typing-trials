import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./InputText.css";

const InputText = (props) => {
    const currentWord = props.currentWord;
    const [curText, setCurrentText] = useState("");
    const [errorState, setErrorState] = useState(false);
    const [correctnessBitmap, setCorrectnessBitmap] = useState(Array(currentWord.length).fill(1));

    const textChangeHandler = (event) => {
        const text = event.target.value;

        if (text === currentWord.substring(0, text.length)) {
            setErrorState(false);
            setCurrentText(text);
            if (text.length === currentWord.length) {
                props.onCompletion(correctnessBitmap);
            }
        }
        else {
            let updatedBitMap = [...correctnessBitmap];
            for (let i = 0; i < Math.min(text.length, currentWord.length); i++) {
                if (text[i] !== currentWord[i])
                    updatedBitMap[i] = 2;
            }
            setCorrectnessBitmap(updatedBitMap);
            setErrorState(true);
            setCurrentText(text);
        }
    }

    useEffect(() => {
        setCorrectnessBitmap(Array(currentWord.length).fill(1));
        setCurrentText("");
    }, [currentWord]);

    return (
        <div className="InputTextWrap">
            <TextField
                hiddenLabel
                id="oulined-hidden-label-normal"
                label="Type here"
                variant="outlined"
                value={curText}
                onChange={textChangeHandler}
                error={errorState}
                inputProps={{
                    spellCheck: 'false',
                    style: { fontSize: 'x-large' }
                }}
                fullWidth={true}
                onPaste={(e) => {
                    e.preventDefault()
                    return false;
                }}
            />
        </div>
    )
}

export default InputText;
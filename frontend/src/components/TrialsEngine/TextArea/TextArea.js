import Word from './Word/Word';
import './TextArea.css';

const TextArea = (props) => {
    const fullText = props.fullText;
    const bitmaps = props.currentBitmaps;
    const words = fullText.split(" ").map((word) => word + " ");
    words[words.length - 1] = words[words.length - 1].trim();

    return (
        <div className="TextArea">
        {
            words.map((word, i) => {
                return <Word key={i} bitmap={bitmaps[i]}>{word}</Word>
            })
        }
        </div>
    )
}

export default TextArea;

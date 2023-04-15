import { useState, useEffect } from "react";
import TrialsEngine from "../../components/TrialsEngine/TrialsEngine";
import TypeWriterImage from "../../images/typewriter.jpg";
import './Home.css';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    const [fullText, setFullText] = useState(null);
    const [loadingContent, setLoadingContent] = useState(true);
    const [prevResults, setPrevResults] = useState(null);

    const newText = () => {
        setLoadingContent(true);
        fetch('/api/paragraph')
        .then(response => response.text())
        .then(data => {
            setFullText(data);
            setLoadingContent(false);
        })
    };

    useEffect(newText, []);

    return (
        <div className="home">
            <div className="landing">
                <div className="title">
                    <h1>{'Typing Trials'}</h1>
                </div>
                <img src={TypeWriterImage} alt="typewriter" />
            </div>
            <div className="engineContainer">
                {prevResults && (
                    <div>
                        Previous trial results - Speed: {prevResults.speed} WPM, Accuracy: {prevResults.accuracy}%
                    </div>
                    )
                }
                {loadingContent ? <CircularProgress className="loading"/> : 
                <TrialsEngine 
                    fullText={fullText} 
                    reloadText={newText}
                    setPrevResults={setPrevResults}
                />}
            </div>
        </div>
    )
}

export default Home;
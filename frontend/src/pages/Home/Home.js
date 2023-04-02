import { useState, useEffect } from "react";
import TrialsEngine from "../../components/TrialsEngine/TrialsEngine";
import TypeWriterImage from "../../images/typewriter.jpg";
import './Home.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const defaultText = `The water that falls on you from nowhere when you lie is perfectly ordinary but perfectly pure. True fact. I tested it myself when the water started falling a few weeks ago. Everyone on Earth did. Everyone with any sense of lab safety anyway. Never assume any liquid is just water. When you say I always document my experiments as I go along enough water falls to test but not so much that you have to mop up the lab. Which lie doesn't matter.`;

const Home = () => {
    const [fullText, setFullText] = useState(null);
    const [loadingContent, setLoadingContent] = useState(true);

    useEffect(() => {
        fetch('/api/paragraph')
            .then(response => response.text())
            .then(data => {
                setFullText(data);
                setLoadingContent(false);
            });
    }, []);

    return (
        <div className="home">
            <div className="landing">
                <div className="title">
                    <h1>{'Typing Trials'}</h1>
                </div>
                <img src={TypeWriterImage} alt="typewriter" />
            </div>
            <button>Play now</button>
            <div className="engineContainer">
                {loadingContent ? <CircularProgress /> : <TrialsEngine fullText={fullText} />}
            </div>
        </div>
    )
}

export default Home;
import { useState, useEffect } from "react";
import TrialsEngine from "../../components/TrialsEngine/TrialsEngine";
import TypeWriterImage from "../../images/typewriter.jpg";
import './Home.css';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ScrollDownButton from "../../components/ScrollDownButton/ScrollDownButton";

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
                <ScrollDownButton/>
                <img src={TypeWriterImage} alt="typewriter" />
            </div>
            <div className="engineContainer">
                {prevResults && (
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        className="typography"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Previous trial results - Speed: <span id="greenText">{prevResults.speed} WPM</span>,
                        Accuracy: <span id="greenText">{prevResults.accuracy}%</span>
                    </Typography>
                )
                }
                {loadingContent ? <CircularProgress className="loading" /> :
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
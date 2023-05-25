import Typography from '@mui/material/Typography';
import "./About.css";

const About = () => {
    return (
        <div className="aboutContainer">
            <Typography variant="h2">About</Typography>
            <hr />
            <Typography variant="h3">How is Speed calculated ?</Typography>
            <p>The time from the moment you click Start to the moment you finish is the total time taken.</p>
            <p>Speed is Number of words typed / Time taken in minutes (WPM).</p>
            <p>In arena mode, the time starts at the moment the arena owner starts the game.</p>
            <hr />
            <Typography variant="h3">How is Accuracy calculated ?</Typography>
            <p>When you start typing, the input text box is cleared after finishing every word. Once a letter is</p>
            <p>typed wrong, that letter is considered as miss. At the end, the ratio of number of correctly typed</p>
            <p>letters to the total number of letters in the paragraph is the accuracy.</p>
            <hr/>
            <Typography variant="h3">Libraries used ?</Typography>
            <p>MongoDB, Express js, React js, Node js, Socket.io, Material UI</p>
        </div>
    )
}

export default About;
import TrialsEngine from "../../components/TrialsEngine/TrialsEngine";
import TypeWriterImage from "../../images/typewriter.jpg";
import './Home.css';

const Home = () => {
    console.log('rendering')
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
                <TrialsEngine/>
            </div>
        </div>
    )
}

export default Home;
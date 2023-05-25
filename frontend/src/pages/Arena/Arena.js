import { useEffect, useState } from "react";
import TrialsEngine from "../../components/TrialsEngine/TrialsEngine";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ProgressMulti from "../../components/ProgressMulti/ProgressMulti";
import { Link } from 'react-router-dom';
import { useArenaContext } from "../../hooks/useArenaContext";
import ArenaImage from "../../images/arena.jpg";
import Typography from '@mui/material/Typography';
import PlayerTable from "../../components/PlayerTable/PlayerTable";
import "./Arena.css";
import io from 'socket.io-client';

const socket = io.connect(process.env.SOCKET_API);

const Arena = () => {
  const { arena } = useArenaContext();
  const [started, startGame] = useState(false);
  const [progressList, setProgressList] = useState([]);
  const [results, setResults] = useState([]);
  const [fullText, setFullText] = useState('');
  const [messages, setMessages] = useState([]);
  const [ended, endGame] = useState(false);

  socket.on("game started", (fullText) => {
    startGame(true);
    setFullText(fullText);
  });

  socket.on("general message", (msg) => {
    setMessages([...messages, msg]);
  })

  socket.on("arena progress update", (update) => {
    //console.log("arena progress update", update);
    const oldList = progressList.filter(item => item.temp_id !== update.temp_id);
    setProgressList([update, ...oldList]);
  })

  socket.on("arena result update", (update) => {
    setResults([update, ...results]);
  })

  socket.on("game stop", () => {
    setProgressList([]);
    setResults([]);
    setFullText('');
    endGame(false);
    startGame(false);
  });

  const startGameHandler = async () => {
    const response = await fetch('/api/paragraph');
    const fullText = await response.text();
    socket.emit("start game", {
      "arena_id": arena.arena_id,
      "fullText": fullText
    });

    if (fullText) {
      startGame(true);
      setFullText(fullText);
    }
  }

  const endGameHandler = ({ speed, accuracy }) => {
    const update = {
      "arena_id": arena.arena_id,
      "nickname": arena.nickname,
      "temp_id": arena.temp_id,
      "speed": speed,
      "accuracy": accuracy
    }
    socket.emit("individual finish", update);
    setResults([...results, update])
    endGame(true);
  }

  const restartHandler = () => {
    socket.emit("game restart", arena.arena_id);
    setProgressList([]);
    setResults([]);
    setFullText('');
    endGame(false);
    startGame(false);
  };


  useEffect(() => {
    if (arena) {
      socket.emit("setup", {
        "arena_id": arena.arena_id,
        "nickname": arena.nickname
      });
    }
  }, [arena])

  const progressChangeHandler = (currentProgress) => {
    const update = {
      "arena_id": arena.arena_id,
      "nickname": arena.nickname,
      "temp_id": arena.temp_id,
      "progress": currentProgress
    }
    socket.emit("individual progress update", update);
  }

  return (
    <div className="App">
      <header className="App-header">

        {!arena &&
          (<div className="arenaContainer">
            <img src={ArenaImage} alt="arena-pic" />
            <div className="arenaText">
              <p>Online Multiplayer tournament. Compete with your friends in an Arena</p>
              <div className="arenaTitle">
                <Link to="/arena/join" style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center" variant="h2">Join an arena</Typography>
                </Link>
                <Link to="/arena/create" style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center" variant="h2">Create an arena</Typography>
                </Link>
              </div>
            </div>
          </div>)
        }
        <div className="gameContainer">
          {arena &&
            (<div>
              <p>My Nickname: <span className="arenaDeets">{arena.nickname}</span></p>
              <p>Arena id: <span className="arenaDeets">{arena.arena_id}</span> (Share this with your friends to let them join)</p>
              <p>Arena owner: <span className="arenaDeets">{arena.owner_name}</span></p>
            </div>
            )
          }

          {arena
            && arena.owner_id === arena.temp_id
            && <Stack direction="row" spacing={5} className="Stack">
              <Button variant="outlined" color="success" onClick={startGameHandler} disabled={started}>
                Start game
              </Button>
              <Button variant="outlined" color="secondary" onClick={restartHandler}>
                Restart
              </Button>
            </Stack>
          }

          {arena
            && !started
            && <>
              <p>Waiting for Arena owner to start the game ...</p>
              {messages.map((message, i) => { return <p key={i} className="messages">{message}</p> })}
            </>

          }

          {started
            && arena
            && <div className="arenaTrials">
              <ProgressMulti progressList={progressList} />
              <TrialsEngine
                fullText={fullText}
                reloadText={null}
                setPrevResults={null}
                multimode={true}
                progressChangeHandler={progressChangeHandler}
                endGameHandler={endGameHandler}
              />
            </div>}

          {ended
            && arena
            && <div className="playerTable"><PlayerTable players={results} /></div>
          }
        </div>
      </header>
    </div>
  );
}

export default Arena;
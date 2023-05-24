import { useEffect, useState } from "react";
import TrialsEngine from "../../components/TrialsEngine/TrialsEngine";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ProgressMulti from "../../components/ProgressMulti/ProgressMulti";
import { Link } from 'react-router-dom';
import { useArenaContext } from "../../hooks/useArenaContext";
import ArenaImage from "../../images/arena.jpg";
import Typography from '@mui/material/Typography';
import "./Arena.css";
import io from 'socket.io-client';

const socket = io.connect(process.env.SOCKET_API);

const Arena = () => {
  const { arena } = useArenaContext();
  const [started, startGame] = useState(false);
  const [progressList, setProgressList] = useState([]);
  const [fullText, setFullText] = useState('');
  const [messages, setMessages] = useState([]);

  socket.on("game started", (fullText) => {
    startGame(true);
    setFullText(fullText);
  });

  socket.on("general message", (msg) => {
    setMessages([...messages,msg]);
  })

  socket.on("arena progress update", (update) => {
    console.log("arena progress update", update);
    const oldList = progressList.filter(item => item.temp_id !== update.temp_id);
    setProgressList([update, ...oldList]);
  })


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

  const restartHandler = () => {
    //reloadText();
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
          (<>
            <Link to="/arena/join" style={{ textDecoration: 'none' }}>
              <Typography textAlign="center">Join an arena</Typography>
            </Link>
            <Link to="/arena/create" style={{ textDecoration: 'none' }}>
              <Typography textAlign="center">Create an arena</Typography>
            </Link>
          </>)
        }

        {arena &&
          (<div>
            <p>nickname: {arena.nickname}</p>
            <p>arena id:{arena.arena_id},</p>
            <p>arena owner:{arena.owner_name},</p>
            <p>arena owner_id:{arena.owner_id},</p>
            <p>my id:{arena.temp_id}</p>
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
          <p>Waiting for arena owner to start the game ...</p>
          {messages.map(message=>{return <p>{message}</p>})}
          </>

        }

        {started
          && arena
          && <div>
            <ProgressMulti progressList = {progressList}/>
            <TrialsEngine
              fullText={fullText}
              reloadText={null}
              setPrevResults={null}
              multimode={true}
              progressChangeHandler={progressChangeHandler}
            />
          </div>}

      </header>
    </div>
  );
}

export default Arena;
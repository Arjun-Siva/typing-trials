import { useEffect, useState } from "react";
import ArenaImage from "../../images/arena.jpg";
import "./Arena.css";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000")


const username = 'U' + Math.floor((Math.random() * 10));
 
const Arena = () => {


    const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    console.log({message, username})
    socket.emit("chat", {message, username})
    setMessage('');
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
      <h1>CHatty app</h1>
      {chat.map((payload, index)=> {
        return(
          <p key={index}><span>{payload.username}:</span>{payload.message}</p>
        )
      })}

      <form onSubmit={sendChat}>
        <input type="text" name="chat"
        placeholder="send text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}/>
        <button type="submit">send</button>
      </form>

      <h2>Join an arena</h2>
      

      </header>
    </div>
  );
}

export default Arena;
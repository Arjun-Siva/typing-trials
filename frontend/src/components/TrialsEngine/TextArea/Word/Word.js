import Character from "./Character/Character";

const Word = (props) => {
    const bitmap = props.bitmap;
    const word = props.children;

    if (!bitmap || !word){
      console.log(word, bitmap);
    }
    return(
        <>
            {
              word.split("").map((char, i) => {
                return <Character key={i} correctnessBit={bitmap[i]}>{char}</Character>
              })  
            }
        </>
    );
}

export default Word;
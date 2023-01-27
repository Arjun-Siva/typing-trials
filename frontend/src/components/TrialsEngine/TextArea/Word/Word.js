import Character from "./Character/Character";

const Word = (props) => {
    const bitmap = props.bitmap;
    const word = props.children;
    return(
        <>
            {
              word.split("").map((char, i) => {
                return <Character correctnessBit={bitmap[i]}>{char}</Character>
              })  
            }
        </>
    );
}

export default Word;
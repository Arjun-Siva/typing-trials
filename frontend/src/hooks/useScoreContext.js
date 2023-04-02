import { ScoresContext } from "../context/ScoreContext";
import { useContext } from "react";

export const useScoreContext = () => {
    const context = useContext(ScoresContext)

    if (!context) {
        throw Error('useScoreContext must be inside an ScoreContextProvider')
    }

    return context
}
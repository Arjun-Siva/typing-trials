import { ArenaContext } from "../context/ArenaContext";
import { useContext } from "react";

export const useArenaContext = () => {
    const context = useContext(ArenaContext);

    if (!context) {
        throw Error("useArenaContext must be inside an ArenaContextProvider");
    }

    return context;
}
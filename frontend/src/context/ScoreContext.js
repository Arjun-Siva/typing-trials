import { createContext, useReducer } from "react";

export const ScoresContext = createContext();

export const scoresReducer= (state, action) => {// state - previous state
    switch(action.type){
        case 'SET_SCORES':
            return {
                workouts: action.payload
            }
        case 'CREATE_SCORE':
            return {
                scores: [action.payload, ...state.scores]
            }

        case 'DELETE_SCORE':
            return {
                scores: state.scores.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ScoresContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(scoresReducer, {
        scores:null
    });

    return(
        <ScoresContext.Provider value={{...state, dispatch}}>
            {children}
        </ScoresContext.Provider>
    )
}
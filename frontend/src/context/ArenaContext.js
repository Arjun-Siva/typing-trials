import { createContext, useReducer } from 'react';

export const ArenaContext = createContext();

export const arenaReducer = (state, action) => {
    switch(action.type){
        case 'JOIN':
            return { arena: action.payload }
        case 'EXIT':
            return { arena: null }
        default:
            return state
    }
}

export const ArenaContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(arenaReducer, {
        arena: null
    })
    // useEffect(() => {
    //     const arena = JSON.parse(localStorage.getItem('user'))
    //     if(arena){
    //         dispatch({type: 'JOIN', payload: user});
    //     }
    // }, [])

    return (
        <ArenaContext.Provider value={{...state, dispatch}}>
            { children }
        </ArenaContext.Provider>
    )
}
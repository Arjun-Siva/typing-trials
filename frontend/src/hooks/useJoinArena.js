import { useArenaContext } from './useArenaContext';
import { useState} from 'react';

export const useJoinArena = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useArenaContext();

    const join = async (nickname, arena_id) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/arena/join', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nickname, arena_id})
        })
        const json = await response.json();
        console.log('join response', json);

        if(!response.ok){
            setIsLoading(false);
            setError(json.error)
        }
        else{
            setIsLoading(false);
            // save the user to local storage
            // localStorage.setItem('user', JSON.stringify(json))

            //update auth context
            dispatch({type: 'JOIN', payload: json})
            setIsLoading(false);
        }
    }
    return {join, isLoading, error}
}
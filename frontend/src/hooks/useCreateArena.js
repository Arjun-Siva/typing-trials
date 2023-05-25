import { useArenaContext } from './useArenaContext';
import { useState} from 'react';

export const useCreateArena = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useArenaContext();

    const create = async (nickname) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/arena/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nickname})
        })
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error)
        }
        else{
            setIsLoading(false);
            // save the user to local storage
            // localStorage.setItem('user', JSON.stringify(json))

            //update context
            dispatch({type: 'JOIN', payload: json})
            setIsLoading(false)
        }
    }
    return {create, isLoading, error}
}
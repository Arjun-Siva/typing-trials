import { useAuthContext } from './useAuthContext';
import { useState} from 'react';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(process.env.REACT_APP_SIGNUP_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false);
            setError(json.error)
        }
        else{
            setIsLoading(false);
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error}
}
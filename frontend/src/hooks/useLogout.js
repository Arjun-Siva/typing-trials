import { useAuthContext } from "./useAuthContext"
import { useScoreContext } from "./useScoreContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useScoreContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return {logout};
}
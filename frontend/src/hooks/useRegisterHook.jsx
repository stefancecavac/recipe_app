import {  useState } from "react"
import {useUserContext} from './useUserHook'

export const UseRegister = () => {
    const [error , setError] = useState(null)
    const {dispatch} = useUserContext()

    const register = async(email , password) => {
        const response = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()

        if(!response.ok){
           
            setError(json.error)
        }

        if(response.ok){
            setError(null)
            dispatch({type: 'LOGIN' , payload:json})
        }

    }
    return{register , error}
}
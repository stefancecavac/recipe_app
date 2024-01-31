import { useState } from "react"
import {UseRegister} from '../hooks/useRegisterHook'



const Register = () => {
    const [username , setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register , error} = UseRegister()

    
    const handleRegister = async(e) => {
        e.preventDefault()
        await register(email, password ,username)
        
    }

    return (
        <div className="register">

        <form onSubmit={handleRegister}>
            <h2>register</h2>

            <label>Username:</label>
            <input type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}></input>

          
            <label>email:</label>
            <input type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}></input>

            <label>password:</label>
            <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}></input>
                
                <button > register</button>

                {error && <div className="error">{error}</div>}

        </form>
        </div>
    )
}

export default Register
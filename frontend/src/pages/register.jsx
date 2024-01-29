import { useState } from "react"
import {UseRegister} from '../hooks/useRegisterHook'

const Register = () => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register , error} = UseRegister()

    const handleRegister = async(e) => {
        e.preventDefault()
        await register(email, password)
    }

    return (

        <form onSubmit={handleRegister}>
            <h2>register</h2>
          
            <label>email:</label>
            <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}></input>

            <label>password:</label>
            <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}></input>
                
                <button > login</button>

                {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Register
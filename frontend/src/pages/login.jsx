import { useState } from "react"
import {Link} from 'react-router-dom'
import { UseLogin } from "../hooks/useLoginHook"

 
const Login = () => {
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login , error} = UseLogin()

    

    const handleLogin = async(e) => {
        
        e.preventDefault()
      await login(email , password)
       
    }
    return (
        <div className="login">

        <form onSubmit={handleLogin}>
            <h2>login</h2>
     
            <label>email:</label>
            <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}></input>

            <label>password:</label>
            <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}></input>

                <button  type="submit"> login</button>
                <p>Dont have a account? <Link to='/register'>register</Link> here</p>

                {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Login
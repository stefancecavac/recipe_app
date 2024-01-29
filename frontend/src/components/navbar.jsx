import { Link } from "react-router-dom"

const Navbar = () => {

    return(
        <header>
            <p>search:</p>
            <Link to='/'>RECIPE APP</Link>

            <Link to='/login'>LOGIN</Link>
            <Link to='/register'>register</Link>

            
        </header>
    )
}

export default Navbar
import { Link } from "react-router-dom"

const Navbar = () => {

    return(
        <header>
            <p>search:</p>
            <Link to='/'>RECIPE APP</Link>
            <p>User info:</p>
        </header>
    )
}

export default Navbar

import { useUserContext } from '../hooks/useUserHook'
import { UseLogout } from "../hooks/useLogoutHook"
import { Link } from 'react-router-dom'



const AsideBar = () => {
    const { user } = useUserContext()
    const { logout } = UseLogout()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <aside>
            <div className='userinfo'>
                <div className='userImage'>

                <p>{user.username}</p>
                </div>
            </div>

            <div className='useractions'>
                <Link to='/'>Home</Link>
                <Link to='/add-recipe'>New recipe</Link>
                <Link to='/liked-recipe'>Liked recipe</Link>
            </div>
            <button onClick={handleLogout}>logout</button>
        </aside>
    )
}

export default AsideBar

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


            <div className="logincred">
                <div className='userinfo'>
                    <p>{user.username}</p>

                </div>
                <div className='useractions'>
                    <Link to='/'>Home</Link>
                   <Link to='/add-recipe'>New recipe</Link>
                   
                 
                   <span className='liked'>
                  Liked Recipes
                    
                    </span>
                   
                </div>


                <button onClick={handleLogout}>logout</button>

            </div>


        </aside>
    )
}

export default AsideBar
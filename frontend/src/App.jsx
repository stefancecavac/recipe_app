import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from "./pages/home"
import RecipeDetail from './pages/recipeDetail'
import Login from './pages/login'
import Register from './pages/register'

import AsideBar from './components/navbar'
import { useUserContext } from './hooks/useUserHook'
import AddRecipe from './pages/addRecipe'
import LikedRecipes from './pages/likedRecipes'

function App() {
const {user} = useUserContext()

  return (
  
     
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/recipe-details/:recipeId" element={<RecipeDetail></RecipeDetail>}></Route>

          <Route path="/add-recipe" element={!user? (<Navigate to='/'></Navigate>) : (<AddRecipe></AddRecipe>)}></Route>

          <Route path='/liked-recipe' element={<LikedRecipes></LikedRecipes>}></Route>

          <Route path="/login" element={user? (<Navigate to='/'></Navigate>): (<Login></Login>)}></Route>
          <Route path="/register" element={user? (<Navigate to='/'></Navigate>): (<Register></Register>)}></Route>



        </Routes>
        {user && (<AsideBar></AsideBar>)}
      </BrowserRouter>
   
  )
}

export default App

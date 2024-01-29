import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/home"
import RecipeDetail from './pages/recipeDetail'
import Login from './pages/login'
import Register from './pages/register'

import Navbar from "./components/navbar"


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/recipe-details/:recipeId" element={<RecipeDetail></RecipeDetail>}></Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

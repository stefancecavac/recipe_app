import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/home"
import RecipeDetail from './pages/recipeDetail'

import Navbar from "./components/navbar"


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/recipe-details/:recipeId" element={<RecipeDetail></RecipeDetail>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

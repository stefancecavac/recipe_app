import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/home"

import Navbar from "./components/navbar"


function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

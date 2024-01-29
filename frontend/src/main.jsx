import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecipeContextProvider } from './context/recipeContext.jsx'
import { UserContextProvider } from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <UserContextProvider>

      <RecipeContextProvider>

        <App />

      </RecipeContextProvider>

    </UserContextProvider>

  </React.StrictMode>,

)

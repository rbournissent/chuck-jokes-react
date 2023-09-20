import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/favorites', element: <Favorites /> },
])

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router}/>
    </>
  )
}

export default App

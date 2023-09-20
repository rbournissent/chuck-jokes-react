import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages/Root'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

const router = createBrowserRouter([{
   path: '/',
   element: <Root />,
   children: [{
    path: '',
    element: <Home />
   }, {
    path: '/favorites',
    element: <Favorites />
   }]
}])

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter

import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import JokesProvider from "../context/JokesProvider"

const Root = () => {
  return (
    <JokesProvider>
      <Header />
      <Outlet />
    </JokesProvider>
  )
}

export default Root

import './App.css'
import Header from './components/Header'
import AppRouter from './AppRouter'
import JokesProvider from './context/JokesProvider'

function App() {
  return (
    <JokesProvider>
      <Header />
      <AppRouter />
    </JokesProvider>
  )
}

export default App

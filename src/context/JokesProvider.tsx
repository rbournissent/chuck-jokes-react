import { useReducer } from "react"
import { FAVORITES_STORAGE_KEY } from "../consts"
import { Joke } from "../models/Joke"
import JokesContext from "./JokesContext"
import { reducer } from "../reducers/jokeReducer"
import { JokesState } from "../models/JokesState"

interface JokesProviderProps {
  children: React.ReactNode
}

const JokesProvider = ({ children }: JokesProviderProps) => {
  let favorites: Joke[] = []

  try {
    favorites = JSON
      .parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]') as Joke[]
  } catch (e) {
    console.error(e)
  }

  const [state, dispatch] = useReducer(reducer, {
    favorites: favorites,
    jokes: [],
    intervalEnabled: false
  })

  const jokesState: JokesState = {
    jokes: state.jokes,
    favorites: state.favorites,
    intervalEnabled: state.intervalEnabled,
    dispatch: dispatch
  }

  return (
    <JokesContext.Provider value={jokesState}>
      {children}
    </JokesContext.Provider>
  )
}

export default JokesProvider

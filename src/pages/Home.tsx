import { useCallback, useEffect, useReducer, useState } from "react"
import { Joke } from "../models/Joke"
import JokeCard from "../components/JokeCard"
import { JokeRes } from "../models/JokeRes"

enum ActionTypes {
  INIT = 'init',
  ADD = 'add',
  FAVORITE = 'favorite'
}

interface IAction {
  type: ActionTypes
  payload: Joke
}

const reducer = (state: Joke[], action: IAction) => {
  const MAX_JOKES = 10

  switch (action.type) {
    case 'init':
      return state.length
        ? state
        : [action.payload]
    case 'add':
      return state.length === MAX_JOKES
        ? [action.payload, ...state.slice(0, MAX_JOKES - 1)]
        : [action.payload, ...state]
    case 'favorite':
      return state.map(joke => {
        if (joke.id === action.payload.id) {
          return {
            ...joke,
            isFavorite: !joke.isFavorite
          }
        }

        return joke
      })
    default:
      return state
  }
}

const Home = () => {
  const JOKE_INTERVAL_TIME = 5000
  const [jokes, dispatch] = useReducer(reducer, [])
  const [error, setError] = useState('')

  const toggleFavorite = (joke: Joke) => {
    dispatch({ type: ActionTypes.FAVORITE, payload: joke })
  }

  const getNewJoke = useCallback(async ():Promise<Joke> => {
    const joke:JokeRes = await fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json() as Promise<JokeRes>)

    const newJoke = {
      id: joke.id,
      text: joke.value,
      isFavorite: false
    }

    return newJoke
  }, [])

  useEffect(() => {
    (() => {
      // Get first joke
      getNewJoke().then(joke => {
        dispatch({ type: ActionTypes.INIT, payload: joke })
      })
      .catch(() => setError('Failed to fetch joke'))

    })()
  }, [getNewJoke])

  useEffect(() => {
    // Start interval
    const id = window.setInterval(async () => {
      dispatch({ type: ActionTypes.ADD, payload: await getNewJoke() })
    }, JOKE_INTERVAL_TIME)

    return () => {
      window.clearInterval(id)
    }
  }, [getNewJoke])


  return (
    <main className='mt-[40px] px-2 py-10'>
      <section className="flex flex-col items-center gap-10 ">
        { error && <p className="text-red-600">{ error }</p> }
        {jokes.map(joke => (
            <JokeCard key={joke.id}
              joke={joke}
              onToggleClicked={toggleFavorite} />
          )
        )}
      </section>
    </main>
  )
}

export default Home

import { useEffect, useState } from "react"

import { Joke } from "../models/Joke"
import { ActionTypes } from "../reducers/jokeReducer"
import { getNewJoke } from "../api"

import JokeCard from "../components/JokeCard"
import { useJokesContext } from "../context/JokesContext"

const Home = () => {
  const JOKE_INTERVAL_TIME = 5000
  const { jokes, dispatch } = useJokesContext()
  const [error, setError] = useState('')

  const toggleFavorite = (joke: Joke) => {
    dispatch({ type: ActionTypes.FAVORITE, payload: joke })
  }

  useEffect(() => {
    (() => {
      // Get first joke
      getNewJoke().then(joke => {
        dispatch({ type: ActionTypes.INIT, payload: joke })
      })
      .catch(() => setError('Failed to fetch the joke'))

    })()
  }, [dispatch])

  useEffect(() => {
    // Start interval
    const id = window.setInterval(() => {
      getNewJoke().then(joke => {
        dispatch({ type: ActionTypes.ADD, payload: joke })
      })
      .catch(() => setError('Failed to fetch a new joke'))
    }, JOKE_INTERVAL_TIME)

    return () => {
      window.clearInterval(id)
    }
  }, [dispatch])


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

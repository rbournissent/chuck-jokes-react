import { useEffect, useReducer, useState } from "react"

import { Joke } from "../models/Joke"
import { ActionTypes, reducer } from "../reducers/jokeReducer"
import { getNewJoke } from "../api"

import JokeCard from "../components/JokeCard"

const Home = () => {
  const JOKE_INTERVAL_TIME = 5000
  const [jokes, dispatch] = useReducer(reducer, [])
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
      .catch(() => setError('Failed to fetch joke'))

    })()
  }, [])

  useEffect(() => {
    // Start interval
    const id = window.setInterval(async () => {
      dispatch({ type: ActionTypes.ADD, payload: await getNewJoke() })
    }, JOKE_INTERVAL_TIME)

    return () => {
      window.clearInterval(id)
    }
  }, [])


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

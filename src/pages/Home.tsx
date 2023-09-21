import { useCallback, useEffect, useState } from "react"

import { Joke } from "../models/Joke"
import { ActionTypes } from "../reducers/jokeReducer"
import { getNewJoke } from "../api"

import JokeCard from "../components/JokeCard"
import { useJokesContext } from "../context/JokesContext"

const Home = () => {
  const JOKE_INTERVAL_TIME = 5 // seconds
  const { jokes, dispatch } = useJokesContext()
  const [error, setError] = useState<string>('')
  const [intervalEnabled, setIntervalEnabled] = useState<boolean>(true)
  const [countdown, setCountdown] = useState<number>(JOKE_INTERVAL_TIME)

  const toggleFavorite = (joke: Joke) => {
    dispatch({ type: ActionTypes.FAVORITE, payload: joke })
  }

  const countdownInterval = useCallback(() => {
    if (intervalEnabled) {
      setCountdown(countdown - 1)
    }
  }, [intervalEnabled, countdown])

  const toggleInterval = () => {
    setIntervalEnabled(!intervalEnabled)
  }

  useEffect(() => {
    if (!countdown) {
      setCountdown(JOKE_INTERVAL_TIME)
      getNewJoke().then(joke => {
        dispatch({ type: ActionTypes.ADD, payload: joke })
      })
      .catch(() => setError('Failed to fetch a new joke'))
    }
  }, [dispatch, countdown])

  useEffect(() => {
    (() => {
      // Get first joke
      if (!jokes.length) {
        getNewJoke().then(joke => {
          dispatch({ type: ActionTypes.INIT, payload: joke })
        })
        .catch(() => setError('Failed to fetch the joke'))
      }
    })()
  }, [dispatch, jokes.length])

  useEffect(() => {
    // Start interval
    const intervalId = window.setInterval(countdownInterval, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [countdownInterval])


  return (
    <main className='mt-[40px] px-2 py-10'>
      <section className="flex flex-col items-center gap-10 ">
        { error && <p className="text-red-600">{ error }</p> }
        <p className="flex w-1/2 justify-between">
          <i>{ intervalEnabled
            ? `A new joke arrives in ${countdown} seconds...`
            : 'Resume to get a new joke every 5 seconds'
          }</i>
          <button className="ml-2"
            onClick={toggleInterval}>
            { intervalEnabled ? 'Pause' : 'Resume' }
          </button>
        </p>
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

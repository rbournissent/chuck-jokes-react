import { useJokesContext } from "../context/JokesContext"
import { Joke } from "../models/Joke"
import { ActionTypes } from "../reducers/jokeReducer"

import JokeCard from "../components/JokeCard"

const Favorites = () => {
  const { favorites, dispatch } = useJokesContext()

  const toggleFavorite = (joke: Joke) => {
    dispatch({ type: ActionTypes.FAVORITE, payload: joke })
  }

  return (
    <main className='mt-[40px] px-2 py-10'>
      <section className="flex flex-col items-center gap-10 ">
        {favorites.map(joke => (
            <JokeCard key={joke.id}
              joke={joke}
              onToggleClicked={toggleFavorite} />
          )
        )}
      </section>
    </main>
  )
}

export default Favorites

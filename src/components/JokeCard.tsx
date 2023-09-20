import { Joke } from "../models/Joke"

interface JokeProps {
  joke: Joke,
  onToggleClicked: (joke: Joke) => void
}

const JokeCard = ({ joke, onToggleClicked }: JokeProps) => {
  let styles = 'absolute top-2 right-2 font-bold hover:text-red-600 transition-colors duration-200'

  if (joke.isFavorite) {
    styles += ' text-green-700'
  }

  return (
    <article className="w-1/2 relative px-10 py-5 bg-slate-100 rounded-md shadow-md shadow-zinc-300">
      <p className="text-center italic">{ joke.text }</p>
      <button className={styles} onClick={() => onToggleClicked(joke)}>
        { '<3' }
      </button>
    </article>
  )
}

export default JokeCard

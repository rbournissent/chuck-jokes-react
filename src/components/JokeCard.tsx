import { Joke } from "../models/Joke"
import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
interface JokeProps {
  joke: Joke,
  onToggleClicked: (joke: Joke) => void
}

const JokeCard = ({ joke, onToggleClicked }: JokeProps) => {
  return (
    <article className="w-1/2 relative px-10 py-5 bg-slate-100 rounded-md shadow-md shadow-zinc-300">
      <p className="text-center italic">{ joke.text }</p>
      <button className='absolute top-2 right-2 font-bold hover:text-red-600 transition-colors duration-200'
         onClick={() => onToggleClicked(joke)}>
        { joke.isFavorite ? <IconHeartFilled /> : <IconHeart /> }
      </button>
    </article>
  )
}

export default JokeCard

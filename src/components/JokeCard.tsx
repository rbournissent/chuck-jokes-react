import { Joke } from "../models/Joke"
import { IconHeartFilled, IconHeart } from '@tabler/icons-react'
import Card from "./Card"

interface JokeCardProps {
  joke: Joke,
  onToggleClicked: (joke: Joke) => void
}

const JokeCard = ({ joke, onToggleClicked }: JokeCardProps) => {
  return (
    <Card>
      <p className="text-center italic">{ joke.text }</p>
      <button className='absolute top-2 right-2 font-bold hover:text-red-600 transition-colors duration-200'
         onClick={() => onToggleClicked(joke)}>
        { joke.isFavorite ? <IconHeartFilled /> : <IconHeart /> }
      </button>
    </Card>
  )
}

export default JokeCard

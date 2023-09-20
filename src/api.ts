import { Joke } from "./models/Joke"
import { JokeRes } from "./models/JokeRes"

export const getNewJoke = async ():Promise<Joke> => {
  const joke:JokeRes = await fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json() as Promise<JokeRes>)

  const newJoke = {
    id: joke.id,
    text: joke.value,
    isFavorite: false
  }

  return newJoke
}

import { Joke } from "./Joke"

export interface ReducerState {
  jokes: Joke[]
  favorites: Joke[]
}

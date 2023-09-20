import { FAVORITES_STORAGE_KEY } from "../consts"
import { Joke } from "../models/Joke"
import { ReducerState } from "../models/ReducerState"

export enum ActionTypes {
  INIT = 'init',
  ADD = 'add',
  FAVORITE = 'favorite'
}

export interface Action {
  type: ActionTypes
  payload: Joke
}

export const reducer = (state: ReducerState, action: Action): ReducerState => {
  const MAX_JOKES = 10

  switch (action.type) {
    case 'init':
      return state.jokes.length
        ? state
        : {
          ...state,
          jokes: [action.payload]
        }
    case 'add': {
      const jokes = state.jokes.length === MAX_JOKES
        ? [action.payload, ...state.jokes.slice(0, MAX_JOKES - 1)]
        : [action.payload, ...state.jokes]
      return {
        ...state,
        jokes
      }
    }
    case 'favorite': {
      const updatedJokes = state.jokes.map(joke => {
        if (joke.id === action.payload.id) {
          return {
            ...joke,
            isFavorite: !joke.isFavorite
          }
        }

        return joke
      })

      const favorites = updatedJokes.filter(joke => joke.isFavorite)

      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      )

      return {
        ...state,
        jokes: updatedJokes,
        favorites
      }
    }
    default:
      return state
  }
}

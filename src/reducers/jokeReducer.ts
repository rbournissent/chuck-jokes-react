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
    case ActionTypes.INIT:
      return state.jokes.length
        ? state
        : {
          ...state,
          jokes: [action.payload]
        }
    case ActionTypes.ADD: {
      const jokes = state.jokes.length === MAX_JOKES
        // Remove last joke to keep the list up to the max
        ? [action.payload, ...state.jokes.slice(0, MAX_JOKES - 1)]
        : [action.payload, ...state.jokes]

      return {
        ...state,
        jokes
      }
    }
    case ActionTypes.FAVORITE: {
      const updatedJoke = {
        ...action.payload,
        isFavorite: !action.payload.isFavorite
      }

      // Update joke in the jokes list
      const updatedJokes = state.jokes.map(joke => {
        if (joke.id === action.payload.id) {
          return updatedJoke
        }

        return joke
      })

      const updatedFavorites = updatedJoke.isFavorite
        // Add joke to the list
        ? [
          ...state.favorites,
          updatedJoke
        ]
        // Remove joke from the list
        : state.favorites.filter(joke => joke.id !== updatedJoke.id)

      // Update the favorites in localStorage
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(updatedFavorites)
      )

      return {
        ...state,
        jokes: updatedJokes,
        favorites: updatedFavorites
      }
    }
    default:
      return state
  }
}

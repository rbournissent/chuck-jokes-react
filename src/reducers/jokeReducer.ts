import { Joke } from "../models/Joke"

export enum ActionTypes {
  INIT = 'init',
  ADD = 'add',
  FAVORITE = 'favorite'
}

export interface IAction {
  type: ActionTypes
  payload: Joke
}

export const reducer = (state: Joke[], action: IAction) => {
  const MAX_JOKES = 10

  switch (action.type) {
    case 'init':
      return state.length
        ? state
        : [action.payload]
    case 'add':
      return state.length === MAX_JOKES
        ? [action.payload, ...state.slice(0, MAX_JOKES - 1)]
        : [action.payload, ...state]
    case 'favorite':
      return state.map(joke => {
        if (joke.id === action.payload.id) {
          return {
            ...joke,
            isFavorite: !joke.isFavorite
          }
        }

        return joke
      })
    default:
      return state
  }
}

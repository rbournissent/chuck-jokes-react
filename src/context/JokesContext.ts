import { createContext, useContext } from "react";
import { JokesState } from "../models/JokesState";

const initialState:JokesState = {
  jokes: [],
  favorites: [],
  dispatch: () => {
    throw new Error('dispatch function must be overridden')
  },
}
const JokesContext = createContext(initialState)

export function useJokesContext() {
  return useContext(JokesContext)
}

export default JokesContext

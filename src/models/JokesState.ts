import { Action } from "../reducers/jokeReducer";
import { ReducerState } from "./ReducerState";

export interface JokesState extends ReducerState {
  dispatch: React.Dispatch<Action>
}
